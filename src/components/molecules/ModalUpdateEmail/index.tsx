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
    // Validaciones de campos
    if (!validateForm().isValid) {
      return;
    }

    setLoading(true);
    try {
      // await callChangeEmail(newEmail);
      const req: ChangeEmailRequest = {
        email: newEmail,
        $typeName: "ralvarezdev.v1.ChangeEmailRequest",
      };
      const response = await authService.changeEmail(req);
      // Notificar al padre y limpiar

      // Alert.alert("Success", "Email changed successfully!");
      Toast.show({
        type: "success", // 'success', 'error', 'info'
        text1: "Email changed successfully!",
        // text2: "You will be redirected to login...",
        position: "bottom", // o 'top'
      });
      onConfirm(newEmail);
      setNewEmail("");
      setErrors({ email: "" });
      onClose();
      // router.replace("/");
    } catch (error: any) {
      // Alert.alert("Error", error?.message ?? "Could not change email. Please try again.");
      Toast.show({
        type: "error", // 'success', 'error', 'info'
        text1: "Could not change email. Please try again.",
        // text2: "You will be redirected to login...",
        position: "bottom", // o 'top'
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

  if (loading) {
    return <LoadingMessage message="Updating email..." />;
  }

  return (
    <Modal
      visible={visible}
      onClose={handleCancel}
      title="📧 Change Email"
      footer={
        <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
          <View style={{ flex: 1 }}>
            <Button title="Cancel" variant="secondary" onPress={handleCancel} />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Update Email" variant="primary" onPress={handleConfirm} disabled={loading} />
          </View>
        </View>
      }>
      <View style={styles.modalContent}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Enter your new email address</Text>
        </View>

        <View style={styles.fieldContainer}>
          <InputField label="Your new email" placeholder="new.email@example.com" value={newEmail} onChangeText={setNewEmail} error={errors.email} />
        </View>
      </View>
    </Modal>
  );
};
