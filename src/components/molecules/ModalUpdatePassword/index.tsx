import { useState } from "react";
import { Alert, View } from "react-native";
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

export const ModalUpdatePassword: React.FC<ModalUpdatePasswordProps> = ({ visible, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // ✅ Función handleConfirm completa y correcta
  const handleConfirm = async () => {
    // Validaciones
    if (!passwordData.oldPassword.trim()) {
      Alert.alert("Error", "Please enter your current password");
      return;
    }

    if (!passwordData.newPassword.trim()) {
      Alert.alert("Error", "Please enter a new password");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    if (passwordData.oldPassword === passwordData.newPassword) {
      Alert.alert("Error", "New password must be different from current password");
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
        type: "success", // 'success', 'error', 'info'
        text1: "Email changed successfully!",
        // text2: "Se le redireccionara al login...",
        position: "bottom", // o 'top'
      });
      onConfirm();
      setPasswordData({ oldPassword: "", newPassword: "" });
      onClose();
    } catch (error: any) {
      Toast.show({
        type: "error", // 'success', 'error', 'info'
        text1: "Could not change password. Please try again.",
        // text2: "Se le redireccionara al login...",
        position: "bottom", // o 'top'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPasswordData({ oldPassword: "", newPassword: "" });
    onClose();
  };

  if (loading) {
    return <LoadingMessage message="Updating password..." />;
  }

  return (
    <Modal visible={visible} onClose={handleCancel} title="🔒 Change Password">
      <View style={styles.modalContent}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Your password must be at least 8 characters long</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label} variant="label">
            Current Password
          </Text>
          <InputField
            label="Current Password"
            placeholder="Enter current password"
            value={passwordData.oldPassword}
            onChangeText={(value: string) => setPasswordData({ ...passwordData, oldPassword: value })}
            secureTextEntry
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text variant="label" style={styles.label}>
            New Password
          </Text>
          <InputField
            label="New Password"
            placeholder="Enter new password"
            value={passwordData.newPassword}
            onChangeText={(value: string) => setPasswordData({ ...passwordData, newPassword: value })}
            secureTextEntry
          />
        </View>

        <View style={styles.modalButtons}>
          <Button title="Cancel" onPress={handleCancel} variant="primary" disabled={loading} />
          <Button title="Update Password" onPress={handleConfirm} disabled={loading} />
        </View>
      </View>
    </Modal>
  );
};
