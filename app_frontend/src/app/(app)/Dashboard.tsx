import { useAppSelector } from '@/src/features/hooks';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, BackHandler, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TabBar from '../components/TabBar';
import styles from '../style/app';

const Dashboard = () => {

   const { userInfo } = useAppSelector((state) => state.auth)

   const router = useRouter();

   function handleSettings() {
      router.push({
         pathname: '/(app)/UserProfile',
         params: {
            userInfo: JSON.stringify(userInfo)
         }
      })
   }

   function handleUsers() {
      router.push('/(app)/UserProfile');
   }

   const handleBackPress = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
         {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
         },
         {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
         },
      ]);
      return true;
   };

   useFocusEffect(
      React.useCallback(() => {
         //getUserData();
         const backPressEvent = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

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
            enableOnAndroid={true}>

            <View style={styles.pageContainer}>

               <View style={{ height: 35 }}>
               </View>

               <View style={[styles.header, { justifyContent: 'space-between', flexDirection: 'row' }]}>
                  <View>
                     <Text style={{ color: 'gray', fontSize: 12, marginBottom: 0, }}>WELCOME BACK</Text>
                     <Text style={[styles.headerText, { fontSize: 22, fontWeight: '600', }]}>{userInfo?.fullName}</Text>
                  </View>
                  <View>
                     <TouchableOpacity onPress={() => handleSettings()}>
                        <Text style={{ backgroundColor: 'gray', padding: 15, borderRadius: 50, color: '#fff', letterSpacing: 4, fontWeight: 'bold' }}>{userInfo?.fullName.slice(0, 2).toUpperCase()}</Text>
                     </TouchableOpacity>
                  </View>
               </View>

               <View style={{ height: 30 }}></View>

               <View style={styles.boxContainer}>
                  <View style={[styles.box, { backgroundColor: '#E54F5D' }]}>
                     <TouchableOpacity onPress={() => handleSettings()}>
                        <View>
                           <Ionicons name="settings-outline" style={styles.boxIcon} size={40} />
                           <Text style={styles.boxTextHeader}>SETTINGS</Text>
                           <Text style={styles.boxTextFooter}>App Management</Text>
                        </View>
                     </TouchableOpacity>
                  </View>

                  <View style={[styles.box, { backgroundColor: '#8FC254' }]}>
                     <TouchableOpacity onPress={() => handleUsers()}>
                        <View>
                           <FontAwesome6 name="building" style={styles.boxIcon} size={40} />
                           <Text style={styles.boxTextHeader}>PROFILE</Text>
                           <Text style={styles.boxTextFooter}>Company Operations</Text>
                        </View>
                     </TouchableOpacity>
                  </View>

                  <View style={[styles.box, { backgroundColor: '#F8BC41' }]}>
                     <TouchableOpacity onPress={() => handleUsers()}>
                        <View>
                           <Feather name="users" style={styles.boxIcon} size={38} />
                           <Text style={styles.boxTextHeader}>USERS</Text>
                           <Text style={styles.boxTextFooter}>Authorization</Text>
                        </View>
                     </TouchableOpacity>
                  </View>

                  <View style={[styles.box, { backgroundColor: '#498BDE' }]}>
                     <TouchableOpacity onPress={() => handleUsers()}>
                        <View>
                           <AntDesign name="form" style={styles.boxIcon} size={38} />
                           <Text style={styles.boxTextHeader}>IRAS</Text>
                           <Text style={styles.boxTextFooter}>Form Submission</Text>
                        </View>
                     </TouchableOpacity>
                  </View>

               </View>

               <View style={{ height: 30 }}></View>



            </View>

         </KeyboardAwareScrollView>

         <TabBar />



      </>
   )
}


export default Dashboard;	