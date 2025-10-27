import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Text } from "@/components/atoms/Text";

export const LoginHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.clapperboard}>🎬</Text>
        <Text style={styles.title}>Critics</Text>
        <Text style={styles.subtitle}>Your cinema in a touch</Text>
      </View>
    </View>
  );
};
