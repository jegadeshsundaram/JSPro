import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flexGrow: 1, // Ensures content container grows to fill the ScrollView's height
  },
  pageContainer: {
    padding: 20,
  },
  header: {
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerText: {
    fontSize: 35,
    fontWeight: "600",
    color: "#01020A",
    marginBottom: 10,
  },
  headerTextInfo: {
    fontSize: 14,
    color: "#727475",
    textAlign: "center",
    lineHeight: 18,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    alignSelf: "center",
    width: "70%",
    maxWidth: 300,
    maxHeight: 150,
  },
  formContainer: {
    marginBottom: 30,
  },
  text_header: {
    fontSize: 18,
    color: "dimgray",
    fontWeight: "400",
  },
  action: {
    flexDirection: "row",
    padding: 7,

    paddingHorizontal: 22,

    backgroundColor: "#fff",
    borderRadius: 25,

    borderWidth: 1,
    borderColor: "#a0b4aeff",
    marginTop: 25,
  },
  smallIcon: {
    marginRight: 10,
    fontSize: 22,
    textAlignVertical: "center",
  },
  textInput: {
    flex: 1,
    color: "#101010ff",
    fontSize: 16,
  },
  pwdIcon: {
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#201f1fff",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
  },
  fieldErrorIcon: {
    color: "red",
    fontSize: 25,
    marginRight: 8,
  },
  fieldErrorText: {
    color: "red",
    fontSize: 16,
  },
  linkText: {
    marginTop: 30,
    fontSize: 16,
    color: "#a4a2a0ff",
    fontWeight: "500",
  },
  link: {
    color: "#44990bff",
  },
});

export default styles;
