import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import styles from '../style/auth';

export default function forgotPassword() {
   const route = useRouter();
   const [email, setEmail] = useState('');

   function handeSendEmail() {

      // Dismiss the keyboard
      Keyboard.dismiss();

      const emailData = {
         email: email.replace(/\s/g, ''),
      }

      if (email !== "") {
         axios
            .post('http://192.168.1.7:5001/api/user/email', emailData)
            .then(res => {
               console.log(res.data)
               if (res.data.status == "ok") {

                  Toast.show({
                     type: 'success',
                     text1: 'Reset Password',
                     text2: 'The code is sent to email!'
                  });

                  route.push('/(auth)/ResetPassword');
               } else if (res.data.status == "email_not_exists") {

                  Toast.show({
                     type: 'success',
                     text1: 'Email not found',
                  });
               }
            })
            .catch(e => console.log(e));
      } else {
         Toast.show({
            type: 'error',
            text1: 'Email Required!',
         });
      }
   }

   return (

      <KeyboardAwareScrollView
         style={styles.scrollViewContainer}
         contentContainerStyle={styles.contentContainer}
         keyboardShouldPersistTaps="handled"
         showsVerticalScrollIndicator={false}
         enableOnAndroid={true}>

         <View style={styles.pageContainer}>

            <View style={{ height: 50 }}></View>

            <View style={styles.header}>
               <Text style={styles.headerText}>Forgot Password</Text>
               <Text style={styles.headerTextInfo}>
                  Enter your email address to receive a reset code and regain access to your account.
               </Text>
            </View>

            <View style={{ height: 30 }}></View>

            <View style={styles.formContainer}>

               {/* Field :: Email Address */}
               <View>
                  <TextInput
                     label="Email Address"
                     left={<TextInput.Icon icon="email" />}
                     onChange={e => setEmail(e.nativeEvent.text)}
                     style={{ height: 60, backgroundColor: '#ffffff' }}
                  />
               </View>

            </View>

            <View style={styles.buttonContainer}>

               <TouchableOpacity style={styles.button} onPress={() => handeSendEmail()}>
                  <View>
                     <Text style={styles.buttonText}>SEND</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity
                  onPress={() => { route.push('/(auth)/Login') }}>
                  <Text style={{ marginTop: 30, fontSize: 16, color: '#404143', fontWeight: '500' }}>Back to Login</Text>
               </TouchableOpacity>
            </View>

         </View>

      </KeyboardAwareScrollView>

   )
}