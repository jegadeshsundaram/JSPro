import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Welcome = () => {
   const route = useRouter();
   
   return (
      <View style={styles.welcomeContainer}>
         <View style={styles.container}>
            <Text style={{ color: '#968a8aff', fontSize: 23, letterSpacing: 2 }}>Hello,</Text>
            
            <Text style={{ color: '#cccccc', fontSize: 35, letterSpacing: 3 }}>Welcome to!</Text>
            
            <Image source={require('../../../assets/images/jspro.png')} />
            
            <Text style={{ padding: 45, textAlign: 'center', color: '#9a9191ed', lineHeight: 20, fontFamily: 'system-ui' }}>JSPro SAAS'er as pure Software as as Service Provider. This app is all about providing support for Companies in Singapore to submit their Employment Income and GST Returns Submissions to Inland Revenue Authority of Singapore (IRAS).</Text>

            <TouchableOpacity style={styles.button} onPress={() => {route.navigate("/(auth)/Login");}}>
               <View>
                  <Text style={styles.buttonText}>LOG IN</Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {route.navigate("/(auth)/ClientRegistration");}} style={{marginTop: 10}}>
               <View>
                  <Text style={{color: '#cccccc', fontFamily: 'system-ui'}}>Already have an Account? <Text style={{color: '#eb7208ff'}}>Sign Up</Text></Text>
               </View>
            </TouchableOpacity>

         </View>        

      </View>
   )
}

export default Welcome

const styles = StyleSheet.create({
   welcomeContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: '#4c825cff',
      justifyContent: 'center',
      alignItems: 'center',
   },
   container: {
      width: '90%',
      height: '90%',
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
   },
   button: {
      width: '70%',
      padding: 7,
      borderRadius: 5,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center'
   },
   buttonText: {
      color: '#000000',
      fontWeight: '600',
      fontSize: 20,
      letterSpacing: 1,
   }

})