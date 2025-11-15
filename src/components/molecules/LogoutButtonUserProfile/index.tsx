import React from "react";
import { View } from "react-native";
import { Button } from "../../atoms/Button";
import { styles } from "./style";
import { router } from "expo-router";
import authService from "@/services/authService";
import { LogOutRequest } from "@ralvarezdev/proto-auth-ts";
import Toast from "react-native-toast-message";
import { isParsedInternalServerError, isInternalServerError } from "@/utils/errorHandler";

export const LogoutButtonUserProfile: React.FC = () => {
  const handleLogout = async () => {
    try {
      const logoutRequest: LogOutRequest = {
        $typeName: "ralvarezdev.v1.LogOutRequest",
      };
      const response = await authService.logOut(logoutRequest);
      console.log("response", response);
      if (response && response.$typeName === "ralvarezdev.v1.LogOutResponse") {
        // Show toast
        Toast.show({
          type: "success",
          text1: "Logout successful",
          text2: "You have been logged out successfully.",
          position: "bottom",
          visibilityTime: 5000, // 5 seconds
        });
        router.replace("/");
      } else {
        // Response is undefined, check for parsed error
        const parsedError = authService.getLastError();

        if (parsedError) {
          // Check if it's an internal error (including 502) that shouldn't be shown to users
          const isInternalError = isParsedInternalServerError(parsedError);

          if (isInternalError) {
            // Don't show internal/authentication errors to users
            Toast.show({
              type: "error",
              text1: "Could not logout",
              text2: "An unexpected error occurred. Please try again later.",
              position: "bottom",
              visibilityTime: 5000, // 5 seconds
            });
          } else {
            // Show user-friendly error message
            Toast.show({
              type: "error",
              text1: "Could not logout",
              text2: parsedError.generalMessage || "Please try again.",
              position: "bottom",
              visibilityTime: 5000, // 5 seconds
            });
          }
        } else {
          Toast.show({
            type: "error",
            text1: "Could not logout. Please try again.",
            position: "bottom",
            visibilityTime: 5000, // 5 seconds
          });
        }
      }
    } catch (error: any) {
      console.error("Error logging out:", error);
      const isInternalError = isInternalServerError(error);
      Toast.show({
        type: "error",
        text1: "Could not logout",
        text2: isInternalError ? "An internal error occurred. Please try again later." : (error?.message || "An error occurred while logging out."),
        position: "bottom",
        visibilityTime: 5000,
      });
    }
  };

  return (
    <View style={styles.logoutButtonContainer}>
      <Button title="Logout" onPress={handleLogout} variant="secondary" />
    </View>
  );
};
