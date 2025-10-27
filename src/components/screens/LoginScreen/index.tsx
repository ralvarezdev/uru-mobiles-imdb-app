import React from "react";
import { Alert } from "react-native";
// import { LoginFormData } from "../../types";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { LoginHeader } from "@/components/organisms/LoginHeader";
import { LoginForm } from "@/components/organisms/LoginForm";

export const LoginScreen: React.FC = () => {
  const handleLogin = async (data: { email: string; password: string; profileType: string }) => {
    console.log("Login data:", data);

    Alert.alert("Login", `Email: ${data.email}\nPerfil: ${data.profileType}`);
  };

  return (
    <AuthTemplate header={<LoginHeader />}>
      <LoginForm onSubmit={handleLogin} />
    </AuthTemplate>
  );
};
