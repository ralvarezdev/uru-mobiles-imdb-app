import { Href, router } from "expo-router";
import React from "react";
import { Alert } from "react-native";
import { LoginHeader } from "@/components/organisms/LoginHeader";
import { ScreenTemplate } from "@/components/templates/ScreenTemplate";
import { mockUser, UserLogin } from "@/components/types/User";
import { User } from "@/entities/User";
import { UserRegisterForm } from "@/components/organisms/UserRegisterForm";
import { UserRegisterHeader } from "@/components/organisms/UserRegisterHeader";

export const RegisterScreen: React.FC = () => {
  // const handleLogin = async (data: UserLogin) => {
  //   console.log("Login data:", data);
  //   const user: User = { ...mockUser };

  //   Alert.alert("Login", `Email: ${user.email}\nPerfil: ${user.role}`);
  //   router.replace("/(tabs)/favorites" as Href);
  // };

  return (
    <ScreenTemplate header={<UserRegisterHeader />}>
      <UserRegisterForm />
    </ScreenTemplate>
  );
};
