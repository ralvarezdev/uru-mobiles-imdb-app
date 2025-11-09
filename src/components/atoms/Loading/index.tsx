import { colors } from "@/theme";
import React from "react";
import { View, ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { styles } from "./styles";

interface LoadingProps extends ActivityIndicatorProps {
  size?: "small" | "large";
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({ size = "large", color = colors.primary, ...props }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} {...props} />
    </View>
  );
};
