import { ConnectError } from "@connectrpc/connect";
import { BadRequestSchema, ErrorInfoSchema } from "@/assets/errors/error_details_pb";
import { ViolationsSchema } from "@ralvarezdev/proto-user-ts/buf/validate/validate_pb";

/**
 * Represents a single error message with field information
 */
export interface ErrorMessage {
  /** The field path where the error occurred (e.g., "email", "password", "firstName") */
  field?: string;
  /** Human-readable error message */
  message: string;
  /** Rule ID or reason for the error */
  ruleId?: string;
  /** Error code if available */
  code?: string;
}

/**
 * Result of parsing a ConnectError into user-friendly messages
 */
export interface ParsedError {
  /** List of all error messages */
  messages: ErrorMessage[];
  /** Errors grouped by field name (useful for form validation) */
  fieldErrors: Record<string, string[]>;
  /** General error message (first error or ConnectError message) */
  generalMessage: string;
  /** Error code if available (e.g., "already_exists", "invalid_argument") */
  errorCode?: string;
  /** Whether this is a validation error */
  isValidationError: boolean;
  /** Original error message from ConnectError */
  originalMessage: string;
}

/**
 * Parses a ConnectError and extracts user-friendly error messages
 * 
 * @param error - The ConnectError to parse
 * @returns ParsedError with structured error information
 * 
 * @example
 * ```typescript
 * try {
 *   await userService.register(request);
 * } catch (error) {
 *   if (error instanceof ConnectError) {
 *     const parsed = parseConnectError(error);
 *     // Show parsed.messages or parsed.fieldErrors
 *   }
 * }
 * ```
 */
export function parseConnectError(error: ConnectError): ParsedError {
  const messages: ErrorMessage[] = [];
  const fieldErrors: Record<string, string[]> = {};
  let errorCode: string | undefined;
  let isValidationError = false;

  // Extract error code from error message or metadata
  const errorMessage = error.message || "";
  const match = errorMessage.match(/\[([^\]]+)\]/);
  if (match) {
    errorCode = match[1];
  }

  // Try to get code from error metadata if available
  if (!errorCode && (error as any).code) {
    errorCode = (error as any).code;
  }

  // 1. Extract Violations (Protovalidate errors)
  const violations = error.findDetails(ViolationsSchema);
  if (violations.length > 0) {
    isValidationError = true;
    violations.forEach((violationGroup) => {
      if (violationGroup.violations) {
        violationGroup.violations.forEach((violation) => {
          // Build field path
          const fieldPath = violation.field?.elements
            ?.map((e) => {
              if (e.fieldName) return e.fieldName;
              if (e.fieldNumber) return `field_${e.fieldNumber}`;
              return "unknown";
            })
            .join(".") || "unknown";

          // Get error message
          const message = violation.message || violation.ruleId || "Validation error";
          const ruleId = violation.ruleId;

          const errorMsg: ErrorMessage = {
            field: fieldPath,
            message,
            ruleId,
            code: errorCode,
          };

          messages.push(errorMsg);

          // Group by field for easy access
          if (!fieldErrors[fieldPath]) {
            fieldErrors[fieldPath] = [];
          }
          fieldErrors[fieldPath].push(message);
        });
      }
    });
  }

  // 2. Extract BadRequest errors (Field violations)
  const badRequest = error.findDetails(BadRequestSchema);
  if (badRequest.length > 0) {
    isValidationError = true;
    badRequest.forEach((badReq) => {
      if (badReq.fieldViolations) {
        badReq.fieldViolations.forEach((violation) => {
          const field = violation.field || "unknown";
          const description = violation.description || "Invalid value";
          const reason = violation.reason;

          const errorMsg: ErrorMessage = {
            field,
            message: description,
            ruleId: reason,
            code: errorCode,
          };

          messages.push(errorMsg);

          // Group by field
          if (!fieldErrors[field]) {
            fieldErrors[field] = [];
          }
          fieldErrors[field].push(description);
        });
      }
    });
  }

  // 3. Extract ErrorInfo (General error information)
  const errorInfo = error.findDetails(ErrorInfoSchema);
  if (errorInfo.length > 0) {
    errorInfo.forEach((info) => {
      const reason = info.reason || "";
      const domain = info.domain || "";
      
      // Build message from reason and domain
      let message = reason;
      if (domain && !message.includes(domain)) {
        message = `${domain}: ${reason}`;
      }

      // Use metadata if available
      if (Object.keys(info.metadata || {}).length > 0) {
        const metadataStr = Object.entries(info.metadata || {})
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
        message = `${message} (${metadataStr})`;
      }

      if (message) {
        const errorMsg: ErrorMessage = {
          message,
          ruleId: reason,
          code: errorCode || reason,
        };

        messages.push(errorMsg);
      }

      // Update error code from reason if not set
      if (!errorCode && reason) {
        errorCode = reason;
      }
    });
  }

  // 4. If no structured errors found, use the error message itself
  if (messages.length === 0) {
    // Try to extract meaningful message from error string
    let message = errorMessage;
    
    // Remove brackets and codes for cleaner message
    message = message.replace(/\[([^\]]+)\]/g, "").trim();
    
    // Handle common error patterns
    if (message.toLowerCase().includes("already_exists") || message.toLowerCase().includes("already registered")) {
      message = "This resource already exists";
      if (message.toLowerCase().includes("email")) {
        message = "This email is already registered";
      }
    }

    messages.push({
      message: message || "An error occurred",
      code: errorCode,
    });
  }

  // Build general message (first error message or fallback)
  const generalMessage = messages.length > 0 
    ? messages[0].message 
    : errorMessage || "An error occurred";

  return {
    messages,
    fieldErrors,
    generalMessage,
    errorCode,
    isValidationError,
    originalMessage: errorMessage,
  };
}

/**
 * Checks if an error is a ConnectError and parses it
 * 
 * @param error - Any error object
 * @returns ParsedError if it's a ConnectError, null otherwise
 */
export function tryParseConnectError(error: unknown): ParsedError | null {
  if (error instanceof ConnectError) {
    return parseConnectError(error);
  }
  return null;
}

