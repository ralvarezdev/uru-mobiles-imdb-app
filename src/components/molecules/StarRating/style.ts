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
    position: "relative",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  starTouchAreas: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  starHalfLeft: {
    flex: 1,
    height: "100%",
    backgroundColor: "transparent",
  },
  starHalfRight: {
    flex: 1,
    height: "100%",
    backgroundColor: "transparent",
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

