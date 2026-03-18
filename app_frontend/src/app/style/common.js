import { StyleSheet } from "react-native";

const cstyles = StyleSheet.create({

   scrollViewContainer: {
      flex: 1,
      backgroundColor: '#EBF6F7'
   },
   contentContainer: {
      flexGrow: 1, // Ensures content container grows to fill the ScrollView's height
   },
   pageContainer: {
      padding: 20,
   },
   header: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'flex-end',
   },
   headerText: {
      fontSize: 35,
      fontWeight: '600',
      color: '#01020A',
      marginBottom: 10
   },
   headerTextInfo: {
      fontSize: 14,
      color: '#727475',
      textAlign: 'center',
      lineHeight: 18,
   },
   formContainer: {
      marginBottom: 30,
   },
   buttonContainer: {
      alignItems: 'center',
      textAlign: 'center',
   },
   button: {
      width: '100%',
      backgroundColor: '#29AB87',
      alignItems: 'center',
      paddingVertical: 15,
      borderRadius: 25,
   },
   buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      letterSpacing: 2
   },
   fieldErrorIcon: {
      color: 'red',
      fontSize: 25,
      marginRight: 8,
   },
   fieldErrorText: {
      color: 'red',
      fontSize: 16,
   },
   line: {
      borderBottomColor: '#edf2f8ff',
      borderBottomWidth: 4,
   },
});

export default cstyles;