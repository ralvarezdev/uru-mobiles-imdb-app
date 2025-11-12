import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 18,
    marginHorizontal: 6,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    flex: 1,
  },
  posterContainer: {
    backgroundColor: "#DF3D36",
    height: 155,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  yearBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#2A211E",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  yearText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  posterText: {
    fontSize: 22,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 14,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#2A211E",
    marginBottom: 2,
  },
  subtitle: {
    color: "#888",
    fontSize: 12,
    marginBottom: 10,
    height:60
  },
  scoresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  scoreBlock: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F8F5F2",
    borderRadius: 8,
    paddingVertical: 7,
    marginHorizontal: 3,
  },
  scoreLabel: {
    fontSize: 10,
    color: "#847e7b",
    marginBottom: 1,
    fontWeight: "500",
  },
  star: {
    fontSize: 16,
    color: "#F7BB36",
  },
  scoreValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#DF3D36",
    marginTop: 2,
  },
});
