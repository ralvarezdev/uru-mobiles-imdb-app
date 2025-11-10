// src/components/organisms/DeleteAccountWarning.tsx
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import { DeleteAccountData } from "@/entities/User";
import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./style";
import { DeleteAccountRequest } from "@ralvarezdev/proto-user-ts";

interface DeleteAccountFormProps {
  data: DeleteAccountRequest;
  onDataChange: (data: DeleteAccountRequest) => void;
}

export const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({ data, onDataChange }) => {
  // const [data, setData]
  // const [password, setPassword] = useState("");

  const handlePasswordChange = (value: string) => {
    // setPassword(value);
    onDataChange({ ...data, password: value });
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
        <Input placeholder="Ingresa tu contraseña actual" value={data.password} onChangeText={handlePasswordChange} secureTextEntry={true} />
      </View>
    </View>
  );
};
