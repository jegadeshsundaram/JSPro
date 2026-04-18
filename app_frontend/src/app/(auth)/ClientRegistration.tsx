import { registerUser } from "@/src/features/auth/authActions";
import { clearError, clearSuccess } from "@/src/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/features/hooks";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RadioButton, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import styles from "../style/auth";

import axios from "axios";
import Spinner from "../components/Spinner";

import AppConfig from "../constants/AppConfig";

export default function ClientRegistration() {
   const route = useRouter();

   const [product, setProduct] = useState("");

   const [client, setClient] = useState("");
   const [clientVerify, setClientVerify] = useState(false);

   const [username, setUsername] = useState("");
   const [usernameVerify, setUsernameVerify] = useState(false);

   const [email, setEmail] = useState("");
   const [emailVerify, setEmailVerify] = useState(false);

   const [password, setPassword] = useState("");
   const [passwordVerify, setPasswordVerify] = useState(false);
   const [showPassword, setShowPassword] = useState(true);

   const [confirmPassword, setConfirmPassword] = useState("");
   const [confirmPasswordVerify, setConfirmPasswordVerify] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(true);

   const [step, setStep] = useState(1);
   const nextStep = () => setStep((prev) => prev + 1);
   const prevStep = () => setStep((prev) => prev - 1);

   const { loading, error, success } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();

   useEffect(() => {
      console.log(">>>>>" + success);

      if (error) {
         Alert.alert("Signup Failed", error, [
            { text: "OK", onPress: () => dispatch(clearError()) },
         ]); //
      }

      if (success) {
         Toast.show({
            type: "success",
            text1: "User Registered",
         });
         dispatch(clearSuccess());
         // redirect user to login page if registration was successful
         route.push("/Login");
      }
   }, [route, error, dispatch, success]);

   const handleClientCheck = () => {

      if (client === "") {
         Toast.show({
            type: "error",
            text1: "Required!",
            text2: "Client UEN",
         });
         return;
      } else if(product === "") {
         Toast.show({
            type: "error",
            text1: "Required!",
            text2: "Product",
         });
         return;
      }

      const clientData = {
         clientInput: client
      };

      axios
         .post(AppConfig.backend_url+"api/client/checkAvailability", clientData)
         .then((res) => {
            console.log(res.data);
            if (res.data.status == "ok") {
               console.log("Client Found!");
               setClient(res.data.client);
               setClientVerify(true);
               setConfirmPassword("");
               setConfirmPasswordVerify(false);
               setStep((prev) => prev + 1);

            } else if (res.data.status == "client_not_exist") {
               Toast.show({
                  type: "error",
                  text1: `Client not found`,
               });
            } else {
               Toast.show({
                  type: "error",
                  text1: res.data.message,
               });
            }
         })
         .catch((e) => console.log(e));
   }

   function handleSignup() {
      // Dismiss the keyboard
      Keyboard.dismiss();      

      setEmail(email.toLowerCase());      

      if (
         clientVerify &&
         usernameVerify &&
         emailVerify &&
         passwordVerify &&
         confirmPasswordVerify
      ) {
         dispatch(registerUser({ client, product, email, username, password }));
      } else {
         Toast.show({
            type: "error",
            text1: "Required!",
            text2: "Full Name, Email & Password",
            visibilityTime: 4000,
         });
      }
   }

   const handleClient = (value: any) => {
      setClient(value);
      setClientVerify(false);

      console.log(">>>>" + client);

      if (value.length >= 9 && value.length <= 12) {
         setClientVerify(true);
      }
   }   

   const handleUsername = (value: any) => {
      setUsername(value);
      setUsernameVerify(false);

      if (value.length > 5) {
         setUsernameVerify(true);
      }
   };

   const handleEmail = (value: any) => {
      setEmail(value);
      setEmailVerify(false);
      if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value)) {
         setEmailVerify(true);
      }
   };

   const handlePassword = (passwordVal: string) => {
      setPassword(passwordVal);
      setPasswordVerify(false);

      if (passwordVal.length > 5) {
         setPasswordVerify(true);
      }
   };

   const handleConfirmPassword = (confirmPasswordVal: string) => {
      setConfirmPassword(confirmPasswordVal);
      setConfirmPasswordVerify(false);

      if (confirmPasswordVal.length > 0 && password === confirmPasswordVal) {
         setConfirmPasswordVerify(true);
      }
   };

   return (
      <KeyboardAwareScrollView
         style={styles.scrollViewContainer}
         contentContainerStyle={styles.contentContainer}
         keyboardShouldPersistTaps="handled"
         showsVerticalScrollIndicator={false}
         enableOnAndroid={true}
      >
         <View style={styles.pageContainer}>
            <View style={{ height: 50 }}></View>

            <View style={styles.header}>
               <Text style={styles.headerText}>Create Account</Text>
               <Text style={styles.headerTextInfo}>
                  Create a new user account for your Client, which can help seamless access to IRAS Applications such as Submission of Employment Income, GST Returns, etc.
               </Text>
            </View>

            <View style={{ height: 20 }}></View>

            <View style={styles.formContainer}>

               {step === 1 && (
                  <>
                     {/* Field :: Client UEN */}
                     <View>
                        <TextInput
                           value={client}
                           label="Client UEN"
                           left={<TextInput.Icon icon="text-account" />}
                           onChangeText={handleClient}
                           style={{ height: 60, backgroundColor: "#ffffff" }}
                        />
                     </View>
                     
                     <View style={{ height: 50 }}></View>

                     <View>
                        <Text style={{fontSize: 16, marginLeft: 15, marginBottom: 10, fontWeight: '500'}}>Choose Product</Text>
                        <RadioButton.Group 
                           onValueChange={(value) => setProduct(value)} 
                           value={product}>
                           <RadioButton.Item 
                              label="Submission of Employment Income" 
                              value="P"
                              labelStyle={{ fontSize: 15}} />
                           <RadioButton.Item 
                              label="Submission of GST Returns" 
                              value="G" labelStyle={{ fontSize: 15}} />
                           
                           <RadioButton.Item 
                              label="Submission of Both API's" 
                              value="B" labelStyle={{ fontSize: 15}} />
                        </RadioButton.Group>
                     </View>

                     <View style={{ height: 50 }}></View>

                     <View style={styles.buttonContainer}>
                        <TouchableOpacity
                           style={styles.button}
                           onPress={() => handleClientCheck()}
                        >
                           <View>
                              <Text style={styles.buttonText}>
                                 Next
                              </Text>
                           </View>
                        </TouchableOpacity>
                     </View>

                     <View style={{ height: 30 }}></View>

                     <TouchableOpacity onPress={() => { route.navigate("/(auth)/Login"); }} style={{ marginTop: 10 }}>
                        <View>
                           <Text style={{ color: '#eb7208ff', fontWeight: '600', fontSize: 16, fontFamily: 'system-ui', textAlign: 'center' }}>Back to Log In</Text>
                        </View>
                     </TouchableOpacity>

                  </>

               )}
               {step === 2 && (

                  <>
                     <View>
                        <TextInput
                           value={username}
                           label="Username"
                           left={<TextInput.Icon icon="account" />}
                           onChangeText={handleUsername}
                           style={{ height: 60, backgroundColor: "#ffffff" }}
                           autoCapitalize="none"
                        />
                     </View>

                     {username.length < 1 ? null : usernameVerify ? null : (
                        <View>
                           <Text
                              style={{
                                 marginLeft: 20,
                                 color: "red",
                              }}
                           >
                              Username: Required, Min 6 Characters
                           </Text>
                        </View>
                     )}

                     <View style={{ height: 30 }}></View>

                     <View>
                        <TextInput
                           value={email}
                           label="Email Address"
                           left={<TextInput.Icon icon="email" />}
                           onChangeText={handleEmail}
                           style={{ height: 60, backgroundColor: "#ffffff" }}
                           autoCapitalize="none"
                        />
                     </View>
                     {email.length < 1 ? null : emailVerify ? null : (
                        <Text
                           style={{
                              marginLeft: 20,
                              color: "red",
                           }}
                        >
                           Invalid Email Address
                        </Text>
                     )}

                     <View style={{ height: 30 }}></View>

                     {/* Field :: Password */}
                     <View>
                        <TextInput
                           value={password}
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
                           textContentType={"password"}
                           autoComplete={"password"}
                           style={{ height: 60, backgroundColor: "#ffffff" }}
                        />
                     </View>

                     {password.length < 1 ? null : passwordVerify ? null : (
                        <Text
                           style={{
                              marginLeft: 20,
                              color: "red",
                           }}
                        >
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
                           secureTextEntry={showConfirmPassword}
                           right={
                              <TextInput.Icon
                                 // Use the 'icon' prop in v5.x and later
                                 icon={showConfirmPassword ? "eye-off" : "eye"}
                                 onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                 // Prevents the keyboard from dismissing on icon press
                                 forceTextInputFocus={false}
                              />
                           }
                           textContentType={"password"}
                           autoComplete={"password"}
                           style={{ height: 60, backgroundColor: "#ffffff" }}
                        />
                     </View>
                     {confirmPassword.length < 1 ? null : confirmPasswordVerify ? null : (
                        <Text
                           style={{
                              marginLeft: 20,
                              color: "red",
                           }}
                        >
                           Password does not match {confirmPasswordVerify}
                        </Text>
                     )}

                     <View style={{ height: 50 }}></View>

                     <View style={[styles.buttonContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <TouchableOpacity
                           style={[styles.button, { width: '30%' }]}
                           onPress={() => prevStep()}
                        >
                           <View>
                              <Text style={styles.buttonText}>
                                 Back
                              </Text>
                           </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                           style={[styles.button, { width: '60%' }]}
                           onPress={() => handleSignup()}
                        >
                           <View>
                              <Text style={styles.buttonText}>
                                 {loading ? <Spinner /> : "Signup"}
                              </Text>
                           </View>
                        </TouchableOpacity>
                     </View>

                  </>
               )}
            </View>

            <View style={{ height: 120 }}></View>

         </View>
         {/* Page Container - ends */}

         {/* <AuthTabBar /> */}

      </KeyboardAwareScrollView>
   );
}
