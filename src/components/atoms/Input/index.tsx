import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { styles } from "./styles";

interface InputProps extends TextInputProps {
  placeholder: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="#BDC3C7"
      {...props}
    />
  );
};
