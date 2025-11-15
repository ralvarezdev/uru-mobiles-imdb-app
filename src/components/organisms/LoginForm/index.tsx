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
import { isParsedInternalServerError, isInternalServerError } from "@/utils/errorHandler";

interface FormErrors {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const [loginInput, setLoginInput] = useState<LogInRequest>({
    twoFactorCode: { value: undefined, case: undefined },
    username: "yeglistar",
    password: "P4$sw0rD#12345678",
    // password: "%hc1£`=2@[g#{m(AqHZL3D9|@-*z(LQ=kwl8!'[ZxETBQX1d2j",
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
    // Clear any previous errors before making the request
    authService.clearLastError();

    try {
      const result = await authService.logIn(loginInput);
      // console.log("Login result:", result);

      if (result && result.$typeName === "ralvarezdev.v1.LogInResponse") {
        Toast.show({
          type: "success", // 'success', 'error', 'info'
          text1: "Login successful",
          text2: "You will be redirected to home...",
          position: "bottom", // o 'top'
          visibilityTime: 5000, // 5 seconds
        });
        router.replace("/(tabs)/home");
      } else {
        // Response is undefined, check for parsed error
        const parsedError = authService.getLastError();

        if (parsedError) {
          const { generalMessage, errorCode, fieldErrors } = parsedError;

          // Check for invalid_argument error (invalid username or password)
          if (
            errorCode === "invalid_argument" ||
            generalMessage.toLowerCase().includes("invalid username") ||
            generalMessage.toLowerCase().includes("invalid password") ||
            generalMessage.toLowerCase().includes("invalid username or password")
          ) {
            // Set errors on both fields
            setErrors({
              username: "Invalid username or password",
              password: "Invalid username or password",
            });

            Toast.show({
              type: "error",
              text1: "Invalid credentials",
              text2: "Please verify your username and password.",
              position: "bottom",
              visibilityTime: 5000, // 5 seconds
            });
          } else {
            // Check for other technical errors (internal, 502, authentication, etc.)
            const isTechnicalError =
              isParsedInternalServerError(parsedError) ||
              errorCode === "unauthenticated" ||
              generalMessage.toLowerCase().includes("missing authorization") ||
              generalMessage.toLowerCase().includes("unauthorized");

            if (isTechnicalError) {
              // Don't show technical errors to users
              Toast.show({
                type: "error",
                text1: "Login failed",
                text2: "There was a problem signing in. Please try again.",
                position: "bottom",
                visibilityTime: 5000, // 5 seconds
              });
            } else {
              // Other errors
              Toast.show({
                type: "error",
                text1: "Login failed",
                text2: generalMessage || "There was a problem signing in. Please try again.",
                position: "bottom",
                visibilityTime: 5000, // 5 seconds
              });
            }
          }
        } else {
          // No parsed error available, show generic message
          Toast.show({
            type: "error",
            text1: "Login failed",
            text2: "Please verify your username and password.",
            position: "bottom",
            visibilityTime: 5000, // 5 seconds
          });
        }
      }
    } catch (error: any) {
      // This catch should rarely be hit now, but keep it as a safety net
      console.error("Unexpected login error:", error);
      const isInternalError = isInternalServerError(error);
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: isInternalError ? "An internal error occurred. Please try again later." : "Please try again later.",
        position: "bottom",
        visibilityTime: 5000,
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
