import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  card: {
    width: 260, marginRight: 20,
    borderRadius: 21, backgroundColor: "#DF3D36",
    shadowColor: "#000", shadowOpacity: 0.10, shadowRadius: 13, shadowOffset: { width: 0, height: 6 },
    elevation: 5, marginTop: 10,
  },
  badge: {
    position: "absolute", zIndex: 2,
    left: 11, top: 13, backgroundColor: "#F6D648",
    borderRadius: 6, paddingHorizontal: 9, paddingVertical: 2,
  },
  badgeText: { color: "#332901", fontSize: 12, fontWeight: "bold" },
  content: { alignItems: "center", justifyContent: "center", height: 117 },
  emoji: { fontSize: 54, marginTop: 20 },
  info: { backgroundColor: "#fff", borderBottomLeftRadius: 21, borderBottomRightRadius: 21, padding: 13 },
  title: { fontWeight: "bold", fontSize: 16, color: "#332901" },
  subtitle: { color: "#7A7A7A", fontSize: 13, marginVertical: 2 },
  scoresRow: { flexDirection: "row", marginTop: 6, justifyContent: "space-between" },
  score: { alignItems: "center", paddingVertical: 4, flex: 1 },
  scoreType: { fontSize: 11, color: "#999" },
  scoreValue: { fontWeight: "bold", fontSize: 15, color: "#DF3D36", marginTop: 1 },
});
