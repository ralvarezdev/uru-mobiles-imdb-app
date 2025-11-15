import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./style";

interface ReviewInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
}

export const ReviewInput: React.FC<ReviewInputProps> = ({
  value,
  onChangeText,
  error,
  placeholder = "Write your review here...",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Review</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor="#BDC3C7"
        value={value}
        onChangeText={onChangeText}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

