import { UserProfileCard } from "@/components/molecules/UserProfileCard";
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
    </View>
  );
};
