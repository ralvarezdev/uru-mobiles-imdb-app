import { Text } from "@/components/atoms/Text";
import { UserStats } from "@/entities/User";
import React from "react";
import { View } from "react-native";
import { styles } from "./style";

interface UserStatsGridProps {
  stats: UserStats;
}

export const UserStatsGrid: React.FC<UserStatsGridProps> = ({ stats }) => {
  return (
    <View style={styles.statsGrid}>
      <View style={styles.statItem}>
        <Text variant="title" style={styles.statValue}>
          {stats.moviesRated}
        </Text>
        <Text variant="body" style={styles.statLabel}>
          Movies
        </Text>
      </View>
      <View style={styles.statItem}>
        <Text variant="title" style={styles.statValue}>
          {stats.comments}
        </Text>
        <Text variant="body" style={styles.statLabel}>
          Comments
        </Text>
      </View>
      <View style={styles.statItem}>
        <Text variant="title" style={styles.statValue}>
          {stats.averageRating}
        </Text>
        <Text variant="body" style={styles.statLabel}>
          Average
        </Text>
      </View>
    </View>
  );
};
