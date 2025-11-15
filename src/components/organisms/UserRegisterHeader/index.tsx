import { Text } from "@/components/atoms/Text";
import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
export const UserRegisterHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Ionicons name="film" size={48} color="#DF3D36" />
      <Text style={styles.title}>Create Account</Text>
    </View>
  );
};
