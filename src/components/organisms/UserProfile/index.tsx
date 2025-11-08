import { Modal } from "@/components/atoms/Modal";
import { ActionButtonsUserProfile } from "@/components/molecules/ActionButtonsUserProfile";
import { ModalBecomeACritic } from "@/components/molecules/ModalBecomeACritic";
import { ModalEditUserProfile } from "@/components/molecules/ModalEditUserProfile";
import { RequestToBeCriticUserProfile } from "@/components/molecules/RequestToBeCriticUserProfile";
import { UserProfileCard } from "@/components/molecules/UserProfileCard";
import { UserProfileInformation } from "@/components/molecules/UserProfileInformation";
import { User } from "@/entities/User";
import React from "react";
import { View } from "react-native";

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <View>
      <UserProfileCard user={user} />
      <UserProfileInformation user={user} />
      <ActionButtonsUserProfile user={user} />
      <RequestToBeCriticUserProfile user={user} />
    </View>
  );
};
