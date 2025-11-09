import { Text } from "@/components/atoms/Text";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./style";
export const UserRegisterHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>🎬</Text>
      <Text style={styles.title}>Create Account</Text>
    </View>
  );
};
