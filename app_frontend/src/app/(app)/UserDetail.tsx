import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar, TextInput } from 'react-native-paper';
import AppConfig from '../constants/AppConfig';
import cstyles from "../style/common";

const UserDetail = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState(""); 

  console.log("User Details page");

  const { id } = useLocalSearchParams();

  console.log(">>>>"+id);

  async function getUserDetails() {
    axios
      .post(AppConfig.backend_url + "api/user/detail", {
        user_id: id
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "ok") {
          setUsername(res.data.user[0].username);
          setEmail(res.data.user[0].email);
          setPhone(res.data.user[0].phone);

          if(res.data.user[0].profile_pic !== "") {
            const image_uri = "https://www.topjeg.com/uploads/";
            setProfilePic(image_uri + res.data.user[0].profile_pic);
          }

        } else if (res.data.status == "not_found") {
          
        } else {
          
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <KeyboardAwareScrollView
      style={[cstyles.scrollViewContainer, { backgroundColor: "#fff" }]}
      contentContainerStyle={cstyles.contentContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
    >
      <View style={cstyles.pageContainer}>

        <View style={cstyles.formContainer}>

          <View>
            <Avatar.Image
                size={140}
                source={{
                  uri:
                    profilePic == "" || profilePic == null
                      ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC"
                      : profilePic,
                }}
              />
          </View>

          {/* Field :: Email Address */}
          <View>
            <TextInput
              label="User Name"
              value={username}
              left={<TextInput.Icon icon="account" />}
              style={{ height: 60, backgroundColor: "#ffffff" }}
              autoCapitalize="none"
              onChangeText={setUsername}
            />
          </View>
        
          {/* Field :: Email Address */}
          <View>
            <TextInput
              label="Email"
              value={email}
              left={<TextInput.Icon icon="email" />}
              style={{ height: 60, backgroundColor: "#ffffff" }}
              autoCapitalize="none"
              onChangeText={setEmail}
            />
          </View>

          {/* Field :: Email Address */}
          <View>
            <TextInput
              label="Phone"
              value={phone}
              left={<TextInput.Icon icon="phone" />}
              style={{ height: 60, backgroundColor: "#ffffff" }}
              onChangeText={setPhone}
            />
          </View>

        </View>

      </View>
    </KeyboardAwareScrollView>
  )
}

export default UserDetail