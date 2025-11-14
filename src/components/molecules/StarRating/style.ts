import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f1724",
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    color: "#64748b",
    fontWeight: "600",
  },
  errorText: {
    fontSize: 12,
    color: "#E74C3C",
    marginTop: 4,
  },
});

