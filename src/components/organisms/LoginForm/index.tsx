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

interface FormErrors {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const [loginInput, setLoginInput] = useState<LogInRequest>({
    twoFactorCode: { value: undefined, case: undefined },
    username: "yeglistar",
    password: "%hc1£`=2@[g#{m(AqHZL3D9|@-*z(LQ=kwl8!'[ZxETBQX1d2j",
  } as LogInRequest);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    password: "",
  });

  const validateForm = (): { isValid: boolean; errorMessage: string } => {
    let isValid = true;
    const newErrors: FormErrors = {
      username: "",
      password: "",
    };
    let errorMessage = "";

    if (!loginInput.username || loginInput.username.trim() === "") {
      newErrors.username = "Username is required";
      errorMessage = "Username is required";
      isValid = false;
    }

    if (!loginInput.password || loginInput.password.trim() === "") {
      newErrors.password = "Password is required";
      if (!errorMessage) errorMessage = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return { isValid, errorMessage };
  };

  const handleRegisterNavigation = () => {
    router.push("/register");
  };

  const handleChangeLoginInput = (field: string, value: string) => {
    setLoginInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleOnLogin = async () => {
    // Validaciones de campos
    const validation = validateForm();
    if (!validation.isValid) {
      return;
    }

    setLoading(true);
    try {
      const result = await authService.logIn(loginInput);
      if (result?.$typeName === "ralvarezdev.v1.LogInResponse") {
        Toast.show({
          type: "success", // 'success', 'error', 'info'
          text1: "Login successful",
          text2: "You will be redirected to home...",
          position: "bottom", // o 'top'
        });
        router.replace("/(tabs)/home");
      } else {
        Toast.show({
          type: "error", // 'success', 'error', 'info'
          text1: "User not found",
          text2: "Please verify your username and password.",
          position: "bottom", // o 'top'
        });
      }
    } catch (error) {
      Toast.show({
        type: "error", // 'success', 'error', 'info'
        text1: "There was a problem with your request",
        text2: "Please try again later.",
        position: "bottom", // o 'top'
      });
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingMessage message="Signing in..." />;
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
        error={errors.username}
        icon="📧"
      />

      <InputField
        label="Password"
        placeholder="Your password"
        value={loginInput.password}
        onChangeText={(text) => handleChangeLoginInput("password", text)}
        error={errors.password}
        secureTextEntry={true}
        icon="🔒"
      />

      <Button title="Sign In" onPress={handleOnLogin} loading={loading} />

      <Text style={styles.registerText}>
        You don't have an account?{" "}
        <Text style={styles.registerLink} onPress={handleRegisterNavigation}>
          Sign up for free
        </Text>
      </Text>
    </View>
  );
};
