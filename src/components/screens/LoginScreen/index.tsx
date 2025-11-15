import React from "react";
import { LoginForm } from "@/components/organisms/LoginForm";
import { LoginHeader } from "@/components/organisms/LoginHeader";
import { ScreenTemplate } from "@/components/templates/ScreenTemplate";

export const LoginScreen: React.FC = () => {
  return (
    <ScreenTemplate header={<LoginHeader />}>
      <LoginForm />
    </ScreenTemplate>
  );
};
