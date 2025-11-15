import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/atoms/Modal";
import { CriticModalContent } from "@/components/organisms/CriticContent";
import authService from "@/services/authService";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { LoadingMessage } from "../LoadingMessage";

interface ModalBecomeACriticProps {
  visible: boolean;
  onClose: () => void;
}

export const ModalBecomeACritic: React.FC<ModalBecomeACriticProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleRequestCritic = async () => {
    setLoading(true);
    // Clear any previous errors before making the request
    authService.clearLastError();
    
    try {
      // Call the API to request critic role
      const response = await authService.requestCriticRole();

      if (response) {
        console.log("Solicitud de crítico enviada");
        // Show toast
        Toast.show({
          type: "success",
          text1: "Request sent successfully!",
          text2: "An administrator will review your profile and you will receive a notification when it's processed.",
          position: "bottom",
          visibilityTime: 5000, // 5 seconds
        });
        onClose();
      } else {
        // Response is undefined, check for parsed error
        const parsedError = authService.getLastError();
        
        if (parsedError) {
          // Check if it's an internal error that shouldn't be shown to users
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
            // Don't show internal errors to users
            Toast.show({
              type: "error",
              text1: "Could not send request",
              text2: "An unexpected error occurred. Please try again later.",
              position: "bottom",
              visibilityTime: 5000, // 5 seconds
            });
          } else {
            // Show user-friendly error message
            Toast.show({
              type: "error",
              text1: "Could not send request",
              text2: parsedError.generalMessage || "Please try again later.",
              position: "bottom",
              visibilityTime: 5000, // 5 seconds
            });
          }
        } else {
          Toast.show({
            type: "error",
            text1: "Could not send request",
            text2: "Please try again later.",
            position: "bottom",
            visibilityTime: 5000, // 5 seconds
          });
        }
      }
    } catch (error: any) {
      // This catch should rarely be hit now, but keep it as a safety net
      console.error("Unexpected request critic error:", error);
      Toast.show({
        type: "error",
        text1: "Could not send request",
        text2: "An unexpected error occurred. Please try again later.",
        position: "bottom",
        visibilityTime: 5000, // 5 seconds
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="🎭 Become a Critic"
      footer={
        <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
          <View style={{ flex: 1 }}>
            <Button title="Cancel" variant="secondary" onPress={onClose} disabled={loading} />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Confirm" variant="primary" onPress={handleRequestCritic} disabled={loading} loading={loading} />
          </View>
        </View>
      }>
      {loading ? <LoadingMessage message="Sending request..." /> : <CriticModalContent />}
    </Modal>
  );
};
