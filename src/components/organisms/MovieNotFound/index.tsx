import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";

interface MovieNotFoundProps {
  onBack: () => void;
}

export const MovieNotFound: React.FC<MovieNotFoundProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.8}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.text}>Movie not found</Text>
    </View>
  );
};

