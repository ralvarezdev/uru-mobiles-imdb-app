import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  header: {
    backgroundColor: "#DF3D36",
    paddingTop: 28,
    paddingBottom: 8,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 26,
    letterSpacing: -1,
  },
  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
