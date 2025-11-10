import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/atoms/Modal";
import { CriticModalContent } from "@/components/organisms/CriticContent";
import { DeleteAccountForm } from "@/components/organisms/DeleteAccountForm";
import userService from "@/services/userService";
import { DeleteAccountRequest } from "@ralvarezdev/proto-user-ts";
import { useState } from "react";
import { Alert } from "react-native/Libraries/Alert/Alert";

interface ModalDeleteUserProfileAccountProps {
  visible: boolean;
  onClose: () => void;
}

export const ModalDeleteUserProfileAccount: React.FC<ModalDeleteUserProfileAccountProps> = ({ visible, onClose }) => {
  const [deleteFormData, setDeleteFormData] = useState<DeleteAccountRequest>({
    password: "",
    $typeName: "ralvarezdev.v1.DeleteAccountRequest",
  });

  const handleDeleteAccount = async () => {
    try {
      // Validación
      if (!deleteFormData.password) {
        Alert.alert("Error", "Por favor ingresa tu contraseña para confirmar");
        return;
      }

      // Confirmación final
      Alert.alert("🚨 ÚLTIMA CONFIRMACIÓN", "¿Realmente quieres eliminar tu cuenta permanentemente?\n\nEsta acción NO se puede deshacer.", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              // Aquí iría la llamada al API
              // await api.deleteAccount(deleteFormData);
              const resultDeleteProfile = userService.delete(deleteFormData);

              console.log("Cuenta eliminada");
              Alert.alert("Cuenta eliminada", "Tu cuenta ha sido eliminada permanentemente.\n\nGracias por usar CineReview.");
              // setIsDeleteModalVisible(false);
              onClose();
              // Redirigir al login
            } catch (error) {
              Alert.alert("Error", "Contraseña incorrecta o error en el servidor");
            }
          },
        },
      ]);
    } catch (error) {
      console.error("Error al eliminar cuenta:", error);
      Alert.alert("Error", "No se pudo eliminar la cuenta. Verifica tu contraseña.");
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Eliminar cuenta"
      footer={
        <>
          <Button title="Cancelar" variant="secondary" onPress={onClose} />
          <Button title="Eliminar" variant="secondary" onPress={handleDeleteAccount} />
        </>
      }>
      <DeleteAccountForm data={deleteFormData} onDataChange={setDeleteFormData} />
    </Modal>
  );
};
