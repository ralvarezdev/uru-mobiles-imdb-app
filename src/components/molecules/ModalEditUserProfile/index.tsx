import React, { useState } from "react";
import { Alert } from "react-native";
import { Button } from "../../atoms/Button";
import { UpdateUserProfileData, User } from "@/entities/User";
import { EditProfileForm } from "@/components/organisms/EditProfileForm";
import { Modal } from "@/components/atoms/Modal";

interface ModalEditUserProfileProps {
  user: User;
  visible: boolean;
  onClose: () => void;
}

export const ModalEditUserProfile: React.FC<ModalEditUserProfileProps> = ({ user, visible, onClose }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editFormData, setEditFormData] = useState<UpdateUserProfileData>({
    name: user.name,
    email: user.email,
    username: user.username,
  });

  const handleUpdateProfile = async () => {
    try {
      // Validaciones
      if (!editFormData.name || !editFormData.email || !editFormData.username) {
        Alert.alert("Error", "Por favor completa todos los campos requeridos");
        return;
      }

      if (editFormData.password && editFormData.password.length < 8) {
        Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
        return;
      }

      // Aquí iría la llamada al API
      // await api.updateUserProfile(editFormData);

      // Actualizar estado local
      setEditFormData({
        ...user,
        name: editFormData.name,
        email: editFormData.email,
        username: editFormData.username,
      });

      console.log("Perfil actualizado:", editFormData);
      Alert.alert("✅ Éxito", "Tu perfil ha sido actualizado correctamente");
      setIsEditModalVisible(false);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      Alert.alert("Error", "No se pudo actualizar el perfil. Inténtalo de nuevo.");
    }
  };
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Edit my profile"
      footer={
        <>
          <Button title="Save Changes" variant="primary" onPress={handleUpdateProfile} />
          <Button title="Cancel" variant="secondary" onPress={onClose} />
        </>
      }>
      <EditProfileForm 
      initialData={editFormData} 
      onDataChange={setEditFormData} />
    </Modal>
  );
};
