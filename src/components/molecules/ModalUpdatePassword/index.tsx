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
import { isParsedInternalServerError, isInternalServerError } from "@/utils/errorHandler";

interface ModalUpdatePasswordProps {
  visible: boolean;
  onClose: () => void;
}

interface FormErrors {
  oldPassword: string;
  newPassword: string;
}

export const ModalUpdatePassword: React.FC<ModalUpdatePasswordProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "%hc1£`=2@[g#{m(AqHZL3D9|@-*z(LQ=kwl8!'[ZxETBQX1d2j",
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
    // Clear any previous errors before making the request
    authService.clearLastError();
    
    try {
      const changePasswordRequest: ChangePasswordRequest = {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
        $typeName: "ralvarezdev.v1.ChangePasswordRequest",
      };

      const response = await authService.changePassword(changePasswordRequest);
      console.log("change password response:", response);
      
      if (response && response.$typeName === "ralvarezdev.v1.ChangePasswordResponse") {
        console.log("Password change successful");
        // Close modal first
        setPasswordData({ oldPassword: "", newPassword: "" });
        onClose();
        
        // Show toast after modal closes (using global Toast instance)
        setTimeout(() => {
          Toast.show({
            type: "success",
            text1: "Password changed successfully!",
            position: "bottom",
            visibilityTime: 5000, // 5 seconds
          });
        }, 100); // Small delay to ensure modal is closed
      } else {
        // Response is undefined, check for parsed error
        const parsedError = authService.getLastError();
        console.log("Password change failed, parsed error:", parsedError);
        
        if (parsedError) {
          // Check if it's an internal error (including 502) that shouldn't be shown to users
          const isInternalError = isParsedInternalServerError(parsedError);
          
          if (isInternalError) {
            // Don't show internal errors to users
            Toast.show({
              type: "error",
              text1: "Could not change password",
              text2: "An unexpected error occurred. Please try again later.",
              position: "bottom",
              visibilityTime: 5000, // 5 seconds
            });
          } else {
            // Show user-friendly error message
            Toast.show({
              type: "error",
              text1: "Could not change password",
              text2: parsedError.generalMessage || "Please try again.",
              position: "bottom",
              visibilityTime: 5000, // 5 seconds
            });
          }
        } else {
          Toast.show({
            type: "error", // 'success', 'error', 'info'
            text1: "Could not change password. Please try again.",
            position: "bottom", // o 'top'
            visibilityTime: 5000, // 5 seconds
          });
        }
      }
    } catch (error: any) {
      // This catch should rarely be hit now, but keep it as a safety net
      console.error("Unexpected change password error:", error);
      const isInternalError = isInternalServerError(error);
      Toast.show({
        type: "error",
        text1: "Could not change password",
        text2: isInternalError ? "An internal error occurred. Please try again later." : "Please try again.",
        position: "bottom",
        visibilityTime: 5000,
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
            <Button title="Confirm" variant="primary" onPress={handleConfirm} disabled={loading} loading={loading} />
          </View>
        </View>
      }>
      {loading ? (
        <LoadingMessage message="Updating password..." />
      ) : (
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
      )}
    </Modal>
  );
};
