import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/atoms/Modal";
import { CriticModalContent } from "@/components/organisms/CriticContent";
import authService from "@/services/authService";
import { useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { LoadingMessage } from "../LoadingMessage";
import { isParsedInternalServerError, isInternalServerError } from "@/utils/errorHandler";

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
          // Check if it's an internal error (including 502) that shouldn't be shown to users
          const isInternalError = isParsedInternalServerError(parsedError);
          
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
      const isInternalError = isInternalServerError(error);
      Toast.show({
        type: "error",
        text1: "Could not send request",
        text2: isInternalError ? "An internal error occurred. Please try again later." : "An unexpected error occurred. Please try again later.",
        position: "bottom",
        visibilityTime: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="ticket" size={20} color="#0f1724" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#0f1724" }}>Become a Critic</Text>
        </View>
      }
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
