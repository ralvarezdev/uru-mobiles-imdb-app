import { useState } from "react";
import { View } from "react-native";
import { styles } from "./style";
import { Modal } from "@/components/atoms/Modal";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { LoadingMessage } from "../LoadingMessage";
import authService from "@/services/authService";
import { Text } from "@/components/atoms/Text";
import { ChangePasswordRequest } from "@ralvarezdev/proto-auth-ts";
import { InputField } from "../InputField";
import Toast from "react-native-toast-message";

interface ModalUpdatePasswordProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

interface FormErrors {
  oldPassword: string;
  newPassword: string;
}

export const ModalUpdatePassword: React.FC<ModalUpdatePasswordProps> = ({ visible, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    oldPassword: "",
    newPassword: "",
  });

  const validateForm = (): { isValid: boolean; errorMessage: string } => {
    let isValid = true;
    const newErrors: FormErrors = {
      oldPassword: "",
      newPassword: "",
    };
    let errorMessage = "";

    if (!passwordData.oldPassword.trim()) {
      newErrors.oldPassword = "Please enter your current password";
      errorMessage = "Please enter your current password";
      isValid = false;
    } else if (!passwordData.newPassword.trim()) {
      newErrors.newPassword = "Please enter a new password";
      errorMessage = "Please enter a new password";
      isValid = false;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
      errorMessage = "Password must be at least 8 characters long";
      isValid = false;
    } else if (passwordData.oldPassword === passwordData.newPassword) {
      newErrors.newPassword = "New password must be different from current password";
      errorMessage = "New password must be different from current password";
      isValid = false;
    }

    setErrors(newErrors);
    return { isValid, errorMessage };
  };

  const handleConfirm = async () => {
    // Validaciones de campos
    if (!validateForm().isValid) {
      return;
    }

    setLoading(true);

    try {
      const changePasswordRequest: ChangePasswordRequest = {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
        $typeName: "ralvarezdev.v1.ChangePasswordRequest",
      };

      const response = await authService.changePassword(changePasswordRequest);
      console.log("Password changed successfully:", response);

      Toast.show({
        type: "success",
        text1: "Password changed successfully!",
        position: "bottom",
      });
      onConfirm();
      setPasswordData({ oldPassword: "", newPassword: "" });
      onClose();
    } catch (error: any) {
      Toast.show({
        type: "error", // 'success', 'error', 'info'
        text1: "Could not change password. Please try again.",
        // text2: "You will be redirected to login...",
        position: "bottom", // o 'top'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPasswordData({ oldPassword: "", newPassword: "" });
    setErrors({ oldPassword: "", newPassword: "" });
    onClose();
  };

  if (loading) {
    return <LoadingMessage message="Updating password..." />;
  }

  return (
    <Modal
      visible={visible}
      onClose={handleCancel}
      title="🔒 Change Password"
      footer={
        <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
          <View style={{ flex: 1 }}>
            <Button title="Cancel" variant="secondary" onPress={handleCancel} disabled={loading} />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Update Password" variant="primary" onPress={handleConfirm} disabled={loading} />
          </View>
        </View>
      }>
      <View style={styles.modalContent}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Your password must be at least 8 characters long</Text>
        </View>

        <View style={styles.fieldContainer}>
          <InputField
            label="Current Password"
            placeholder="Enter current password"
            value={passwordData.oldPassword}
            onChangeText={(value: string) => setPasswordData({ ...passwordData, oldPassword: value })}
            error={errors.oldPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.fieldContainer}>
          <InputField
            label="New Password"
            placeholder="Enter new password"
            value={passwordData.newPassword}
            onChangeText={(value: string) => setPasswordData({ ...passwordData, newPassword: value })}
            error={errors.newPassword}
            secureTextEntry
          />
        </View>
      </View>
    </Modal>
  );
};
