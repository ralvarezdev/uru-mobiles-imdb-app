import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { styles } from "./styles";

interface TextProps extends RNTextProps {
  variant?: "title" | "subtitle" | "body" | "label";
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ variant = "body", style, children, ...props }) => {
  return (
    <RNText
      style={[
        styles.base,
        variant === "title" && styles.title,
        variant === "subtitle" && styles.subtitle,
        variant === "body" && styles.body,
        variant === "label" && styles.label,
        style,
      ]}
      {...props}>
      {children}
    </RNText>
  );
};
