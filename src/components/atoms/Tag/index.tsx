import React from "react";
import { Text, View } from "react-native";
import { styles } from "./style";

export interface TagProps {
  label: string;
  color: string;
  textColor: string;
}

export const Tag = ({ label, color = "#FFD700", textColor = "#332901" }: TagProps) => (
  <View style={[styles.tag, { backgroundColor: color }]}>
    <Text style={[styles.text, { color: textColor }]}>{label}</Text>
  </View>
);
