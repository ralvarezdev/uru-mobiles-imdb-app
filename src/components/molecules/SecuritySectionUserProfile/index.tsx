// components/molecules/SecuritySection/index.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { ModalUpdatePassword } from "../ModalUpdatePassword";
import {Text } from "@/components/atoms/Text";
import { styles } from "./style";
import { ModalUpdateEmail } from "../ModalUpdateEmail";
import { ChangeEmailRequest, ChangePasswordRequest } from "@ralvarezdev/proto-auth-ts";
import { GetMyProfileResponse } from "@ralvarezdev/proto-user-ts";

interface SecuritySectionUserProfileProps {
    user: GetMyProfileResponse | undefined;
  onEmailChange?: (newEmail: string) => void;
  onPasswordChange?: () => void;
}

export const SecuritySectionUserProfile: React.FC<SecuritySectionUserProfileProps> = ({
  user,

}) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);


  return (
    <View style={styles.container}>
      {/* Section Title */}
      <View style={styles.header}>
        <Text style={styles.icon}>🔒</Text>
        <Text style={styles.title}>Security</Text>
      </View>

      {/* Email Card */}
      <View style={styles.securityCard}>
        <View style={styles.securityInfo}>
          <Text style={styles.securityTitle}>Email Address</Text>
          <Text style={styles.securityValue}> {user?.email}</Text>
        </View>
        <TouchableOpacity
          style={styles.changeButton}
          onPress={() => setShowEmailModal(true)}
        >
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Password Card */}
      <View style={styles.securityCard}>
        <View style={styles.securityInfo}>
          <Text style={styles.securityTitle}>Password</Text>
          <Text style={styles.securityValue}>********</Text>
        </View>
        <TouchableOpacity
          style={styles.changeButton}
          onPress={() => setShowPasswordModal(true)}
        >
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <ModalUpdateEmail
        visible={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onConfirm={() => {}}
        currentEmail={user?.email}
      />

      <ModalUpdatePassword
        visible={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={() => {}}
      />
    </View>
  );
};