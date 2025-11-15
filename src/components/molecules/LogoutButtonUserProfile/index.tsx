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
          // Check if it's an internal or authentication error that shouldn't be shown to users
          const errorCodeLower = parsedError.errorCode?.toLowerCase() || "";
          const originalMsgLower = parsedError.originalMessage?.toLowerCase() || "";
          const generalMsgLower = parsedError.generalMessage?.toLowerCase() || "";

          const isInternalError =
            errorCodeLower === "internal" ||
            errorCodeLower.includes("internal_error") ||
            originalMsgLower.includes("internal") ||
            generalMsgLower.includes("internal") ||
            originalMsgLower.includes("internal server error") ||
            generalMsgLower.includes("internal server error") ||
            originalMsgLower.includes("rpc error") ||
            generalMsgLower.includes("rpc error") ||
            originalMsgLower.includes("grpc") ||
            generalMsgLower.includes("grpc") ||
            // Check for authentication/authorization errors
            errorCodeLower === "unauthenticated" ||
            originalMsgLower.includes("missing authorization") ||
            generalMsgLower.includes("missing authorization") ||
            originalMsgLower.includes("unauthorized") ||
            generalMsgLower.includes("unauthorized");

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
      // console.error("Error logging out:", error);
      Toast.show({
        type: "error",
        text1: "Could not logout. Please try again.",
        text2: error?.message || "An error occurred while logging out.",
        position: "bottom",
        visibilityTime: 5000, // 5 seconds
      });
    }
  };

  return (
    <View style={styles.logoutButtonContainer}>
      <Button title="Logout" onPress={handleLogout} variant="secondary" />
    </View>
  );
};
