import axios from 'axios';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import ConfirmDialog from '../components/ConfirmDialog';
import PageHeader from "../components/PageHeader";
import PopupMenu from '../components/PopupMenu';
import TabBar from '../components/TabBar';
import AppConfig from '../constants/AppConfig';
import styles from "../style/company";

interface Client {
  cn_id: number;
  name: string;
  uen: string;
}

const edit = "edit" as const;
const del = "remove" as const;

const popupData = [
  { icon: edit, label: 'Edit', value: '1', action: 'edit' },
  { icon: del, label: 'Delete', value: '2', action: 'delete' },
]

const Clients = () => {

  const router = useRouter();

  const [allClients, setAllClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [clientId, setClientId] = useState<string | number>('');

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  async function getClients() {
    axios.get(AppConfig.backend_url + 'api/client/all').then(res => {
      //console.log(">>>>" + res.data.companies);

      setAllClients(res.data.clients);
    });
  }

  function handleChange(query: any) {
    setSearchQuery(query);
    if (Array.isArray(allClients)) {
      const filtered = allClients.filter(client =>
        client.name.toLowerCase().includes(query.toLowerCase()) ||
        client.uen.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredClients(filtered);
    }
  }

  const handleSelect = (action: string, id: number) => {

    if (action == "edit") {
      router.push({
        pathname: '/(app)/ClientDetail',
        params: { id },
      })
    } else if (action == "delete") {
      setClientId(id);
      showDialog();
    }

  }

  const handleConfirmDelete = (id: string | number) => {
    // Add your confirmation logic here
    console.log("Action Confirmed" + id);

    axios
      .post(AppConfig.backend_url + "api/client/delete", {
        client_id: id
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "ok") {

          getClients();

          Toast.show({
            type: "success",
            text1: "Client deleted!",
          });

        } else {
          Toast.show({
            type: "error",
            text1: "Error in deletion",
          });
        }
      })
      .catch((e) => console.log(e));

    hideDialog();
  };

  const handleCancelDelete = () => {
    hideDialog();
    console.log("Action Confirmed" + visible);
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>

    <ConfirmDialog
        dialogVisibility={visible}
        onCancelClick={handleCancelDelete}
        onConfirmClick={handleConfirmDelete}
        dialogTitle='Delete Client'
        dialogContent='Are you sure to delete this client from our database?'
        buttonCancelText='NO'
        buttonConfirmText='YES'
        inputValue={clientId} />

      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>

        <PageHeader pageTitle='Authorized Clients' />

        <View style={{ flex: 1, padding: 15 }}>

          <View>
            <TextInput
              label="Search by Name / UEN"
              left={<TextInput.Icon icon="magnify" />}
              value={searchQuery}
              onChangeText={handleChange}
              style={{ height: 60, backgroundColor: "#ffffff" }}
            />

            <Text style={styles.recordsText}>
              {searchQuery.length > 0 ? `${filteredClients.length} records found` : `Total Records ${allClients.length} `}
            </Text>
          </View>

          <View style={{ height: 15 }}></View>

          <FlatList            
            data={searchQuery.length > 0 ? filteredClients : allClients}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.cn_id.toString()}
            contentContainerStyle={{ paddingBottom: 200 }}
            renderItem={({ item }) => (
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
                  {item.name.split(' ').map(item => item.charAt(0)).slice(0, 2)}
                </Text>
                <View style={[styles.cardDetails, { flexDirection: 'row' }]}>
                  <View style={{ width: '95%' }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.desc}>{item.uen}</Text>
                  </View>
                  <View style={{ width: '5%', justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
                    <PopupMenu onOptionSelect={handleSelect} options={popupData} dynamicValue={item.cn_id} />
                  </View>
                </View>
              </View>
            )}

            extraData={allClients}
          />
        </View>

      </View>     

      <TabBar pageName='Clients' />
      
    </>
  )
}


export default Clients