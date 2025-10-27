import { colors } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white, // Siempre fondo blanco desde raíz
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Fondo global blanco para toda la app
  },
});
