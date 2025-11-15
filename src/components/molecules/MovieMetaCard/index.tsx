import React from "react";
import { View, Text } from "react-native";
import Badge from "@/components/atoms/Badge";
import { styles } from "./style";

interface MovieMetaCardProps {
  icon: string;
  label: string;
  value: string;
}

export const MovieMetaCard: React.FC<MovieMetaCardProps> = ({ icon, label, value }) => {
  return (
    <View style={styles.container}>
      <Badge bg="#eaf2ff">{icon} {label}</Badge>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

