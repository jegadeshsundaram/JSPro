import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from 'react-redux';
import store from '../features/store';

import { Text, View } from "react-native";
import Toast, { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';

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


function AppLayout() {

   return (
      <>
         <Provider store={store}>
            <Stack screenOptions={{ headerShown: false }}>
               <Stack.Screen name="(auth)" />
            </Stack>
         </Provider>
         <StatusBar style="light" />
         <Toast config={toastConfig} />
      </>
   )
}

export default function RootLayout() {
   return <AppLayout />;
}