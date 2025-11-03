// src/components/organisms/DeleteAccountWarning.tsx
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import { DeleteAccountData } from "@/entities/User";
import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./style";

interface DeleteAccountFormProps {
  onDataChange: (data: DeleteAccountData) => void;
}

export const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({ onDataChange }) => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    onDataChange({ password: value });
  };

  return (
    <View>
      {/* Warning Box */}
      <View style={styles.warningBox}>
        <Text variant="body" style={styles.warningText}>
          <Text style={styles.bold}>⚠️ Esta acción es PERMANENTE</Text>
          {"\n\n"}
          Perderás:{"\n"}• Todos tus comentarios{"\n"}• Todas tus calificaciones{"\n"}• Tu historial completo
        </Text>
      </View>

      {/* Password Input */}
      <View style={styles.fieldContainer}>
        <Text variant="label" style={styles.label}>
          Confirma tu contraseña
        </Text>
        <Input placeholder="Ingresa tu contraseña actual" value={password} onChangeText={handlePasswordChange} secureTextEntry={true} />
      </View>
    </View>
  );
};
