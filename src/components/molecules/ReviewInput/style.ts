import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f1724",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#0f1724",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minHeight: 120,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#E74C3C",
  },
  errorText: {
    fontSize: 12,
    color: "#E74C3C",
    marginTop: 4,
  },
});

