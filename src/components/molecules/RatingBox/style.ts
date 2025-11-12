import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  value: {
    fontSize: 28,
    fontWeight: "800",
  },
  label: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
    fontWeight: "600",
  },
  votes: {
    fontSize: 12,
    color: "#8c8c8c",
    marginTop: 6,
  },
});
