import { Href, router } from "expo-router";
import React from "react";
import { Alert } from "react-native";
// import { LoginFormData } from "../../types";
import { LoginForm } from "@/components/organisms/LoginForm";
import { LoginHeader } from "@/components/organisms/LoginHeader";
import { ScreenTemplate } from "@/components/templates/ScreenTemplate";
import { mockUser, UserLogin } from "@/components/types/User";
import { User } from "@/entities/User";

export const LoginScreen: React.FC = () => {
  const handleLogin = async (data: UserLogin) => {
    console.log("Login data:", data);
    const user: User = { ...mockUser };

    Alert.alert("Login", `Email: ${user.email}\nPerfil: ${user.role}`);
    router.replace("/(tabs)/favorites" as Href);
  };

  return (
    <ScreenTemplate header={<LoginHeader />}>
      <LoginForm onSubmit={handleLogin} />
    </ScreenTemplate>
  );
};
