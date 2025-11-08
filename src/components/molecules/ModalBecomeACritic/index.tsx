import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/atoms/Modal";
import { CriticModalContent } from "@/components/organisms/CriticContent";
import { useState } from "react";
import { Alert } from "react-native/Libraries/Alert/Alert";

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
        <>
          <Button title="Confirm" variant="primary" onPress={handleRequestCritic} />
          <Button title="Cancel" variant="secondary" onPress={onClose} />
        </>
      }>
      <CriticModalContent />
    </Modal>
  );
};
