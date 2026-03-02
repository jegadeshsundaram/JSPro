import Feather from '@expo/vector-icons/Feather';
import Error from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import styles from '../style/auth';

export default function ResetPassword() {
   const route = useRouter();

   const [code, setCode] = useState('');
   const [codeVerify, setCodeVerify] = useState(false);

   const [password, setPassword] = useState('');
   const [passwordVerify, setPasswordVerify] = useState(false);
   const [showPassword, setShowPassword] = useState(true);

   function handleSubmit() {

      // Dismiss the keyboard
      Keyboard.dismiss();

      const passwordData = {
         code,
         password: password,
      }

      if (code !== "" && password !== "") {
         axios
            .post('http://192.168.1.7:5001/api/user/updatePassword', passwordData)
            .then(res => {
               console.log(res.data)
               if (res.data.status == "ok") {

                  Toast.show({
                     type: 'success',
                     text1: 'Password updated',
                  });

                  route.push('/(auth)/login');

               } else if (res.data.status == "code_not_exist") {

                  Toast.show({
                     type: 'error',
                     text1: `The code '${code}' is invalid.`,
                  });

               } else {

                  Toast.show({
                     type: 'error',
                     text1: res.data.message
                  });

               }
            })
            .catch(e => console.log(e));
      } else {
        Toast.show({
            type: 'error',
            text1: 'Required!',
            text2: 'Code & Password'
         });
      }
   }

   function handleCode(e: any) {
      const codeVal = e.nativeEvent.text;
      setCode(codeVal);
      setCodeVerify(false);
      if (/^[0-9]+$/.test(codeVal) && codeVal.length == 4) {
         setCode(codeVal);
         setCodeVerify(true);
      }
   }

   function handlePassword(e: any) {
      const passwordVal = e.nativeEvent.text;
      setPassword(passwordVal);
      setPasswordVerify(false);

      if (passwordVal.length > 5) {
         setPassword(passwordVal);
         setPasswordVerify(true);
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
               <Text style={styles.headerText}>Reset Password</Text>
               <Text style={styles.headerTextInfo}>
                  Enter the code received in your email and set your new password.
               </Text>
            </View>

            <View style={{ height: 30 }}></View>

            <View style={styles.formContainer}>

               <View style={styles.action}>
                  <TextInput
                     placeholder="Code"
                     placeholderTextColor="#AFADAC"
                     style={styles.textInput}
                     onChange={e => handleCode(e)}
                     keyboardType="number-pad"
                  />

                  {code.length < 1 ? null : codeVerify ? (
                     <Feather name="check-circle" color="green" size={20} />
                  ) : (
                     <Error name="error-outline" color="red" size={20} />
                  )}

               </View>

               {code.length < 1 ? null : codeVerify ? null : (
                  <Text
                     style={{
                        marginLeft: 20,
                        color: 'red',
                     }}>
                     Code: 4 Digits, No Spaces
                  </Text>
               )}

               <View style={styles.action}>
                  <TextInput
                     placeholder="New Password"
                     placeholderTextColor="#AFADAC"
                     style={styles.textInput}
                     onChange={e => handlePassword(e)}
                     secureTextEntry={showPassword}
                  />

                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                     {password.length < 1 ? null : !showPassword ? (
                        <Feather
                           name="eye-off"
                           color={passwordVerify ? 'green' : 'red'}
                           size={23}
                        />
                     ) : (
                        <Feather
                           name="eye"
                           color={passwordVerify ? 'green' : 'red'}
                           size={23}
                        />
                     )}
                  </TouchableOpacity>
               </View>

               {password.length < 1 ? null : passwordVerify ? null : (
                  <Text
                     style={{
                        marginLeft: 20,
                        color: 'red',
                     }}>
                     Password: Min 6 Characters
                  </Text>
               )}

            </View>

            <View style={styles.buttonContainer}>

               <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                  <View>
                     <Text style={styles.buttonText}>Submit</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity
                  onPress={() => { route.push('/(auth)/signup') }}>
                  <Text style={{ marginTop: 30, fontSize: 16, color: '#404143', fontWeight: '500' }}>Back to Login</Text>
               </TouchableOpacity>
            </View>

         </View>
      </KeyboardAwareScrollView>
   )
}