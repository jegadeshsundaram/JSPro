import { updateProfile } from "@/src/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/features/hooks";
import Back from "@expo/vector-icons/Ionicons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Avatar, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import PageHeader from "../components/PageHeader";
import AppConfig from "../constants/AppConfig";
import cstyles from "../style/common";
import styles from "../style/profile";

const UserProfile = () => {

  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector((state) => state.auth);

  const [image, setImage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setPhone(userInfo.phone);
      setUsername(userInfo.username);

      console.log(">>>>" + userInfo.profilePic);

      if (userInfo.profilePic !== null && userInfo.profilePic !== undefined) {
        const image_uri = "https://www.topjeg.com/uploads/";
        setImage(image_uri + userInfo.profilePic);
      }

      console.log(">>>>" + image);
    }

    // Perform side effects here (e.g., API calls based on state)
  }, [userInfo]);

  const router = useRouter();

  const selectPhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera roll permission to upload photos.`,
      );
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      console.log("Upload Image URI >>>>"+pickerResult.assets[0].uri);
      setImage(pickerResult.assets[0].uri);
    }
  };

  const handelProfileUpdate = async () => {
    if (email.length === 0) {
      Toast.show({
        type: "error",
        text1: "Email is required",
      });
      return;
    } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      Toast.show({
        type: "error",
        text1: "Email is Invalid",
      });
      return;
    } else if (username === null || username.length === 0) {
      Toast.show({
        type: "error",
        text1: "Username is required",
      });
      return;
    }

    // Create FormData object
    const formData = new FormData();
    const user_id: any = userInfo?._id;

    if (image) {
      const userName = userInfo?.username;

      const uri = image;
      const filename = uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename!);
      const type = match ? `image/${match[1]}` : `image`;
      const ext = match ? match[1] : "jpeg";
      const customImageName = `${user_id}_${userName}.${ext}`;

      // Append the image file data to the FormData
      formData.append("image", {
        uri,
        name: customImageName,
        type,
      } as any); // Use 'as any' to bypass potential TS errors
    }

    formData.append("user_id", user_id);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("username", username);

    const url = AppConfig.backend_url + "api/user/update-profile";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(url, formData, config)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "ok") {
          dispatch(updateProfile({ email, username, phone }));

          Toast.show({
            type: "success",
            text1: "Profile updated",
          });

          router.replace("/(app)/Dashboard");
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
      <PageHeader pageTitle='Edit Profile' />

      <View style={cstyles.pageContainer}>

        <View style={styles.camDiv}>
          <View style={{ width: 165, height: 165 }}>
            <View style={styles.camIconDiv}>
              <Back name="camera" size={22} style={styles.cameraIcon} />
            </View>

            <TouchableOpacity onPress={() => selectPhoto()}>
              <Avatar.Image
                size={140}
                style={styles.avatar}
                source={{
                  uri:
                    image == "" || image == null
                      ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC"
                      : image,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              fontWeight: "500",
            }}
          >
            {userInfo?.clientName}
          </Text>

          {userInfo?.username ? (
            <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
              @{userInfo?.username.replaceAll(" ", "").toLowerCase()}
            </Text>
          ) : (
            ""
          )}
        </View>

        <View style={{ height: 30 }}></View>

        <View style={cstyles.line}></View>

        <View style={{ height: 30 }}></View>

        <View style={cstyles.formContainer}>

          <View>
            <TextInput
              label="Email Address"
              value={email}
              left={<TextInput.Icon icon="email" />}
              onChangeText={setEmail}
              style={{ height: 60, backgroundColor: "#ffffff" }}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
            />
          </View>

          <View style={{ height: 25 }}></View>

          <View>
            <TextInput
              label="User Name"
              value={username}
              left={<TextInput.Icon icon="account" />}
              onChangeText={setUsername}
              style={{ height: 60, backgroundColor: "#ffffff" }}
              autoCapitalize="none"
            />
          </View>

          <View style={{ height: 25 }}></View>

          <View>
            <TextInput
              label="Phone"
              value={phone}
              left={<TextInput.Icon icon="phone" />}
              onChangeText={setPhone}
              style={{ height: 60, backgroundColor: "#ffffff" }}
              keyboardType="number-pad"
            />
          </View>

        </View>
        {/* form container - ends */}

        <View style={{ height: 25 }}></View>

        <View style={cstyles.buttonContainer}>

          <TouchableOpacity
            style={cstyles.button}
            onPress={() => handelProfileUpdate()}
          >
            <View>
              <Text style={cstyles.buttonText}>SAVE</Text>
            </View>
          </TouchableOpacity>

          <View style={{ height: 25 }}></View>

          <TouchableOpacity 
            style={cstyles.buttonOutline}
            onPress={() => { router.navigate("/(app)/updateUserPassword"); }}
          >
            <View>
              <Text style={cstyles.buttonOutlineText}>Update Password</Text>
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
