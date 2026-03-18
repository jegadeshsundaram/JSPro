import { useAppSelector } from '@/src/features/hooks';
import Back from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import * as ImagePicker from "expo-image-picker";
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar } from 'react-native-paper';
import cstyles from '../style/common';
import styles from '../style/profile';

const UserProfile = () => {

   const { userInfo } = useAppSelector((state) => state.auth)

    useEffect(() => {      
      if (userInfo) {
         console.log("User updated:", userInfo._id);
      }
      
      // Perform side effects here (e.g., API calls based on state)
   }, [userInfo]);

   const router = useRouter();

   const [image, setImage] = useState<string | null>(null);
   const [fullName, setFullName] = useState('');
   const [phone, setPhone] = useState('');

   console.log(userInfo?.fullName);

   const selectPhoto = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
         Alert.alert(
            "Permission Denied",
            `Sorry, we need camera roll permission to upload photos.`
         );
         return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ['images'],
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });

      if (!pickerResult.canceled) {
         setImage(pickerResult.assets[0].uri);
      }
   };


   const handelProfileUpdate = async () => {

      // Create FormData object
      const formData = new FormData();
      const user_id: any = userInfo?._id;

      if (image) {
         const userName = userInfo?.fullName.replaceAll(' ', '').toLowerCase();


         const uri = image;
         const filename = uri.split('/').pop();
         const match = /\.(\w+)$/.exec(filename!);
         const type = match ? `image/${match[1]}` : `image`;
         const ext = match ? match[1] : 'jpeg';
         const customImageName = `${user_id}_${userName}.${ext}`;

         // Append the image file data to the FormData
         formData.append('image', {
            uri,
            name: customImageName,
            type,
         } as any); // Use 'as any' to bypass potential TS errors
      }

      formData.append('user_id', user_id);
      formData.append('full_name', fullName);
      formData.append('phone', phone);

      const url = 'http://192.168.1.7:5001/api/user/update-profile';
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         }
      };

      axios
         .post(url, formData, config)
         .then(res => {
            console.log(res.data)
            if (res.data.status == "ok") {
               router.replace('/(app)/Dashboard');
            }
         })
         .catch(e => console.log(e));
   }

   return (
      <KeyboardAwareScrollView
         style={[cstyles.scrollViewContainer, { backgroundColor: '#fff' }]}
         contentContainerStyle={cstyles.contentContainer}
         keyboardShouldPersistTaps="handled"
         showsVerticalScrollIndicator={false}
         enableOnAndroid={true}
      >

         <View style={cstyles.pageContainer}>
            <View style={styles.profileHeader}>
               <View style={{ flex: 1, paddingLeft: 5 }}>
                  <Back name="arrow-back" size={30} style={[styles.backIcon, { paddingLeft: 7, paddingTop: 7 }]} onPress={() => router.back()} />
               </View>
               <View style={{ flex: 3 }}>
                  <Text style={styles.nameText}>Edit Profile</Text>
               </View>
               <View style={{ flex: 1 }}></View>
            </View>

            <View style={styles.camDiv}>
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
                              ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
                              : image,
                     }}
                  />
               </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}>
               <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500', letterSpacing: 1 }}>{userInfo?.fullName}</Text>
               <Text style={{ textAlign: 'center', fontSize: 16, color: 'gray' }}>@{userInfo?.fullName.replaceAll(' ', '').toLowerCase()}</Text>
            </View>

            <View style={{ height: 30 }}></View>

            <View style={cstyles.line}></View>

            <View style={{ height: 30 }}></View>

            <View style={cstyles.formContainer}>

               <View style={styles.inputContainer}>
                  <Text style={{ color: 'gray', marginLeft: 8 }}>Full Name</Text>
                  <TextInput
                     defaultValue={userInfo?.fullName}
                     style={styles.IC_TextInput}
                  />
               </View>

               <View style={styles.inputContainer}>
                  <Text style={{ color: 'gray', marginLeft: 8 }}>Email Address</Text>
                  <TextInput
                     defaultValue={userInfo?.email}
                     style={styles.IC_TextInput}
                  />
               </View>

               <View style={styles.inputContainer}>
                  <Text style={{ color: 'gray', marginLeft: 8 }}>Phone Number</Text>
                  <TextInput
                     keyboardType='number-pad'
                     defaultValue={userInfo?.phone}
                     style={styles.IC_TextInput}
                  />
               </View>

               <View style={styles.inputContainer}>
                  <Text style={{ color: 'gray', marginLeft: 8 }}>User Name</Text>
                  <TextInput
                     defaultValue={userInfo?.username}
                     style={styles.IC_TextInput}
                  />
               </View>

            </View>
            {/* form container - ends */}

            <View style={cstyles.buttonContainer}>

               <TouchableOpacity style={[cstyles.button, { borderRadius: 15, backgroundColor: '#201f1fff' }]} onPress={() => handelProfileUpdate()}>
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
   )
}
export default UserProfile

