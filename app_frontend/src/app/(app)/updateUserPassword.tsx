import { useAppDispatch, useAppSelector } from "@/src/features/hooks";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import PageHeader from "../components/PageHeader";
import AppConfig from "../constants/AppConfig";
import cstyles from "../style/common";

const UserProfile = () => {

  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVerify, setConfirmPasswordVerify] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
    }

    // Perform side effects here (e.g., API calls based on state)
  }, [userInfo]);

  const router = useRouter();

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

  const handelUpdate = async () => {

    if (!passwordVerify || !confirmPasswordVerify) {
      Toast.show({
        type: "error",
        text1: "Required!",
        text2: "Password and Confirm Password",
        visibilityTime: 4000,
      });
      return;
    }

    const user_id: any = userInfo?._id;

    axios
      .post(AppConfig.backend_url + "api/user/updatePassword", {
        user_id,
        password
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "ok") {
          Toast.show({
            type: "success",
            text1: "Password updated",
          });

          router.replace("/(app)/UserProfile");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <KeyboardAwareScrollView
      style={[cstyles.scrollViewContainer, { backgroundColor: "#fff" }]}
      contentContainerStyle={cstyles.contentContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
    >

      <PageHeader pageTitle='Update Password' />

      <View style={cstyles.pageContainer}>

        <View style={{ height: 30 }}></View>

        <View style={cstyles.formContainer}>

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

        </View>
        {/* form container - ends */}

        <View style={{ height: 25 }}></View>

        <View style={cstyles.buttonContainer}>

          <TouchableOpacity
            style={cstyles.button}
            onPress={() => handelUpdate()}
          >
            <View>
              <Text style={cstyles.buttonText}>SAVE</Text>
            </View>
          </TouchableOpacity>

        </View>
        {/* button container - ends */}
      </View>
      {/* page container - ends */}

      <View style={{ height: 100 }}></View>
    </KeyboardAwareScrollView>
  );
};
export default UserProfile;
