import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

interface InputProps extends TextInputProps {
  placeholder: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, ...props }) => {
  return <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor="#BDC3C7" {...props} />;
};
