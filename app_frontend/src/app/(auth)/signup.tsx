import { registerUser } from '@/src/features/auth/authActions';
import { useAppDispatch, useAppSelector } from '@/src/features/hooks';
import { Feather, FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import styles from '../style/auth';

import Spinner from '../components/Spinner';

export default function Signup() {
   const route = useRouter();

   const [fullName, setFullName] = useState('');
   const [fullNameVerify, setFullNameVerify] = useState(false);

   const [email, setEmail] = useState('');
   const [emailVerify, setEmailVerify] = useState(false);

   const [password, setPassword] = useState('');
   const [passwordVerify, setPasswordVerify] = useState(false);
   const [showPassword, setShowPassword] = useState(true);

   const [confirmPassword, setConfirmPassword] = useState('');
   const [confirmPasswordVerify, setConfirmPasswordVerify] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(true);


   const { loading, userInfo, error, success } = useAppSelector((state) => state.auth)
   const dispatch = useAppDispatch()

   useEffect(() => {

      if (success) {
         Toast.show({
               type: 'success',
               text1: 'User Registered',
         });
         // redirect user to login page if registration was successful
         route.push('/login')
      }
   }, [route, userInfo, success])
   
   function handleSubmit() {

      // Dismiss the keyboard
      Keyboard.dismiss();

      setEmail(email.toLowerCase());

      if (fullName.trim() == "" || email.trim() == "" || password.trim() == "" || confirmPassword.trim() == "") {
         Toast.show({
            type: 'error',
            text1: 'Required!',
            text2: 'Name, Email & Password',
            visibilityTime: 4000
         });
      }

      if (fullNameVerify && emailVerify && passwordVerify && confirmPasswordVerify) {
         dispatch(registerUser({ fullName, email, password }))
      }      
   }   

   const handleFullName = (e: any) => {
      const fullNameVal = e.nativeEvent.text;

      setFullName(fullNameVal);
      setFullNameVerify(false);

      if (fullNameVal.length > 0) {
         setFullNameVerify(true);
      }
   }

   const handleEmail = (e: any) => {
      const emailVal = e.nativeEvent.text;
      setEmail(emailVal);
      setEmailVerify(false);
      if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVal)) {
         setEmailVerify(true);
      }
   }

   const handlePassword = (passwordVal: string) => {
      setPassword(passwordVal);
      setPasswordVerify(false);

      if (passwordVal.length > 5) {
         setPasswordVerify(true);
      }
   }

   const handleConfirmPassword = (confirmPasswordVal: string) => {
      setConfirmPassword(confirmPasswordVal);
      setConfirmPasswordVerify(false);

      if (password.length > 0 && password === confirmPasswordVal) {
         setConfirmPasswordVerify(true);
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
               <Text style={styles.headerText}>Create Account</Text>
               <Text style={styles.headerTextInfo}>
                  Create a new account to get started and enjoy seamless access to our features.
               </Text>
            </View>

            <View style={{ height: 30 }}>

               <Text>Error: {error}</Text>

            </View>

            <View style={styles.formContainer}>

               {/* Field :: Full Name */}
               <View style={styles.action}>
                  <FontAwesome
                     name="user"
                     color="dimgray"
                     style={[styles.smallIcon, { marginRight: 14, fontSize: 24 }]}
                  />
                  <TextInput
                     placeholder="Full Name"
                     placeholderTextColor="#AFADAC"
                     style={styles.textInput}
                     onChange={e => handleFullName(e)}
                  />

               </View>

               {fullName.length < 1 ? null : fullNameVerify ? null : (
                  <View>
                     <Text
                        style={{
                           marginLeft: 20,
                           color: 'red',
                        }}>
                        Full Name: Required, Min 1 Characters
                     </Text>
                  </View>
               )}

               {/* Field :: Email Address */}
               <View style={[styles.action, {paddingHorizontal: 18}]}>
                  <MaterialIcons
                     name="email"
                     color="dimgray"
                     style={[styles.smallIcon, { marginRight: 10, fontSize: 24 }]}
                  />
                  <TextInput
                     placeholder="Email Address"
                     placeholderTextColor="#AFADAC"
                     style={styles.textInput}
                     autoCapitalize='none'
                     autoCorrect={false}
                     autoComplete='email'
                     onChange={e => handleEmail(e)}
                  />
               </View>

               {email.length < 1 ? null : emailVerify ? null : (
                  <Text
                     style={{
                        marginLeft: 20,
                        color: 'red',
                     }}>
                     Invalid Email Address
                  </Text>
               )}

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
                     value={password}
                     onChangeText={handlePassword}
                     secureTextEntry={showPassword}
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

               {password.length < 1 ? null : passwordVerify ? null : (
                  <Text
                     style={{
                        marginLeft: 20,
                        color: 'red',
                     }}>
                     Password: Min 6 Characters
                  </Text>
               )}

               {/* Field :: Confirm Password */}
               <View style={styles.action}>
                  <FontAwesome6
                     name="lock"
                     color="dimgray"
                     style={[styles.smallIcon, { marginRight: 17, fontSize: 20 }]}
                  />

                  <TextInput
                     placeholder="Confirm Password"
                     placeholderTextColor="#AFADAC"
                     style={styles.textInput}
                     value={confirmPassword}
                     onChangeText={handleConfirmPassword}
                     secureTextEntry={showConfirmPassword}
                  />

                  <TouchableOpacity style={styles.pwdIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                     {confirmPassword.length < 1 ? null : !showConfirmPassword ? (
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

               {confirmPassword.length < 1 ? null : confirmPasswordVerify ? null : (
                  <Text
                     style={{
                        marginLeft: 20,
                        color: 'red',
                     }}>
                     Password does not match {confirmPasswordVerify}
                  </Text>
               )}

            </View>

            <View style={styles.buttonContainer}>
               <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                  <View>
                     <Text style={styles.buttonText}>{loading ? <Spinner /> : 'Signup'}</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity onPress={() => route.push('/(auth)/login')}>
                  <View>
                     <Text style={{ marginTop: 30, fontSize: 16, color: '#404143', fontWeight: '500', letterSpacing: .5 }}>Back to Login</Text>
                  </View>
               </TouchableOpacity>
            </View>

         </View>
         <View style={{ height: 100 }}></View>
      </KeyboardAwareScrollView>
   );
}

