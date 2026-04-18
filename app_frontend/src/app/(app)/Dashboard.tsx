import { useAppSelector } from "@/src/features/hooks";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, BackHandler, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TabBar from "../components/TabBar";
import styles from "../style/app";

const Dashboard = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const router = useRouter();

  function handleSettings() {
    router.push({
      pathname: "/(app)/Settings",
      params: {
        userInfo: JSON.stringify(userInfo),
      },
    });
  }

  function handleCompany() {
    router.push("/(app)/CompanyProfile");
  }

  function handleUsers() {
    router.push("/(app)/Users");
  }

  function handleUserProfile() {
    router.push("/(app)/UserProfile");
  }

  function handleClients() {
    router.push("/(app)/Clients");
  }

  function handleSubmission() {
  }

  function handleReports() {
  }

  const handleBackPress = () => {
    Alert.alert("Exit App", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Exit",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      //getUserData();
      const backPressEvent = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress,
      );

      return () => {
        backPressEvent.remove();
      };
    }, []),
  );

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
      >

      <View style={{ marginTop: 50, paddingLeft: 10, paddingRight: 10, justifyContent: "space-between", flexDirection: "row", borderWidth: 2, borderColor: '#f1ececff' }}>
          <View style={{ width: '80%', paddingTop: 7, paddingBottom: 3 }}>
            <Text style={{ color: "gray", fontSize: 12 }}>
              WELCOME BACK!
            </Text>
            <Text
              style={[styles.headerText, { fontSize: 16, fontWeight: "600" }]}
            >
              {userInfo?.clientName}
            </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => handleUserProfile()}>
              <Text
                style={{
                  backgroundColor: "#cad2ceff",
                  padding: 10,
                  borderRadius: 10,
                  color: "#4d2424ff",
                  letterSpacing: 4,
                  fontWeight: "bold",
                }}
              >
                {userInfo?.clientName.split(' ').map(item => item.charAt(0)).slice(0, 2)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.pageContainer}>         

          <View style={{ height: 30 }}></View>

          <View style={[styles.boxContainer, { padding: 10 }]}>
            <View style={[styles.box, { backgroundColor: "#E54F5D" }]}>
              <TouchableOpacity onPress={() => handleSettings()}>
                <View>
                  <Ionicons
                    name="settings-outline"
                    style={styles.boxIcon}
                    size={40}
                  />
                  <Text style={styles.boxTextHeader}>SETTINGS</Text>
                  <Text style={styles.boxTextFooter}>App Management</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[styles.box, { backgroundColor: "#8FC254" }]}>
              <TouchableOpacity onPress={() => handleCompany()}>
                <View>
                  <FontAwesome6
                    name="building"
                    style={styles.boxIcon}
                    size={40}
                  />
                  <Text style={styles.boxTextHeader}>COMPANY</Text>
                  <Text style={styles.boxTextFooter}>About SAAS Provider</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[styles.box, { backgroundColor: "#F8BC41" }]}>
              <TouchableOpacity onPress={() => handleClients()}>
                <View>
                  <Feather name="users" style={styles.boxIcon} size={38} />
                  <Text style={styles.boxTextHeader}>CLIENTS</Text>
                  <Text style={styles.boxTextFooter}>Authorization</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[styles.box, { backgroundColor: "#d468a3ff" }]}>
              <TouchableOpacity onPress={() => handleUsers()}>
                <View>
                  <Feather name="users" style={styles.boxIcon} size={38} />
                  <Text style={styles.boxTextHeader}>USERS</Text>
                  <Text style={styles.boxTextFooter}>Manage Submission</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[styles.box, { backgroundColor: "#498BDE" }]}>
              <TouchableOpacity onPress={() => handleSubmission()}>
                <View>
                  <AntDesign name="form" style={styles.boxIcon} size={38} />
                  <Text style={styles.boxTextHeader}>IRAS</Text>
                  <Text style={styles.boxTextFooter}>Form Submission</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[styles.box, { backgroundColor: "#878a8cff" }]}>
              <TouchableOpacity onPress={() => handleReports()}>
                <View>
                  <AntDesign name="form" style={styles.boxIcon} size={38} />
                  <Text style={styles.boxTextHeader}>REPORTS</Text>
                  <Text style={styles.boxTextFooter}>History of Submission</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>

          <View style={{ height: 30 }}></View>
        </View>
      </KeyboardAwareScrollView>

      <TabBar pageName="Home" />
    </>
  );
};

export default Dashboard;
