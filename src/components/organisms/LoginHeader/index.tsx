import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { Text } from "@/components/atoms/Text";

export const LoginHeader: React.FC = () => {
  // Opciones de iconos disponibles:
  // "film" - claqueta de película
  // "videocam" - cámara de video
  // "play-circle" - círculo de play
  // "tv" - televisión
  // "ticket" - boleto de cine
  // "star" - estrella
  // "film-outline" - contorno de película
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="videocam" size={64} color="#fff" style={styles.clapperboard} />
        <Text style={styles.title}>Critics</Text>
        <Text style={styles.subtitle}>Your cinema in a touch</Text>
      </View>
    </View>
  );
};
