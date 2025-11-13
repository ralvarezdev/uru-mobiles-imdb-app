import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Modal } from "@/components/atoms/Modal";
import { InputField } from "@/components/molecules/InputField";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { styles } from "./style";
import { LoadingMessage } from "../LoadingMessage";
import { ChangeEmailRequest } from "@ralvarezdev/proto-auth-ts/ralvarezdev/v1/auth_pb";
import authService from "@/services/authService";

interface ModalUpdateEmailProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (newEmail: string) => void;
  currentEmail?: string;
}

interface FormErrors {
  email: string;
}

export const ModalUpdateEmail: React.FC<ModalUpdateEmailProps> = ({
  visible,
  onClose,
  onConfirm,
  currentEmail,
}) => {
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({ email: "" });

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { email: "" };

    if (newEmail.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(newEmail)) {
      newErrors.email = "Email format is invalid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const callChangeEmail = async (email: string) => {
    const req: ChangeEmailRequest = {
      email,
      $typeName: "ralvarezdev.v1.ChangeEmailRequest",
    };
    return authService.changeEmail(req);
  };

  const handleConfirm = async () => {
    // 1) Validaciones básicas
    if (!validateForm()) return;

    // 2) Evitar mismo correo
    if (currentEmail && newEmail.toLowerCase() === currentEmail.toLowerCase()) {
      Alert.alert("Error", "New email must be different from current email");
      return;
    }

    setLoading(true);
    try {
      await callChangeEmail(newEmail);

      // Notificar al padre y limpiar
      onConfirm(newEmail);
      setNewEmail("");
      setErrors({ email: "" });
      onClose();

      Alert.alert("Success", "Email changed successfully!");
    } catch (error: any) {
      Alert.alert("Error", error?.message ?? "Could not change email. Please try again.");
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
    <Modal visible={visible} onClose={handleCancel} title="📧 Change Email">
      <View style={styles.modalContent}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Enter your new email address</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text variant="label" style={styles.label}>
            New Email Address
          </Text>
          <InputField
            label="Your new email"
            placeholder="new.email@example.com"
            value={newEmail}
            onChangeText={setNewEmail}
            error={errors.email}   // si tu Input soporta mostrar error
          />
        </View>

        <View style={styles.modalButtons}>
          <Button title="Cancel" onPress={handleCancel} variant="primary" />
          <Button title="Update Email" onPress={handleConfirm} />
        </View>
      </View>
    </Modal>
  );
};
