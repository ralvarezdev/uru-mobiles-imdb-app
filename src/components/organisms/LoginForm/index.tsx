import React, { useState } from "react";
import { View } from "react-native";
// import { ProfileType, LoginFormData } from "../../../types";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { styles } from "./styles";
import { InputField } from "@/components/molecules/InputField";

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      onSubmit({ email, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.welcomeText}>
        Welcome!
      </Text>
      <Text variant="subtitle" style={styles.subtitle}>
        Sign in or sign up
      </Text>

      <InputField label="Email" placeholder="you@email.com" value={email} onChangeText={setEmail} icon="📧" />

      <InputField label="Password" placeholder="Your password" value={password} onChangeText={setPassword} secureTextEntry icon="🔒" />

      <Button title="Iniciar Sesión" onPress={handleSubmit} loading={loading} />

      <Text style={styles.registerText}>
        You don't have an account? <Text style={styles.registerLink}>Sign up for free</Text>
      </Text>
    </View>
  );
};
