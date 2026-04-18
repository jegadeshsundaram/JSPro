import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import PageHeader from '../components/PageHeader';
import AppConfig from '../constants/AppConfig';
import cstyles from "../style/common";
import styles from "../style/company";

interface User {
  user_id: number;
  username: string;
  email: string;
  phone: string;
  company_uen: string;
  last_login: string;
  product: string;
}

const ClientDetail = () => {
  const router = useRouter();

  const [client, setClient] = useState("");
  const [clientUEN, setClientUEN] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const { id } = useLocalSearchParams();

  async function getClientDetails() {
    axios
      .post(AppConfig.backend_url + "api/client/detail", {
        client_id: id
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "ok") {
          setClient(res.data.client[0].name);
          setClientUEN(res.data.client[0].uen);
          setUsers(res.data.users);

        } else {
          Toast.show({
            type: "error",
            text1: "Error in display Client details",
          });
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getClientDetails();
  }, []);

  function handleUser(user_id: number) {
    console.log("Client Details Page ::: " + user_id);
    router.push({
      pathname: '/(app)/UserDetail',
      params: { id: user_id },
    })
  }

  const handelUpdate = async () => {

    if (client === '' || clientUEN === '') {
      Toast.show({
        type: "error",
        text1: "Required!",
        text2: "Client Name and UEN",
        visibilityTime: 4000,
      });
      return;
    } else if (clientUEN.length < 9 || clientUEN.length > 10) {
      Toast.show({
        type: "error",
        text1: "UEN should be 9 or 10 digits",
        visibilityTime: 4000,
      });
      return;
    }


    axios
      .post(AppConfig.backend_url + "api/client/update", {
        client_id: id,
        name: client,
        uen: clientUEN
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "ok") {
          Toast.show({
            type: "success",
            text1: "Client details updated",
          });

          router.replace("/(app)/Clients");
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

      <PageHeader pageTitle='Edit Client' />

      <View style={cstyles.pageContainer}>

        <View style={cstyles.formContainer}>
          {/* Field :: Email Address */}
          <View>
            <TextInput
              label="Client"
              value={client}
              left={<TextInput.Icon icon="email" />}
              style={{ height: 60, backgroundColor: "#ffffff" }}
              onChangeText={setClient}
            />
          </View>
        </View>

        <View style={cstyles.formContainer}>
          {/* Field :: Email Address */}
          <View>
            <TextInput
              label="UEN"
              value={clientUEN}
              left={<TextInput.Icon icon="email" />}
              style={{ height: 60, backgroundColor: "#ffffff" }}
              onChangeText={setClientUEN}
            />
          </View>
        </View>

        <View>
          <Text>Registered Users: {users.length}</Text>
          {users.map((user) => (
            <View key={user.user_id}>
              <Pressable onPress={() => handleUser(user.user_id)}>
                <View style={styles.card}>
                  <Text
                    style={{
                      backgroundColor: "gray",
                      padding: 15,
                      borderRadius: 50,
                      color: "#fff",
                      letterSpacing: 4,
                      fontWeight: "bold",
                    }}
                  >
                    {user.username.split(' ').map(item => item.charAt(0)).slice(0, 2)}
                  </Text>
                  <View style={styles.cardDetails}>
                    <Text style={styles.title}>{user.username}</Text>
                    <Text style={styles.desc}>{user.email}</Text>
                  </View>
                </View>
              </Pressable>
            </View>
          ))}

        </View>

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
    </KeyboardAwareScrollView>
  )
}

export default ClientDetail