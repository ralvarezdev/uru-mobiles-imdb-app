import React from "react";
import { View } from "react-native";
import { Button } from "../../atoms/Button";
import { styles } from "./style";
import { router } from "expo-router";
import authService from "@/services/authService";
import { LogOutRequest } from "@ralvarezdev/proto-auth-ts";
import Toast from "react-native-toast-message";

export const LogoutButtonUserProfile: React.FC = () => {
  const handleLogout = async () => {
    try {
      const logoutRequest: LogOutRequest = {
        $typeName: "ralvarezdev.v1.LogOutRequest",
      };
      const response = await authService.logOut(logoutRequest);

      if (response.$typeName === "ralvarezdev.v1.LogOutResponse") {
        Toast.show({
          type: "success",
          text1: "Logout successful",
          text2: "You have been logged out successfully.",
          position: "bottom",
        });
        router.push("/");
      } else {
        Toast.show({
          type: "error",
          text1: "Could not logout. Please try again.",
          position: "bottom",
        });
      }
    } catch (error: any) {
      // console.error("Error logging out:", error);
      Toast.show({
        type: "error",
        text1: "Could not logout. Please try again.",
        text2: error?.message || "An error occurred while logging out.",
        position: "bottom",
      });
    }
  };

  return (
    <View style={styles.logoutButtonContainer}>
      <Button title="Logout" onPress={handleLogout} variant="secondary" />
    </View>
  );
};
