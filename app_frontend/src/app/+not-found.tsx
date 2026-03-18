import { Link, Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'

const NotFoundScreen = () => {
   return (
      <>
         <Stack.Screen options={{ title: 'Oops! not found' }} />
         <View
            style={styles.container}>            
            <Link href="/(auth)/Login" style={styles.button}>Go to Home Screen</Link>
         </View>
      </>
   )
}

export default NotFoundScreen


const styles = StyleSheet.create({

   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#25292e',
   },
   text: {
      color: '#fff',
   },
   button: {
      fontSize: 20,
      textDecorationLine: 'underline',
      color: '#fff',
   }

});