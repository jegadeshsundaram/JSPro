import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Toast, { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';

const toastConfig: ToastConfig = {
   success: (props) => (
      <BaseToast
         {...props}
         style={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderLeftColor: 'green',
            borderLeftWidth: 3,
            width: '90%',
            height: 70,
         }}
         contentContainerStyle={{ paddingHorizontal: 15 }}
         text1Style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#000'
         }}
         text2Style={{
            fontSize: 15,
            color: '#000'
         }}
      />
   ),
   /*
     Overwrite 'error' type,
     by modifying the existing `ErrorToast` component
   */
   error: (props) => (
      <ErrorToast
         {...props}
         text2NumberOfLines={3}
         style={{
            backgroundColor: '#000',
            borderLeftColor: 'red',
            borderLeftWidth: 2,
            width: '90%',
            height: 70,
         }}
         contentContainerStyle={{ paddingHorizontal: 15 }}
         text1Style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#fff'
         }}
         text2Style={{
            fontSize: 15,
            color: '#fff'
         }}
      />
   ),
   /*
    Create a completely custom type
  */
   tomatoToast: ({ text1, props }: any) => (
      <View style={{ height: 60, width: '90%', backgroundColor: 'tomato', borderRadius: 10 }}>
         <Text>{text1}</Text>
         <Text>{props.uuid}</Text>
      </View>
   )
};

const AppNavigator = () => {

   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
   console.log(">>> Is User Authenticated? " + isAuthenticated);

   return (
      <>
         <Stack screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
               <Stack.Screen name="(app)" />
            ) : (
               <Stack.Screen name="(auth)" />
            )}
         </Stack>
         <StatusBar style="light" />
         <Toast config={toastConfig} />
      </>
   )
}

export default AppNavigator