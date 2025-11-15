import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/atoms/Modal";
import { DeleteAccountForm } from "@/components/organisms/DeleteAccountForm";
import userService from "@/services/userService";
import { DeleteAccountRequest } from "@ralvarezdev/proto-user-ts";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { LoadingMessage } from "../LoadingMessage";

interface ModalDeleteUserProfileAccountProps {
  visible: boolean;
  onClose: () => void;
}

interface FormErrors {
  password: string;
}

export const ModalDeleteUserProfileAccount: React.FC<ModalDeleteUserProfileAccountProps> = ({ visible, onClose }) => {
  const [deleteFormData, setDeleteFormData] = useState<DeleteAccountRequest>({
    password: "",
    $typeName: "ralvarezdev.v1.DeleteAccountRequest",
  });
  const [errors, setErrors] = useState<FormErrors>({
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const validateForm = (): { isValid: boolean; errorMessage: string } => {
    let isValid = true;
    const newErrors: FormErrors = {
      password: "",
    };
    let errorMessage = "";

    if (!deleteFormData.password || deleteFormData.password.trim() === "") {
      newErrors.password = "Password is required to confirm";
      errorMessage = "Password is required to confirm";
      isValid = false;
    }

    setErrors(newErrors);
    return { isValid, errorMessage };
  };

  const handleDeleteAccount = async () => {
    // Primera validación
    const validation = validateForm();
    if (!validation.isValid) {
      return;
    }

    // Si no ha confirmado, mostrar confirmación
    if (!confirmDelete) {
      setConfirmDelete(true);
      Toast.show({
        type: "error",
        text1: "⚠️ Final Confirmation Required",
        text2: "This action is PERMANENT and cannot be undone. Press Delete again to confirm.",
        position: "bottom",
        visibilityTime: 5000,
      });
      return;
    }

    setLoading(true);
    try {
      await userService.delete(deleteFormData);
      console.log("Cuenta eliminada");
      Toast.show({
        type: "success",
        text1: "Account deleted successfully",
        text2: "Your account has been permanently deleted. Thank you for using our service.",
        position: "bottom",
      });
      onClose();
      setDeleteFormData({ password: "", $typeName: "ralvarezdev.v1.DeleteAccountRequest" });
      setConfirmDelete(false);
    } catch (error: any) {
      console.error("Error al eliminar cuenta:", error);
      Toast.show({
        type: "error",
        text1: "Could not delete account",
        text2: error?.message || "Incorrect password or server error. Please try again.",
        position: "bottom",
      });
      setConfirmDelete(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setDeleteFormData({ password: "", $typeName: "ralvarezdev.v1.DeleteAccountRequest" });
    setErrors({ password: "" });
    setConfirmDelete(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onClose={handleCancel}
      title="🗑️ Delete Account"
      footer={
        <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
          <View style={{ flex: 1 }}>
            <Button title="Cancel" variant="secondary" onPress={handleCancel} disabled={loading} />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Delete" variant="primary" onPress={handleDeleteAccount} disabled={loading} loading={loading} />
          </View>
        </View>
      }>
      {loading ? (
        <LoadingMessage message="Deleting account..." />
      ) : (
        <DeleteAccountForm data={deleteFormData} onDataChange={setDeleteFormData} errors={errors} />
      )}
    </Modal>
  );
};
