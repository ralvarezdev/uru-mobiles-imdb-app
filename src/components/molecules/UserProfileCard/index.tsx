import { Text } from "@/components/atoms/Text";
import { User } from "@/entities/User";
import React from "react";
import { View } from "react-native";
import { UserStatsGrid } from "../UserStatsGrid";
import { styles } from "./style";

interface UserProfileCardProps {
  user: User;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }: UserProfileCardProps) => {
  return (
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

      <UserStatsGrid stats={user.stats} />
    </View>
  );
};
