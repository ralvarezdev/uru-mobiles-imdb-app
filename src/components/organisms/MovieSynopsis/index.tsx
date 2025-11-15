import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";

interface MovieSynopsisProps {
  synopsis: string;
}

export const MovieSynopsis: React.FC<MovieSynopsisProps> = ({ synopsis }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Synopsis</Text>
      <Text style={styles.text}>{synopsis}</Text>
    </View>
  );
};

