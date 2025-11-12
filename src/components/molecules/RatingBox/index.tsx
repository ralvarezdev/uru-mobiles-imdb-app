import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";

interface RatingBoxProps {
  label: string;
  value: number;
  votes: number;
  color?: string;
}

const RatingBox = ({ label, value, votes, color = "#3b82f6" }: RatingBoxProps) => (
  <View style={styles.card}>
    <Text style={[styles.value, { color }]}>{value.toFixed(1)}</Text>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.votes}>{votes.toLocaleString()}</Text>
  </View>
);

export default RatingBox;
