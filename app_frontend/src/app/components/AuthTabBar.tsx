import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function AuthTabBar() {

   const route = useRouter();

   return (
      <View style={styles.tabBar}>
         <View style={styles.tabBarItem}>
            <TouchableOpacity onPress={() => route.push("/(auth)/Welcome")}>
               <View style={{ alignItems: "center" }}>
                  <AntDesign
                     name="dashboard"
                     style={styles.tabBarItemIcon}
                     size={28}
                  />
                  <Text style={styles.tabBarItemText}>HOME</Text>
               </View>
            </TouchableOpacity>
         </View>
         <View style={styles.tabBarItem}>
            <TouchableOpacity onPress={() => route.push("/(auth)/Login")}>
               <View style={{ alignItems: "center" }}>
                  <Feather name="users" style={styles.tabBarItemIcon} size={28} />
                  <Text style={styles.tabBarItemText}>LOGIN</Text>
               </View>
            </TouchableOpacity>
         </View>
         <View style={styles.tabBarItem}>
            <TouchableOpacity onPress={() => route.push("/(auth)/ClientRegistration")}>
               <View style={{ alignItems: "center" }}>
                  <Feather name="users" style={styles.tabBarItemIcon} size={28} />
                  <Text style={styles.tabBarItemText}>Register</Text>
               </View>
            </TouchableOpacity>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   tabBar: {
      width: '100%',
      position: "absolute",
      bottom: 50,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#ffffff",
      borderBottomWidth: 1,
      borderBottomColor: "lightgray",
      borderTopWidth: 1,
      borderTopColor: "lightgray",
   },
   tabBarItem: {
      flex: 1,
      paddingVertical: 8,
      gap: 5,
   },
   tabBarItemIcon: {
      color: "#000",
   },
   tabBarItemText: {
      color: "#000",
      fontSize: 12,
   },
});
