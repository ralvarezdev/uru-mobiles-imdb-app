import { UserProfile } from "@/components/organisms/UserProfile";
import { UserProfileHeader } from "@/components/organisms/UserProfileHeader";
import { ScreenTemplate } from "@/components/templates/ScreenTemplate";
import { mockUser } from "@/components/types/User";
import { User } from "@/entities/User";
import React, { useState } from "react";

export const UserProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser);

  // // Estados de modales
  // const [isCriticModalVisible, setIsCriticModalVisible] = useState(false);
  // const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  // const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // // Estados de formularios
  // const [editFormData, setEditFormData] = useState<UpdateUserProfileData>({
  //   name: user.name,
  //   email: user.email,
  //   username: user.username,
  // });
  // const [deleteFormData, setDeleteFormData] = useState<DeleteAccountData>({
  //   password: "",
  // });

  // // Handlers de lógica de negocio

  // const handleRequestCritic = async () => {
  //   try {
  //     // Aquí iría la llamada al API
  //     // await api.requestCriticStatus();

  //     console.log("Solicitud de crítico enviada");
  //     Alert.alert(
  //       "✅ ¡Solicitud enviada!",
  //       "🎭 Tu solicitud para convertirte en Crítico Verificado ha sido enviada.\n\n📧 Un administrador revisará tu perfil y recibirás una notificación cuando sea procesada.\n\n¡Gracias por tu interés!"
  //     );
  //     setIsCriticModalVisible(false);
  //   } catch (error) {
  //     console.error("Error al solicitar ser crítico:", error);
  //     Alert.alert("Error", "No se pudo enviar la solicitud. Inténtalo de nuevo.");
  //   }
  // };

  // const handleUpdateProfile = async () => {
  //   try {
  //     // Validaciones
  //     if (!editFormData.name || !editFormData.email || !editFormData.username) {
  //       Alert.alert("Error", "Por favor completa todos los campos requeridos");
  //       return;
  //     }

  //     if (editFormData.password && editFormData.password.length < 8) {
  //       Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
  //       return;
  //     }

  //     // Aquí iría la llamada al API
  //     // await api.updateUserProfile(editFormData);

  //     // Actualizar estado local
  //     setUser({
  //       ...user,
  //       name: editFormData.name,
  //       email: editFormData.email,
  //       username: editFormData.username,
  //     });

  //     console.log("Perfil actualizado:", editFormData);
  //     Alert.alert("✅ Éxito", "Tu perfil ha sido actualizado correctamente");
  //     setIsEditModalVisible(false);
  //   } catch (error) {
  //     console.error("Error al actualizar perfil:", error);
  //     Alert.alert("Error", "No se pudo actualizar el perfil. Inténtalo de nuevo.");
  //   }
  // };

  // const handleDeleteAccount = async () => {
  //   try {
  //     // Validación
  //     if (!deleteFormData.password) {
  //       Alert.alert("Error", "Por favor ingresa tu contraseña para confirmar");
  //       return;
  //     }

  //     // Confirmación final
  //     Alert.alert("🚨 ÚLTIMA CONFIRMACIÓN", "¿Realmente quieres eliminar tu cuenta permanentemente?\n\nEsta acción NO se puede deshacer.", [
  //       {
  //         text: "Cancelar",
  //         style: "cancel",
  //       },
  //       {
  //         text: "Eliminar",
  //         style: "destructive",
  //         onPress: async () => {
  //           try {
  //             // Aquí iría la llamada al API
  //             // await api.deleteAccount(deleteFormData);

  //             console.log("Cuenta eliminada");
  //             Alert.alert("🗑️ Cuenta eliminada", "Tu cuenta ha sido eliminada permanentemente.\n\nGracias por usar CineReview.");
  //             setIsDeleteModalVisible(false);
  //             // Redirigir al login
  //           } catch (error) {
  //             Alert.alert("Error", "Contraseña incorrecta o error en el servidor");
  //           }
  //         },
  //       },
  //     ]);
  //   } catch (error) {
  //     console.error("Error al eliminar cuenta:", error);
  //     Alert.alert("Error", "No se pudo eliminar la cuenta. Verifica tu contraseña.");
  //   }
  // };

  return (
    <ScreenTemplate header={<UserProfileHeader />}>
      <UserProfile user={user} />
    </ScreenTemplate>
  );
};
