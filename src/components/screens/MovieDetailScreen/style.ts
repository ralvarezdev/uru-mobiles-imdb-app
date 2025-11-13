import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  contentContainer: {
    backgroundColor: "#f5f6fa",
    paddingBottom: 32,
  },

  ratingsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 14,
    marginTop: 12,
    marginBottom: 20,
  },

  section: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f1724",
    marginBottom: 6,
  },
  sectionText: {
    marginTop: 2,
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
  },

  metaRow: {
    flexDirection: "row",
    paddingHorizontal: 14,
    justifyContent: "space-between",
    marginTop: 14,
  },
  metaCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginHorizontal: 6,
    padding: 12,
    borderRadius: 12,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    minHeight: 72,
  },
  metaValue: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#0f1724",
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  commentsRow: {
    paddingHorizontal: 14,
    paddingBottom: 4,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentCount: {
    color: "#64748b",
    marginLeft: 8,
    fontSize: 13,
  },
  commentBtn: {
    marginTop: 12,
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 14,
  },
  commentBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  filterRow: {
    flexDirection: "row",
    marginTop: 12,
    paddingHorizontal: 14,
  },
  commentFilterActive: {
    color: "#0f1724",
    fontWeight: "700",
    marginRight: 12,
  },
  commentFilter: {
    color: "#64748b",
    marginRight: 12,
  },

  // Modal styles
  modalFormContent: {
    gap: 20,
    paddingBottom: 20,
  },
  ratingSelectorContainer: {
    marginBottom: 8,
  },
  modalLabel: {
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
  },
  ratingText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    color: "#64748b",
    fontWeight: "600",
  },
  commentInputContainer: {
    marginTop: 8,
  },
  commentTextInput: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#0f1724",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minHeight: 120,
    textAlignVertical: "top",
  },
});
