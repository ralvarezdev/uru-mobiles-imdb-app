import React, { useState } from "react";
import { Alert } from "react-native";
import { Button } from "../../atoms/Button";
import { UpdateUserProfileData, User } from "@/entities/User";
import { EditProfileForm } from "@/components/organisms/EditProfileForm";
import { Modal } from "@/components/atoms/Modal";
import { GetMyProfileResponse, UpdateProfileRequest } from "@ralvarezdev/proto-user-ts";
import userService from "@/services/userService";

interface ModalEditUserProfileProps {
  user: GetMyProfileResponse | undefined;
  visible: boolean;
  onClose: () => void;
}

export const ModalEditUserProfile: React.FC<ModalEditUserProfileProps> = ({ user, visible, onClose }) => {
  // const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editFormData, setEditFormData] = useState<UpdateProfileRequest>({
    firstName: user?.firstName,
    lastName: user?.lastName,
    birthdate: user?.birthdate,
    // email: user?.email,
    // username: user?.username,
    $typeName: "ralvarezdev.v1.UpdateProfileRequest",
  });

  const handleUpdateProfile = async () => {
    try {
      if (!editFormData.lastName || !editFormData.firstName) {
        // if (!editFormData.lastName || !editFormData.firstName || !editFormData.email || !editFormData.username) {
        Alert.alert("Error", "Por favor completa todos los campos requeridos");
        return;
      }

      // if (editFormData.password && editFormData.password.length < 8) {
      //   Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
      //   return;
      // }

      const resultUpdateProfile = userService.update(editFormData);

      setEditFormData({
        ...editFormData,
        firstName: editFormData.firstName,
        lastName: editFormData.lastName,
        birthdate: editFormData.birthdate,
        // email: editFormData.email,
        // username: editFormData.username,
      });

      console.log("Perfil actualizado:", editFormData);
      Alert.alert("✅ Éxito", "Tu perfil ha sido actualizado correctamente");
      onClose();
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
      <EditProfileForm initialData={editFormData} onDataChange={setEditFormData} />
    </Modal>
  );
};
