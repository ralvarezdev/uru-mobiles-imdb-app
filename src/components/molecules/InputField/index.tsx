// src/components/molecules/InputField.tsx
import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Text } from "@/components/atoms/Text";
import { Input } from "@/components/atoms/Input";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false, // ✅ Valor por defecto
  icon,
}) => {
  return (
    <View style={styles.container}>
      <Text variant="label" style={styles.label}>
        {label}
      </Text>
      <View style={styles.inputContainer}>
        {!!icon && <Text style={styles.icon}>{icon}</Text>}
        <Input
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry} // ✅ Ahora siempre es boolean
        />
      </View>
    </View>
  );
};
