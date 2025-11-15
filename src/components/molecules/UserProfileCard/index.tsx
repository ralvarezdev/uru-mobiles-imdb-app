import { Text } from "@/components/atoms/Text";
import { User } from "@/entities/User";
import React from "react";
import { View } from "react-native";
import { UserStatsGrid } from "../UserStatsGrid";
import { styles } from "./style";
import { GetMyProfileResponse } from "@ralvarezdev/proto-user-ts";
import { ListRolesResponse } from "@ralvarezdev/proto-auth-ts";

interface UserProfileCardProps {
  user: GetMyProfileResponse | undefined;
  // userRoles: string[];
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }: UserProfileCardProps) => {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarIcon}>👤</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>USUARIO</Text>
        {/* <Text style={styles.badgeText}>{userRoles.includes("critic") ? "CRÍTICO" : "USUARIO"}</Text> */}
        {/* <Text style={styles.badgeText}>{user.role === "critic" ? "CRÍTICO" : "USUARIO"}</Text> */}
      </View>
      <Text variant="title" style={styles.profileName}>
        {user?.firstName} {user?.lastName}
      </Text>
      <Text variant="body" style={styles.profileUsername}>
        @{user?.username}
      </Text>
      <Text variant="body" style={styles.profileEmail}>
        {user?.email}
      </Text>

      {/* <UserStatsGrid stats={user.stats} /> */}
    </View>
  );
};
