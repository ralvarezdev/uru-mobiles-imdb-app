import React from "react";
import { Alert } from "react-native";
import { router} from "expo-router";
// import { LoginFormData } from "../../types";
import { LoginHeader } from "@/components/organisms/LoginHeader";
import { LoginForm } from "@/components/organisms/LoginForm";
import { ScreenTemplate } from "@/components/templates/ScreenTemplate";

export const LoginScreen: React.FC = () => {
  const handleLogin = async (data: { email: string; password: string; profileType: string }) => {
    console.log("Login data:", data);
    
    Alert.alert("Login", `Email: ${data.email}\nPerfil: ${data.profileType}`);
  };
  
  return (
    <ScreenTemplate header={<LoginHeader />}>
      <LoginForm onSubmit={handleLogin} />
    </ScreenTemplate>
  );
};
