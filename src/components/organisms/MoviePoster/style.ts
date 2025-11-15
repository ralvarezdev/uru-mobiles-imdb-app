import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f6fa",
  },
  bg: {
    height: 380,
    justifyContent: "flex-end",
  },
  backBtn: {
    position: "absolute",
    top: 36,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 8,
    borderRadius: 22,
  },
  info: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  metaText: {
    color: "#e4e4e4",
    fontSize: 12,
    fontWeight: "600",
  },
  metaDot: {
    color: "#e4e4e4",
    marginHorizontal: 6,
    fontSize: 10,
  },
});
