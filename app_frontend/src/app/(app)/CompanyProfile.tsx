import { useAppDispatch, useAppSelector } from "@/src/features/hooks";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import PageHeader from "../components/PageHeader";
import TabBar from "../components/TabBar";
import AppConfig from "../constants/AppConfig";
import cstyles from "../style/common";

const UserProfile = () => {

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector((state) => state.auth);

  const [company, setCompany] = useState("");
  const [logo, setLogo] = useState("");
  const [gstRegNo, setGstRegNo] = useState("");
  const [UENNo, setUENNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [fax, setFax] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");

  useEffect(() => {
    getCompanyProfile();
  }, []);

  async function getCompanyProfile() {
    axios.get(AppConfig.backend_url + 'api/company/profile').then(res => {
      setCompany(res.data.profile[0].name);
      setLogo(res.data.profile[0].logo);
      setGstRegNo(res.data.profile[0].gst_reg_no);
      setUENNo(res.data.profile[0].uen_no);
      setEmail(res.data.profile[0].email);
      setAddress(res.data.profile[0].address);
      setPhone(res.data.profile[0].phone);
      setFax(res.data.profile[0].fax);
      setCurrency(res.data.profile[0].currency);
    });
  }


  return (
    <>
      <KeyboardAwareScrollView
        style={[cstyles.scrollViewContainer, { backgroundColor: "#fff" }]}
        contentContainerStyle={cstyles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
      >
        <PageHeader pageTitle='Company Profile' />

        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: '500', marginBottom: 10}}>{company}</Text>
          <Text style={{marginBottom: 10}}><Text style={{fontWeight: '500'}}>GST Reg No.</Text> {gstRegNo} | <Text style={{fontWeight: '500'}}>UEN.</Text> {UENNo}</Text>
          <Text style={{marginBottom: 10}}>{email} | <Text style={{fontWeight: '500'}}>Ph:</Text> {phone}</Text>
          <Text style={{marginBottom: 10}}>{address}</Text>
          <Text style={{marginBottom: 10}}><Text style={{fontWeight: '500'}}>Currency:</Text> SGD</Text>
        </View> */}

        <View style={cstyles.pageContainer}>

          <View style={{alignItems: 'center'}}>
            <Image 
              source={{ uri: 'https://irasapi.topjeg.com/assets/images/logo.jpeg'}}             
              style={{ width: '100%', height: 150 }} 
            />
          </View>

          <View style={{ height: 25 }}></View>

          <View style={cstyles.formContainer}>

            <View>
              <TextInput
                label="Company"
                value={company}
                onChangeText={setCompany}
                style={{ height: 60, backgroundColor: "#ffffff" }}
                editable={false}
              />
            </View>

            <View>
              <TextInput
                label="GST Registration No"
                value={gstRegNo}
                onChangeText={setGstRegNo}
                style={{ height: 60, backgroundColor: "#ffffff" }}
                editable={false}
              />
            </View>

            <View>
              <TextInput
                label="UEN No"
                value={UENNo}
                onChangeText={setUENNo}
                style={{ height: 60, backgroundColor: "#ffffff" }}
                editable={false}
              />
            </View>

            <View>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={{ height: 60, backgroundColor: "#ffffff" }}
                editable={false}
              />
            </View>

            <View>
              <TextInput
                label="Address"
                value={address}
                onChangeText={setAddress}
                style={{ height: 60, backgroundColor: "#ffffff" }}
                editable={false}
              />
            </View>

            <View>
              <TextInput
                label="Phone"
                value={phone}
                onChangeText={setPhone}
                style={{ height: 60, backgroundColor: "#ffffff" }}
                editable={false}
              />
            </View>

            <View>
              <TextInput
                label="Fax"
                value={fax}
                onChangeText={setFax}
                style={{ height: 60, backgroundColor: "#ffffff" }}
                editable={false}
              />
            </View>

            <View>
              <TextInput
                label="Currency"
                value={currency}
                onChangeText={setCurrency}
                style={{ height: 60, backgroundColor: "#ffffff" }}
                editable={false}
              />
            </View>

          </View>
          {/* form container - ends */}
          
        </View>
        {/* page container - ends */}

        <View style={{ height: 100 }}></View>
      </KeyboardAwareScrollView>

      <TabBar pageName="Profile" />
    </>
  );
};
export default UserProfile;
