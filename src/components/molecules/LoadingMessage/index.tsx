import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Loading } from "@/components/atoms/Loading";
import { Text } from "@/components/atoms/Text";

interface LoadingMessageProps {
  message?: string;
  size?: "small" | "large";
}

export const LoadingMessage: React.FC<LoadingMessageProps> = ({ message = "Cargando...", size = "large" }) => {
  return (
    <View style={styles.container}>
      <Loading size={size} />
      {!!message && (
        <Text variant="body" style={styles.message}>
          {message}
        </Text>
      )}
    </View>
  );
};
