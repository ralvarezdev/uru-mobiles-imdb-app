import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
import { GetMyProfileResponse } from "@ralvarezdev/proto-user-ts";

export interface FeatureCardProps {
  title: string;
  emoji: string;
  subtitle: string;
  user: GetMyProfileResponse;
  critic: boolean;
}

export const FeaturedCard = ({ title, emoji, subtitle, user, critic }: FeatureCardProps) => (
  <View style={styles.card}>
    <View style={styles.badge}>
      <Text style={styles.badgeText}>🌟 DESTACADA</Text>
    </View>
    <View style={styles.content}>
      <Text style={styles.emoji}>{emoji}</Text>
    </View>
    <View style={styles.info}>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.scoresRow}>
        <View style={styles.score}>
          <Text style={styles.scoreType}>⭐ Usuarios</Text>
          <Text style={styles.scoreValue}>{user.username}</Text>
        </View>
        <View style={styles.score}>
          <Text style={styles.scoreType}>⭐ Críticos</Text>
          <Text style={styles.scoreValue}>{critic}</Text>
        </View>
      </View>
    </View>
  </View>
);
