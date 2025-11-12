import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";

interface BadgeProps {
  children: React.ReactNode;
  bg?: string;
}

const Badge = ({ children, bg = "#eaf2ff" }: BadgeProps) => (
  <View style={[styles.container, { backgroundColor: bg }]}>
    <Text style={styles.text}>{children}</Text>
  </View>
);

export default Badge;
