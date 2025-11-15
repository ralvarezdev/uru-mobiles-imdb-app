import { ConnectError } from "@connectrpc/connect";

/**
 * Checks if an error is an internal server error (502, 500, unavailable, etc.)
 * This includes HTTP 502 Bad Gateway errors and other internal server errors
 * that should be shown as generic error messages to users.
 * 
 * @param error - The error object to check
 * @returns true if the error is an internal server error
 */
export const isInternalServerError = (error: any): boolean => {
  // Check if it's a ConnectError with status 502 or unavailable code
  if (error instanceof ConnectError) {
    // Check HTTP status code if available
    const httpStatus = (error as any).httpStatus;
    if (httpStatus === 502 || httpStatus === 500) {
      return true;
    }
    
    // Check error code (ConnectError uses Code enum, check for unavailable)
    const errorCode = (error as any).code;
    if (errorCode && String(errorCode).toLowerCase().includes("unavailable")) {
      return true;
    }
  }
  
  // Check error message for 502 or internal error patterns
  const errorMessage = error?.message?.toLowerCase() || "";
  const errorString = String(error).toLowerCase();
  
  return (
    errorMessage.includes("502") ||
    errorMessage.includes("bad gateway") ||
    errorMessage.includes("unavailable") ||
    errorMessage.includes("internal server error") ||
    errorMessage.includes("internal error") ||
    errorString.includes("502") ||
    errorString.includes("bad gateway") ||
    errorString.includes("unavailable")
  );
};

/**
 * Checks if a parsed error (from errorHelper) indicates an internal server error.
 * This is used when errors are already parsed by the service layer.
 * 
 * @param parsedError - The parsed error object
 * @returns true if the error is an internal server error
 */
export const isParsedInternalServerError = (parsedError: any): boolean => {
  if (!parsedError) return false;
  
  const errorCodeLower = parsedError.errorCode?.toLowerCase() || "";
  const originalMsgLower = parsedError.originalMessage?.toLowerCase() || "";
  const generalMsgLower = parsedError.generalMessage?.toLowerCase() || "";
  
  return (
    errorCodeLower === "internal" ||
    errorCodeLower.includes("internal_error") ||
    errorCodeLower.includes("unavailable") ||
    originalMsgLower.includes("502") ||
    originalMsgLower.includes("bad gateway") ||
    originalMsgLower.includes("unavailable") ||
    originalMsgLower.includes("internal") ||
    generalMsgLower.includes("502") ||
    generalMsgLower.includes("bad gateway") ||
    generalMsgLower.includes("unavailable") ||
    generalMsgLower.includes("internal") ||
    originalMsgLower.includes("internal server error") ||
    generalMsgLower.includes("internal server error") ||
    originalMsgLower.includes("rpc error") ||
    generalMsgLower.includes("rpc error") ||
    originalMsgLower.includes("grpc") ||
    generalMsgLower.includes("grpc")
  );
};

