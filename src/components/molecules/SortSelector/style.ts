import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  selectorButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DF3D36",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectorContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectorLabel: {
    fontSize: 14,
    color: "#64748b",
    marginRight: 8,
  },
  selectorValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f1724",
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "85%",
    maxWidth: 400,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f1724",
  },
  optionsList: {
    paddingVertical: 8,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  optionItemSelected: {
    backgroundColor: "#fef2f2",
  },
  optionText: {
    fontSize: 16,
    color: "#0f1724",
  },
  optionTextSelected: {
    fontWeight: "600",
    color: "#DF3D36",
  },
});

