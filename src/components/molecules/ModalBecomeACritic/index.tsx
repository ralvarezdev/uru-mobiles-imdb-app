import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/atoms/Modal";
import { CriticModalContent } from "@/components/organisms/CriticContent";
import { useState } from "react";
import { Alert, View } from "react-native";

const [isCriticModalVisible, setIsCriticModalVisible] = useState(false);
interface ModalBecomeACriticProps {
  visible: boolean;
  onClose: () => void;
}
export const ModalBecomeACritic: React.FC<ModalBecomeACriticProps> = ({ visible, onClose }) => {

  const handleRequestCritic = async () => {
    try {
      // Aquí iría la llamada al API
      // await api.requestCriticStatus();

      console.log("Solicitud de crítico enviada");
      Alert.alert(
        "✅ ¡Solicitud enviada!",
        "🎭 Tu solicitud para convertirte en Crítico Verificado ha sido enviada.\n\n📧 Un administrador revisará tu perfil y recibirás una notificación cuando sea procesada.\n\n¡Gracias por tu interés!"
      );
      setIsCriticModalVisible(false);
    } catch (error) {
      console.error("Error al solicitar ser crítico:", error);
      Alert.alert("Error", "No se pudo enviar la solicitud. Inténtalo de nuevo.");
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Become a Critic"
      footer={
        <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
          <View style={{ flex: 1 }}>
            <Button title="Cancel" variant="secondary" onPress={onClose} />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Confirm" variant="primary" onPress={handleRequestCritic} />
          </View>
        </View>
      }>
      <CriticModalContent />
    </Modal>
  );
};
