import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import AppConfig from "../constants/AppConfig";
import styles from "../style/auth";

export default function ResetPassword() {
  const route = useRouter();

  const [code, setCode] = useState("");
  const [codeVerify, setCodeVerify] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  function handleSubmit() {
    // Dismiss the keyboard
    Keyboard.dismiss();

    const passwordData = {
      code,
      password: password,
    };

    if (code !== "" && password !== "") {
      axios
        .post(AppConfig.backend_url+"api/user/resetPassword", passwordData)
        .then((res) => {
          console.log(res.data);
          if (res.data.status == "ok") {
            Toast.show({
              type: "success",
              text1: "Password updated",
            });

            route.push("/(auth)/Login");
          } else if (res.data.status == "code_not_exist") {
            Toast.show({
              type: "error",
              text1: `The code '${code}' is invalid.`,
            });
          } else {
            Toast.show({
              type: "error",
              text1: res.data.message,
            });
          }
        })
        .catch((e) => console.log(e));
    } else {
      Toast.show({
        type: "error",
        text1: "Required!",
        text2: "Code & Password",
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
      enableOnAndroid={true}
    >
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
          <View>
            <TextInput
              label="Code"
              left={<TextInput.Icon icon="email" />}
              onChange={(e) => handleCode(e)}
              keyboardType="number-pad"
              style={{ height: 60, backgroundColor: "#ffffff" }}
            />
          </View>

          {/* Field :: Password */}
          <View>
            <TextInput
              label="New Password"
              left={<TextInput.Icon icon="lock" />}
              onChange={(e) => handlePassword(e)}
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
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <View>
              <Text style={styles.buttonText}>Submit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              route.push("/(auth)/Signup");
            }}
          >
            <Text
              style={{
                marginTop: 30,
                fontSize: 16,
                color: "#404143",
                fontWeight: "500",
              }}
            >
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
