import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  criticPromoCard: {
    backgroundColor: "#fff5f5",
    borderWidth: 2,
    borderColor: "#c0392b",
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 15,
    gap: 10,
  },
  criticPromoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 15,
  },
  criticPromoIcon: {
    fontSize: 40,
  },
  criticPromoText: {
    flex: 1,
  },
  criticPromoTitle: {
    color: "#2c3e50",
    marginBottom: 5,
  },
  criticPromoSubtitle: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
});
