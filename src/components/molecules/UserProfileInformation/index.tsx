import React from "react";
import { View } from "react-native";
import { Text } from "@/components/atoms/Text";
import { User } from "@/entities/User";
import { styles } from "./style";
import { GetMyProfileResponse } from "@ralvarezdev/proto-user-ts";

interface UserProfileInformationProps {
  user: GetMyProfileResponse | undefined;
}

export const UserProfileInformation: React.FC<UserProfileInformationProps> = ({ user }: UserProfileInformationProps) => {
  return (
    <View style={styles.content}>
      {/* <View style={styles.sectionHeader}>
        <Text variant="subtitle">Personal Information</Text>
      </View> */}
      <View style={styles.header}>
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.title}>Personal Information</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.infoLabel}>
            <Text style={styles.infoIcon}>👤</Text>
            <Text variant="body" style={styles.infoLabelText}>
              First Name
            </Text>
          </View>
          <Text variant="body" style={styles.infoValue}>
            {user?.firstName}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoLabel}>
            <Text style={styles.infoIcon}>👤</Text>
            <Text variant="body" style={styles.infoLabelText}>
              Last Name
            </Text>
          </View>
          <Text variant="body" style={styles.infoValue}>
            {user?.lastName}
          </Text>
        </View>
        {/* <View style={styles.infoRow}>
          <View style={styles.infoLabel}>
            <Text style={styles.infoIcon}>📧</Text>
            <Text variant="body" style={styles.infoLabelText}>
              Email
            </Text>
          </View>
          <Text variant="body" style={styles.infoValue}>
            {user?.email}
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
            @{user?.username}
          </Text>
        </View> */}
      </View>
    </View>
  );
};
