import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import axios from 'axios';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import PageHeader from "../components/PageHeader";
import TabBar from '../components/TabBar';
import AppConfig from '../constants/AppConfig';
import styles from "../style/company";

interface User {
  user_id: number;
  email: string;
  username: string;
  phone: string;
  profile_pic: string;
  created_on: string;
  last_login: string;
}

const Users = () => {

  const router = useRouter();

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setfilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  async function getUsers() {
    axios.get(AppConfig.backend_url + 'api/user/all').then(res => {
      //console.log(">>>>" + res.data.users);

      setAllUsers(res.data.users);
    });
  }

  function handleChange(query: any) {
    setSearchQuery(query);
    if (Array.isArray(allUsers)) {
      const filtered = allUsers.filter(user =>
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setfilteredUsers(filtered);
    }

  }

  function handleEditUser(item: any) {
    router.push({
      pathname: '/(app)/UserDetail',
      params: { id: item.user_id },
    })
  }

  function handleDeleteUser(item: any) {
    router.push({
      pathname: '/(app)/UserDetail',
      params: { id: item.user_id },
    })
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>

        <PageHeader pageTitle='Admin Users' />

        <View style={{ flex: 1, padding: 15 }}>

          <View>
            <TextInput
              label="Search by Email / Username"
              left={<TextInput.Icon icon="magnify" />}
              value={searchQuery}
              onChangeText={handleChange}
              style={{ height: 60, backgroundColor: "#ffffff" }}
            />

            <Text style={styles.recordsText}>
              {searchQuery.length > 0 ? `${filteredUsers.length} records found` : `Total Records ${allUsers.length} `}
            </Text>
          </View>

          <View style={{ height: 15 }}></View>

          <FlatList
            data={searchQuery.length > 0 ? filteredUsers : allUsers}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.user_id.toString()}
            contentContainerStyle={{ paddingBottom: 200 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardDetails}>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                    <View style={{ width: '80%' }}>
                      <Text style={styles.title}>{item.email}</Text>
                      <Text style={styles.desc}>{item.username}</Text>
                    </View>

                    <View style={{ width: '20%' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity style={{ marginRight: 5 }} onPress={() => handleEditUser(item)}>
                          <View style={{ width: 40, borderWidth: 1, borderRadius: 5, borderColor: '#ccc', padding: 5, alignItems: 'center' }}>
                            <Text><FontAwesome name="edit" size={22} color="black" /></Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteUser(item)}>
                          <View style={{ width: 40, borderWidth: 1, borderRadius: 5, borderColor: '#ccc', padding: 5, alignItems: 'center' }}>
                            <Text><Octicons name="repo-deleted" size={22} color="black" /></Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                  </View>

                </View>
              </View>
            )}
          />
        </View>

      </View>

      <TabBar pageName='Users' />
    </>
  )
}


export default Users