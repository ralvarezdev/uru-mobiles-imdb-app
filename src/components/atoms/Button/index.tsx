import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { styles } from "./styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = "primary", loading = false, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, variant === "primary" ? styles.primaryButton : styles.secondaryButton, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
};
