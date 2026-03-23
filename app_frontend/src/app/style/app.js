import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1, // Ensures content container grows to fill the ScrollView's height
  },
  pageContainer: {
    padding: 20,
  },
  header: {
    justifyContent: "flex-end",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#01020A",
    marginBottom: 10,
  },
  headerTextInfo: {
    fontSize: 14,
    color: "#727475",
    lineHeight: 18,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
  },

  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  box: {
    backgroundColor: "#8FC254",
    width: "48%",
    marginBottom: 30,
    borderRadius: 20,
  },
  boxIcon: {
    color: "#eff2fded",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  boxTextHeader: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  boxTextFooter: {
    fontSize: 12,
    textAlign: "center",
    color: "#f6f7fbed",
    marginBottom: 20,
  },
  footer: {
    position: "relative", // Sticks the footer to the bottom
    left: 0,
    right: 0,
    bottom: 30,
    alignItems: "center", // Centers content horizontally
  },

  tblRow: {
    backgroundColor: "#fff",
    padding: 10,
  },
  tblRowData: {},
});

export default styles;
