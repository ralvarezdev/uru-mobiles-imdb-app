import { colors } from "@/theme";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statusBarBackground: {
    backgroundColor: "#DF3D36",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  toastContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "box-none",
    zIndex: 99999,
    elevation: 99999,
  },
});