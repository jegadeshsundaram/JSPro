import { userLogin, } from '@/src/features/auth/authActions';
import { clearError } from '@/src/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/src/features/hooks';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import styles from '../style/auth';

export default function Login() {
   const route = useRouter();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(true);

   const { userInfo, error } = useAppSelector((state) => state.auth)
   const dispatch = useAppDispatch()

   function handleLogin() {

      // Dismiss the keyboard
      Keyboard.dismiss();      

      setEmail(email.replace(/\s/g, ''))

      if (email !== "" && password !== "") {

         dispatch(userLogin({ email, password }))

      } else {

         Toast.show({
            type: 'error',
            text1: 'Required!',
            text2: 'Email & Password',
            visibilityTime: 4000
         });

      }
   }

   useEffect(() => {

      if (error) {
         Alert.alert('Login Failed', error, [{ text: 'OK', onPress: () => dispatch(clearError()) }]); //
      }

      if (userInfo) {
         route.push('/(app)/Dashboard')
      }
   }, [error, dispatch, route, userInfo])

   return (

      <KeyboardAwareScrollView
         style={styles.scrollViewContainer}
         contentContainerStyle={styles.contentContainer}
         keyboardShouldPersistTaps="handled"
         showsVerticalScrollIndicator={false}
         enableOnAndroid={true}>
         <View style={styles.pageContainer}>

            <View style={{ height: 50 }}>
            </View>

            <View style={styles.header}>
               <Text style={styles.headerText}>Log in</Text>
               <Text style={styles.headerTextInfo}>
                  Enter your email and password to securely access your account and mange your services.
               </Text>
            </View>            

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

               <View style={{ height: 30 }}></View>

               <View>
                  <TextInput
                     label="Password"
                     left={<TextInput.Icon icon="lock" />}
                     onChange={e => setPassword(e.nativeEvent.text)}
                     secureTextEntry={showPassword}
                     right={
                        <TextInput.Icon
                           // Use the 'icon' prop in v5.x and later
                           icon={showPassword ? "eye-off" : "eye"}
                           onPress={() => setShowPassword(!showPassword)}
                           // Prevents the keyboard from dismissing on icon press
                           forceTextInputFocus={false}
                        />
                     }
                     textContentType={'password'}
                     autoComplete={'password'}
                     style={{ height: 60, backgroundColor: '#ffffff' }}
                  />
               </View>

               <TouchableOpacity
                  onPress={() => { Toast.hide(); route.push('/(auth)/ForgotPassword') }} style={{ alignSelf: 'flex-end' }}>
                  <Text style={{ marginTop: 10, color: '#5c5f66ff', fontSize: 14, fontWeight: '500', letterSpacing: .5 }}>Forgot Password?</Text>
               </TouchableOpacity>

            </View>


            <View style={styles.buttonContainer}>

               <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                  <View>
                     <Text style={styles.buttonText}>Log In</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity
                  onPress={() => { Toast.hide(); route.navigate('/(auth)/Signup') }}>
                  <Text style={styles.linkText}>Don't have an account? <Text style={styles.link}>Sign Up here</Text></Text>
               </TouchableOpacity>
            </View>

         </View>
      </KeyboardAwareScrollView>
   )
}