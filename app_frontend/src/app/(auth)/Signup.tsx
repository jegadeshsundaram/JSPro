import { registerUser } from '@/src/features/auth/authActions';
import { clearError, clearSuccess } from '@/src/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/src/features/hooks';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import styles from '../style/auth';

import Spinner from '../components/Spinner';

export default function Signup() {
   const route = useRouter();

   const [fullName, setFullName] = useState('');
   const [fullNameVerify, setFullNameVerify] = useState(false);

   const [username, setUsername] = useState('');
   const [usernameVerify, setUsernameVerify] = useState(false);

   const [email, setEmail] = useState('');
   const [emailVerify, setEmailVerify] = useState(false);

   const [password, setPassword] = useState('');
   const [passwordVerify, setPasswordVerify] = useState(false);
   const [showPassword, setShowPassword] = useState(true);

   const [confirmPassword, setConfirmPassword] = useState('');
   const [confirmPasswordVerify, setConfirmPasswordVerify] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(true);


   const { loading, error, success } = useAppSelector((state) => state.auth)
   const dispatch = useAppDispatch()

   useEffect(() => {

      console.log(">>>>>"+success);

      if (error) {
         Alert.alert('Signup Failed', error, [{ text: 'OK', onPress: () => dispatch(clearError()) }]); //
      }

      if (success) {
         Toast.show({
               type: 'success',
               text1: 'User Registered',
         });
         dispatch(clearSuccess())
         // redirect user to login page if registration was successful         
         route.push('/Login')
      }
   }, [route, error, dispatch, success])

   function handleSignup() {

      // Dismiss the keyboard
      Keyboard.dismiss();

      setEmail(email.toLowerCase());

      if (fullName.trim() == "" || email.trim() == "" || password.trim() == "" || confirmPassword.trim() == "") {
         Toast.show({
            type: 'error',
            text1: 'Required!',
            text2: 'Full Name, Email & Password',
            visibilityTime: 4000
         });
      }

      if (fullNameVerify && emailVerify && passwordVerify && confirmPasswordVerify) {
         dispatch(registerUser({ fullName, email, username, password }))
      }
   }

   const handleFullName = (value: any) => {
      setFullName(value);
      setFullNameVerify(false);

      if (value.length > 3) {
         setFullNameVerify(true);
      }
   }

   const handleUsername = (value: any) => {
      setUsername(value);
      setUsernameVerify(false);

      if (value.length > 5) {
         setUsernameVerify(true);
      }
   }

   const handleEmail = (value: any) => {      
      setEmail(value);
      setEmailVerify(false);
      if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value)) {
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

               <Text>{error}</Text>

            </View>

            <View style={styles.formContainer}>

               {/* Field :: Full Name */}
               <View>
                  <TextInput
                     label="Full Name"
                     left={<TextInput.Icon icon="text-account" />}
                     onChangeText={handleFullName}
                     style={{ height: 60, backgroundColor: '#ffffff' }}
                  />
               </View>

               {fullName.length < 1 ? null : fullNameVerify ? null : (
                  <View>
                     <Text
                        style={{
                           marginLeft: 20,
                           color: 'red',
                        }}>
                        Full Name: Required, Min 4 Characters
                     </Text>
                  </View>
               )}

               <View style={{ height: 30 }}></View>

               <View>
                  <TextInput
                     label="Username"
                     left={<TextInput.Icon icon="account" />}
                     onChangeText={handleUsername}
                     style={{ height: 60, backgroundColor: '#ffffff' }}
                  />
               </View>

               {username.length < 1 ? null : usernameVerify ? null : (
                  <View>
                     <Text
                        style={{
                           marginLeft: 20,
                           color: 'red',
                        }}>
                        Username: Required, Min 6 Characters
                     </Text>
                  </View>
               )}

               <View style={{ height: 30 }}></View>

               <View>
                  <TextInput
                     label="Email Address"
                     left={<TextInput.Icon icon="email" />}
                     onChangeText={handleEmail}
                     style={{ height: 60, backgroundColor: '#ffffff' }}
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

               <View style={{ height: 30 }}></View>

               {/* Field :: Password */}
               <View>
                  <TextInput
                     label="Password"
                     left={<TextInput.Icon icon="lock" />}
                     onChangeText={handlePassword}
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
               
               {password.length < 1 ? null : passwordVerify ? null : (
                  <Text
                     style={{
                        marginLeft: 20,
                        color: 'red',
                     }}>
                     Password: Min 6 characters/digits
                  </Text>
               )}

               <View style={{ height: 30 }}></View>

               {/* Field :: Confirm Password */}
               <View>
                  <TextInput
                     label="Confirm Password"
                     left={<TextInput.Icon icon="lock" />}
                     onChangeText={handleConfirmPassword}
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

            <View style={{ height: 20 }}></View>

            <View style={styles.buttonContainer}>
               <TouchableOpacity style={styles.button} onPress={() => handleSignup()}>
                  <View>
                     <Text style={styles.buttonText}>{loading ? <Spinner /> : 'Signup'}</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity onPress={() => route.push('/(auth)/Login')}>
                  <View>
                     <Text style={[styles.linkText, { color: '#44990bff' }]}>Back to Login</Text>
                  </View>
               </TouchableOpacity>
            </View>

         </View>
         <View style={{ height: 100 }}></View>
      </KeyboardAwareScrollView>
   );
}

