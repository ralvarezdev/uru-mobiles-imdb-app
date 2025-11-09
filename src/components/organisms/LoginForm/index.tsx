import React, { useState } from "react";
import { View } from "react-native";
// import { ProfileType, LoginFormData } from "../../../types";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { InputField } from "@/components/molecules/InputField";
import { UserLogin } from "@/components/types/User";
import { styles } from "./styles";
import { router, useRouter } from "expo-router";

interface LoginFormProps {
  onSubmit: (data: UserLogin) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);



  const handleSubmit = async () => {
    setLoading(true);
    try {
      onSubmit({ username, password });
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterNavigation = () => {
    router.push("/register");
  };

  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.welcomeText}>
        Welcome!
      </Text>
      <Text variant="subtitle" style={styles.subtitle}>
        Sign in or sign up
      </Text>

      <InputField label="Email" placeholder="you@email.com" value={username} onChangeText={setEmail} icon="📧" />

      <InputField label="Password" placeholder="Your password" value={password} onChangeText={setPassword} secureTextEntry={true} icon="🔒" />

      <Button title="Iniciar Sesión" onPress={handleSubmit} loading={loading} />

      <Text style={styles.registerText}>
        You don't have an account? <Text style={styles.registerLink} onPress={handleRegisterNavigation}>Sign up for free</Text>
      </Text>
    </View>
  );
};
