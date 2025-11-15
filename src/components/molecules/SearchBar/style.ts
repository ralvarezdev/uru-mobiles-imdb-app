import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 13,
    paddingVertical: 8,
    marginTop: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 3,
    marginHorizontal:10
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  clearButton: {
    padding: 8,
    marginRight: 4,
  },
});
