import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Badge from "@/components/atoms/Badge";
import { styles } from "./style";

interface MovieMetaCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

export const MovieMetaCard: React.FC<MovieMetaCardProps> = ({ icon, label, value }) => {
  return (
    <View style={styles.container}>
      <Badge bg="#eaf2ff">
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name={icon} size={16} color="#0f1724" style={{ marginRight: 6 }} />
          <Text>{label}</Text>
        </View>
      </Badge>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

