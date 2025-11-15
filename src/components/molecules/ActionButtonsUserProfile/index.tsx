import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "../../atoms/Button";
import { styles } from "./style";
import { Modal } from "@/components/atoms/Modal";
import { ModalEditUserProfile } from "../ModalEditUserProfile";
import { User } from "@/entities/User";
import { ModalDeleteUserProfileAccount } from "../ModalDeleteUserProfileAccount";
import { GetMyProfileResponse } from "@ralvarezdev/proto-user-ts";

interface ActionButtonsUserProfileProps {
  user: GetMyProfileResponse | undefined;
  onFirstNameChange: (text: string) => void;
  onLastNameChange: (text: string) => void;
}

export const ActionButtonsUserProfile: React.FC<ActionButtonsUserProfileProps> = ({ user, onFirstNameChange, onLastNameChange }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  return (
    <View style={styles.actionButtons}>
      <Button title="Edit my profile" onPress={() => setIsEditModalVisible(true)} variant="primary" />
      <Button title="Delete my account" onPress={() => setIsDeleteModalVisible(true)} variant="primary" />
      <ModalEditUserProfile
        user={user}
        visible={isEditModalVisible}
        onFirstNameChange={onFirstNameChange}
        onLastNameChange={onLastNameChange}
        onClose={() => setIsEditModalVisible(false)}
      />
      <ModalDeleteUserProfileAccount visible={isDeleteModalVisible} onClose={() => setIsDeleteModalVisible(false)} />
    </View>
  );
};
