// src/screens/UserProfile.tsx
import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/atoms/Modal";
import { Text } from "@/components/atoms/Text";
import { CriticModalContent } from "@/components/organisms/CriticContent";
import { DeleteAccountForm } from "@/components/organisms/DeleteAccountForm";
import { EditProfileForm } from "@/components/organisms/EditProfileForm";
import { mockUser } from "@/components/types/User";
import { DeleteAccountData, UpdateUserProfileData, User } from "@/entities/User";
import React, { useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";

// Mock del usuario (en producción vendría de contexto/Redux/API)
export const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser);

  // Estados de modales
  const [isCriticModalVisible, setIsCriticModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Estados de formularios
  const [editFormData, setEditFormData] = useState<UpdateUserProfileData>({
    name: user.name,
    email: user.email,
    username: user.username,
  });
  const [deleteFormData, setDeleteFormData] = useState<DeleteAccountData>({
    password: "",
  });

  // Handlers de lógica de negocio

  const handleRequestCritic = async () => {
    try {
      // Aquí iría la llamada al API
      // await api.requestCriticStatus();

      console.log("Solicitud de crítico enviada");
      Alert.alert(
        "✅ ¡Solicitud enviada!",
        "🎭 Tu solicitud para convertirte en Crítico Verificado ha sido enviada.\n\n📧 Un administrador revisará tu perfil y recibirás una notificación cuando sea procesada.\n\n¡Gracias por tu interés!"
      );
      setIsCriticModalVisible(false);
    } catch (error) {
      console.error("Error al solicitar ser crítico:", error);
      Alert.alert("Error", "No se pudo enviar la solicitud. Inténtalo de nuevo.");
    }
  };

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
      setUser({
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

              console.log("Cuenta eliminada");
              Alert.alert("🗑️ Cuenta eliminada", "Tu cuenta ha sido eliminada permanentemente.\n\nGracias por usar CineReview.");
              setIsDeleteModalVisible(false);
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text variant="title" style={styles.headerTitle}>
            User Profile
          </Text>
          <Text variant="body" style={styles.headerSubtitle}>
            Information and Activity
          </Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{user.role === "critic" ? "CRÍTICO" : "USUARIO"}</Text>
          </View>
          <Text variant="title" style={styles.profileName}>
            {user.name}
          </Text>
          <Text variant="body" style={styles.profileUsername}>
            @{user.username}
          </Text>
          <Text variant="body" style={styles.profileEmail}>
            {user.email}
          </Text>

          {/* Stats */}
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text variant="title" style={styles.statValue}>
                {user.stats.moviesRated}
              </Text>
              <Text variant="body" style={styles.statLabel}>
                Movies
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="title" style={styles.statValue}>
                {user.stats.comments}
              </Text>
              <Text variant="body" style={styles.statLabel}>
                Comments
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="title" style={styles.statValue}>
                {user.stats.averageRating}
              </Text>
              <Text variant="body" style={styles.statLabel}>
                Average
              </Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Personal Info Section */}
          <View style={styles.sectionHeader}>
            <Text variant="subtitle">Personal Information</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoLabel}>
                <Text style={styles.infoIcon}>👤</Text>
                <Text variant="body" style={styles.infoLabelText}>
                  Full Name
                </Text>
              </View>
              <Text variant="body" style={styles.infoValue}>
                {user.name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoLabel}>
                <Text style={styles.infoIcon}>📧</Text>
                <Text variant="body" style={styles.infoLabelText}>
                  Email
                </Text>
              </View>
              <Text variant="body" style={styles.infoValue}>
                {user.email}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoLabel}>
                <Text style={styles.infoIcon}>@</Text>
                <Text variant="body" style={styles.infoLabelText}>
                  Username
                </Text>
              </View>
              <Text variant="body" style={styles.infoValue}>
                @{user.username}
              </Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <Button title="Edit my profile" onPress={() => setIsEditModalVisible(true)} variant="primary" />
            <Button title="Delete my account" onPress={() => setIsDeleteModalVisible(true)} variant="secondary" />
          </View>

          {user.role !== "critic" && (
            <View style={styles.criticPromoCard}>
              <View style={styles.criticPromoHeader}>
                <Text style={styles.criticPromoIcon}>🎭</Text>
                <View style={styles.criticPromoText}>
                  <Text variant="subtitle" style={styles.criticPromoTitle}>
                    Are you a movie critic?
                  </Text>
                  <Text variant="body" style={styles.criticPromoSubtitle}>
                    Become a verified critic and get a special badge on your profile!
                  </Text>
                </View>
              </View>
              <Button title="⭐ Request to be a Critic" onPress={() => setIsCriticModalVisible(true)} variant="primary" />
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={isCriticModalVisible}
        onClose={() => setIsCriticModalVisible(false)}
        title="Become a Critic"
        footer={
          <>
            <Button title="Confirm" variant="primary" onPress={handleRequestCritic} />
            <Button title="Cancel" variant="secondary" onPress={() => setIsCriticModalVisible(false)} />
          </>
        }>
        <CriticModalContent />
      </Modal>

      <Modal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        title="Edit my profile"
        footer={
          <>
            <Button title="Save Changes" variant="primary" onPress={handleUpdateProfile} />
            <Button title="Cancel" variant="secondary" onPress={() => setIsEditModalVisible(false)} />
          </>
        }>
        <EditProfileForm initialData={editFormData} onDataChange={setEditFormData} />
      </Modal>

      <Modal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        title="Eliminar cuenta"
        footer={
          <>
            <Button title="Cancelar" variant="secondary" onPress={() => setIsDeleteModalVisible(false)} />
            <Button title="Eliminar" variant="secondary" onPress={handleDeleteAccount} />
          </>
        }>
        <DeleteAccountForm onDataChange={setDeleteFormData} />
      </Modal>
    </SafeAreaView>
  );
};
