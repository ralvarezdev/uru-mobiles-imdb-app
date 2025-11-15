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
    try {
      // Call the API to request critic role
      await authService.requestCriticRole();

      console.log("Solicitud de crítico enviada");
      Toast.show({
        type: "success",
        text1: "Request sent successfully!",
        text2: "An administrator will review your profile and you will receive a notification when it's processed.",
        position: "bottom",
      });
      onClose();
    } catch (error: any) {
      console.error("Error al solicitar ser crítico:", error);
      Toast.show({
        type: "error",
        text1: "Could not send request",
        text2: error?.message ?? "Please try again later.",
        position: "bottom",
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
