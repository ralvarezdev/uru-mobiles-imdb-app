import { Text } from "@/components/atoms/Text";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./style";

export const UserProfileHeader: React.FC = () => {
  return (
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
  );
};
