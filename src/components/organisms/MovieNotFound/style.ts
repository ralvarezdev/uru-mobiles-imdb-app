import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 36,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 8,
    borderRadius: 22,
    zIndex: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
    textAlign: "center",
  },
});

