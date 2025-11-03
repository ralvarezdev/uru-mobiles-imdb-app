import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "../../atoms/Button";
import { styles } from "./style";
import { Modal } from "@/components/atoms/Modal";
import { ModalEditUserProfile } from "../ModalEditUserProfile";
import { User } from "@/entities/User";
import { ModalDeleteUserProfileAccount } from "../ModalDeleteUserProfileAccount";

interface ActionButtonsUserProfileProps {
  user: User;
}

export const ActionButtonsUserProfile: React.FC<ActionButtonsUserProfileProps> = ({ user }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  return (
    <View style={styles.actionButtons}>
      <Button title="Edit my profile" onPress={() => setIsEditModalVisible(true)} variant="primary" />
      <Button title="Delete my account" onPress={() => setIsDeleteModalVisible(true)} variant="primary" />
      <ModalEditUserProfile
        user={user}
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
      />
      <ModalDeleteUserProfileAccount
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      />

    </View>
  );
};
