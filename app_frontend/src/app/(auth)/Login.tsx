import { userLogin } from '@/src/features/auth/authActions';
import { useAppDispatch, useAppSelector } from '@/src/features/hooks';
import { Feather, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import styles from '../style/auth';

export default function Login() {
   const route = useRouter();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(true);

   const { userInfo, error } = useAppSelector((state) => state.auth)
   const dispatch = useAppDispatch()

   function handelSubmit() {

      // Dismiss the keyboard
      Keyboard.dismiss();

      console.log(">>>" + email, password);

      const loginData = {
         email: email.replace(/\s/g, ''),
         password,
      }

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
      if (userInfo) {
         route.push('/(app)/Dashboard')
      }
   }, [route, userInfo])

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

            <View style={{ height: 30 }}>

               <Text>{error}</Text>

            </View>

            <View style={styles.formContainer}>

               {/* Field :: Email Address */}
               <View style={[styles.action, { paddingHorizontal: 18 }]}>
                  <MaterialIcons
                     name="email"
                     color="dimgray"
                     style={[styles.smallIcon, { marginRight: 12, fontSize: 24 }]}
                  />

                  <TextInput
                     placeholder="Email Address"
                     placeholderTextColor="#AFADAC"
                     style={styles.textInput}
                     onChange={e => setEmail(e.nativeEvent.text)}
                  />
               </View>

               {/* Field :: Password */}
               <View style={styles.action}>
                  <FontAwesome6
                     name="lock"
                     color="dimgray"
                     style={[styles.smallIcon, { marginRight: 17, fontSize: 20 }]}
                  />

                  <TextInput
                     placeholder="Password"
                     placeholderTextColor="#AFADAC"
                     style={styles.textInput}
                     secureTextEntry={showPassword}
                     onChange={e => setPassword(e.nativeEvent.text)}
                  />

                  <TouchableOpacity style={styles.pwdIcon} onPress={() => setShowPassword(!showPassword)}>
                     {password.length < 1 ? null : !showPassword ? (
                        <Feather
                           name="eye-off"
                           size={24}
                           color={'dimgray'}
                        />
                     ) : (
                        <Feather
                           name="eye"
                           size={24}
                           color={'dimgray'}
                        />
                     )}
                  </TouchableOpacity>

               </View>

               <TouchableOpacity
                  onPress={() => { Toast.hide(); route.push('/(auth)/ForgotPassword') }} style={{ alignSelf: 'flex-end' }}>
                  <Text style={{ marginTop: 10, color: '#5c5f66ff', fontSize: 14, fontWeight: '500', letterSpacing: .5 }}>Forgot Password?</Text>
               </TouchableOpacity>

            </View>


            <View style={styles.buttonContainer}>

               <TouchableOpacity style={styles.button} onPress={() => handelSubmit()}>
                  <View>
                     <Text style={styles.buttonText}>Login</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity
                  onPress={() => { Toast.hide(); route.push('/(auth)/Signup') }}>
                  <Text style={styles.linkText}>Don't have an account? <Text style={styles.link}>Sign Up here</Text></Text>
               </TouchableOpacity>
            </View>

         </View>
      </KeyboardAwareScrollView>
   )
}