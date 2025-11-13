// components/molecules/UpdatePasswordModal/style.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    marginBottom: 8,
  },

  infoBox: {
    backgroundColor: "#e3f2fd",
    borderLeftWidth: 4,
    borderLeftColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },

  infoText: {
    fontSize: 13,
    color: "#1976d2",
    lineHeight: 20,
  },

  fieldContainer: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },

  modalButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  modalButton: {
    flex: 1,
  },
});
