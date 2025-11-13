import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { InputField } from "@/components/molecules/InputField";
import { LogInRequest } from "@ralvarezdev/proto-auth-ts";
import { styles } from "./styles";
import { router, useRouter } from "expo-router";
import { LoadingMessage } from "@/components/molecules/LoadingMessage";
import Toast from "react-native-toast-message";
import { authService } from "@/services/authService";

export const LoginForm: React.FC = () => {
  const [loginInput, setLoginInput] = useState<LogInRequest>({
    password: "yeglistar",
    twoFactorCode: { value: "", case: "emailCode" },
    username: "yeglistar",
  } as LogInRequest);
  const [loading, setLoading] = useState(false);

  const handleRegisterNavigation = () => {
    router.push("/register");
  };

  const handleChangeLoginInput = (field: string, value: string) => {
    setLoginInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleOnLogin = async () => {
    setLoading(true);
    try {
      if (!loginInput.username || loginInput.username.trim() === "" || !loginInput.password || loginInput.password.trim() === "") {
        Toast.show({
          type: "error", // 'success', 'error', 'info'
          text1: "Datos incorrectos",
          text2: "Por favor, verifique email y contraseña.",
          position: "bottom", // o 'top'
        });
        return;
      }
      //const result = await authService.logIn(loginInput);
      //console.log("login", result);
      // if (authUser.id) {
      //   Toast.show({
      //     type: "success", // 'success', 'error', 'info'
      //     text1: "Usuario autenticado",
      //     text2: "Se le redireccionara al home..",
      //     position: "bottom", // o 'top'
      //   });
        router.replace("/profile");
      // } else {
      //   Toast.show({
      //     type: "error", // 'success', 'error', 'info'
      //     text1: "Usuario no encontrado",
      //     text2: "Por favor, verifique email y contraseña.",
      //     position: "bottom", // o 'top'
      //   });
      // }
    } catch (error) {
      Toast.show({
        type: "error", // 'success', 'error', 'info'
        text1: "Hubo un problema con su solicitud. ",
        text2: `Por favor, intentelo de nuevo mas tarde.`,
        position: "bottom", // o 'top'
      });
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingMessage message="Iniciando sesion..." />;
  }
  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.welcomeText}>
        Welcome!
      </Text>
      <Text variant="subtitle" style={styles.subtitle}>
        Sign in or sign up
      </Text>

      <InputField
        label="Username"
        placeholder="Your username"
        value={loginInput.username}
        onChangeText={(text) => handleChangeLoginInput("username", text)}
        icon="📧"
      />

      <InputField
        label="Password"
        placeholder="Your password"
        value={loginInput.password}
        onChangeText={(text) => handleChangeLoginInput("password", text)}
        secureTextEntry={true}
        icon="🔒"
      />

      <Button title="Iniciar Sesión" onPress={handleOnLogin} loading={loading} />

      <Text style={styles.registerText}>
        You don't have an account? <Text style={styles.registerLink} onPress={handleRegisterNavigation}>Sign up for free</Text>
      </Text>
    </View>
  );
};
