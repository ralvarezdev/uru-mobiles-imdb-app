import React from "react";
import { View } from "react-native";
import { Button } from "../../atoms/Button";
import { styles } from "./style";
import { useRouter } from "expo-router";
import authService from "@/services/authService";
import { LogOutRequest } from "@ralvarezdev/proto-auth-ts";

export const LogoutButtonUserProfile: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // TODO: Uncomment when ready to use logout API
    // try {
    //   const logoutRequest: LogOutRequest = {
    //     $typeName: "ralvarezdev.v1.LogOutRequest",
    //   };
    //   await authService.logOut(logoutRequest);
    // } catch (error) {
    //   console.error("Error logging out:", error);
    // }
    router.push("/");
  };

  return (
    <View style={styles.logoutButtonContainer}>
      <Button title="Logout" onPress={handleLogout} variant="secondary" />
    </View>
  );
};

