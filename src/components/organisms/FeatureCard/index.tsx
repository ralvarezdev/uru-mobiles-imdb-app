import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import { GetMyProfileResponse } from "@ralvarezdev/proto-user-ts";

export interface FeatureCardProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  subtitle: string;
  user: GetMyProfileResponse;
  critic: boolean;
}

export const FeaturedCard = ({ title, icon, subtitle, user, critic }: FeatureCardProps) => (
  <View style={styles.card}>
    <View style={styles.badge}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="star" size={14} color="#F7BB36" style={{ marginRight: 4 }} />
        <Text style={styles.badgeText}>DESTACADA</Text>
      </View>
    </View>
    <View style={styles.content}>
      <Ionicons name={icon} size={54} color="#DF3D36" />
    </View>
    <View style={styles.info}>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.scoresRow}>
        <View style={styles.score}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="star" size={14} color="#F7BB36" style={{ marginRight: 4 }} />
            <Text style={styles.scoreType}>Usuarios</Text>
          </View>
          <Text style={styles.scoreValue}>{user.username}</Text>
        </View>
        <View style={styles.score}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="star" size={14} color="#F7BB36" style={{ marginRight: 4 }} />
            <Text style={styles.scoreType}>Críticos</Text>
          </View>
          <Text style={styles.scoreValue}>{critic ? "Yes" : "No"}</Text>
        </View>
      </View>
    </View>
  </View>
);
