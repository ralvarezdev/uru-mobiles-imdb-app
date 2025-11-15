import React, { useState, useRef } from "react";
import { View } from "react-native";
import { Modal } from "@/components/atoms/Modal";
import { InputField } from "@/components/molecules/InputField";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { styles } from "./style";
import { LoadingMessage } from "../LoadingMessage";
import { ChangeEmailRequest } from "@ralvarezdev/proto-auth-ts/ralvarezdev/v1/auth_pb";
import authService from "@/services/authService";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { isParsedInternalServerError, isInternalServerError } from "@/utils/errorHandler";

interface ModalUpdateEmailProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (newEmail: string) => void;
  currentEmail?: string;
}

interface FormErrors {
  email: string;
}

export const ModalUpdateEmail: React.FC<ModalUpdateEmailProps> = ({ visible, onClose, onConfirm, currentEmail }) => {
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({ email: "" });
  const lastValidationError = useRef<string>("");

  const validateForm = (): { isValid: boolean; errorMessage: string } => {
    let isValid = true;
    const newErrors: FormErrors = { email: "" };
    let errorMessage = "";

    if (newEmail.trim() === "") {
      newErrors.email = "Email is required";
      errorMessage = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(newEmail)) {
      newErrors.email = "Email format is invalid";
      errorMessage = "Email format is invalid";
      isValid = false;
    } else if (currentEmail && newEmail.toLowerCase() === currentEmail.toLowerCase()) {
      newErrors.email = "New email must be different from current email";
      errorMessage = "New email must be different from current email";
      isValid = false;
    }

    setErrors(newErrors);
    lastValidationError.current = errorMessage;
    return { isValid, errorMessage };
  };

  // const callChangeEmail = async (email: string) => {
  //   const req: ChangeEmailRequest = {
  //     email,
  //     $typeName: "ralvarezdev.v1.ChangeEmailRequest",
  //   };
  //   return authService.changeEmail(req);
  // };

  const handleConfirm = async () => {
    if (!validateForm().isValid) {
      return;
    }

    setLoading(true);
    // Clear any previous errors before making the request
    authService.clearLastError();

    try {
      const req: ChangeEmailRequest = {
        email: newEmail,
        $typeName: "ralvarezdev.v1.ChangeEmailRequest",
      };
      const response = await authService.changeEmail(req);
      console.log("change email response:", response);
      console.log("change email response type:", typeof response);
      console.log("change email response $typeName:", response?.$typeName);
      console.log("checking condition:", response && response.$typeName === "ralvarezdev.v1.ChangeEmailResponse");

      if (response && response.$typeName === "ralvarezdev.v1.ChangeEmailResponse") {
        console.log("Email change successful");
        // Close modal first
        onConfirm(newEmail);
        setNewEmail("");
        setErrors({ email: "" });
        onClose();

        // Show toast after modal closes (using global Toast instance)
        setTimeout(() => {
          Toast.show({
            type: "success", // 'success', 'error', 'info'
            text1: "Email changed successfully!",
            position: "bottom", // o 'top'
            visibilityTime: 5000, // 5 seconds
          });
        }, 1000); // Small delay to ensure modal is closed
      } else {
        // Response is undefined, check for parsed error
        const parsedError = authService.getLastError();
        console.log("Email change failed, parsed error:", parsedError);

        if (parsedError) {
          // Check if it's an internal error (including 502) that shouldn't be shown to users
          const isInternalError = isParsedInternalServerError(parsedError);

          if (isInternalError) {
            // Don't show internal errors to users
            Toast.show({
              type: "error",
              text1: "Could not change email",
              text2: "An unexpected error occurred. Please try again later.",
              position: "bottom",
              visibilityTime: 5000, // 5 seconds
            });
          } else {
            // Show user-friendly error message
            Toast.show({
              type: "error",
              text1: "Could not change email",
              text2: parsedError.generalMessage || "Please try again.",
              position: "bottom",
              visibilityTime: 5000, // 5 seconds
            });
          }
        } else {
          Toast.show({
            type: "error", // 'success', 'error', 'info'
            text1: "Could not change email. Please try again.",
            position: "bottom", // o 'top'
            visibilityTime: 5000, // 5 seconds
          });
        }
      }
    } catch (error: any) {
      // This catch should rarely be hit now, but keep it as a safety net
      console.error("Unexpected change email error:", error);
      const isInternalError = isInternalServerError(error);
      Toast.show({
        type: "error",
        text1: "Could not change email",
        text2: isInternalError ? "An internal error occurred. Please try again later." : "Please try again.",
        position: "bottom",
        visibilityTime: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNewEmail("");
    setErrors({ email: "" });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onClose={handleCancel}
      title="📧 Change Email"
      footer={
        <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
          <View style={{ flex: 1 }}>
            <Button title="Cancel" variant="secondary" onPress={handleCancel} disabled={loading} />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Update Email" variant="primary" onPress={handleConfirm} disabled={loading} loading={loading} />
          </View>
        </View>
      }>
      {loading ? (
        <LoadingMessage message="Updating email..." />
      ) : (
        <View style={styles.modalContent}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Enter your new email address</Text>
          </View>

          <View style={styles.fieldContainer}>
            <InputField label="Your new email" placeholder="new.email@example.com" value={newEmail} onChangeText={setNewEmail} error={errors.email} />
          </View>
        </View>
      )}
    </Modal>
  );
};
