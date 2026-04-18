import { logout } from "@/src/features/auth/authSlice";
import { useAppDispatch } from "@/src/features/hooks";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PageProps {
  pageName: string;
}

const TabBar = ({ pageName }: PageProps) => {

  const route = useRouter();
  const dispatch = useAppDispatch();

  function handleLogout() {

    if (Platform.OS === 'web') {
      dispatch(logout());
      router.replace("/Login");
    } else {

      Alert.alert('Logout', 'Are you sure?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'YES', onPress: () => {
            dispatch(logout());
            router.replace("/Login");
          },
          style: 'default',
        },
      ]);
    }
  }

  return (
    <View style={styles.tabBar}>
      <View style={styles.tabBarItem}>
        <TouchableOpacity
          onPress={() => pageName === 'Home' ? '' : route.push("/(app)/Dashboard")}>
          <View style={{ alignItems: "center" }}>
            <AntDesign
              name="dashboard"
              size={24}
              style={[styles.tabBarItemIcon, pageName === 'Home' ? styles.activeItem : '']}
            />
            <Text style={[styles.tabBarItemText, pageName === 'Home' ? styles.activeItem : '']}>Home</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.tabBarItem}>
        <TouchableOpacity
          onPress={() => pageName === 'Profile' ? '' : route.push("/(app)/CompanyProfile")}>
          <View style={{ alignItems: "center" }}>
            <AntDesign
              name="profile"
              size={24}
              style={[styles.tabBarItemIcon, pageName === 'Profile' ? styles.activeItem : '']}
            />
            <Text style={[styles.tabBarItemText, pageName === 'Profile' ? styles.activeItem : '']}>Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.tabBarItem}>
        <TouchableOpacity
          onPress={() => pageName === 'Clients' ? '' : route.push("/(app)/Clients")}>
          <View style={{ alignItems: "center" }}>
            <AntDesign
              name="cloud-server"
              size={24} style={[styles.tabBarItemIcon, pageName === 'Clients' ? styles.activeItem : '']}
            />            
            <Text style={[styles.tabBarItemText, pageName === 'Clients' ? styles.activeItem : '']}>Clients</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.tabBarItem}>
        <TouchableOpacity
          onPress={() => pageName === 'Users' ? '' : route.push("/(app)/Users")}>
          <View style={{ alignItems: "center" }}>
            <Feather
              name="users"
              size={24} style={[styles.tabBarItemIcon, pageName === 'Users' ? styles.activeItem : '']}
            />
            <Text style={[styles.tabBarItemText, pageName === 'Users' ? styles.activeItem : '']}>Users</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.tabBarItem}>
        <TouchableOpacity onPress={() => handleLogout()}>
          <View style={{ alignItems: "center" }}>
            <Feather name="log-out" style={styles.tabBarItemIcon} size={24} />
            <Text style={styles.tabBarItemText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 115,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  tabBarItem: {
    flex: 1,
    paddingVertical: 8,
    gap: 5,
    marginBottom: 30,
  },
  tabBarItemIcon: {
    color: "#cfc5c5ff",
  },
  tabBarItemText: {
    color: "#8e8585ff",
    fontSize: 10,
  },
  activeItem: {
    color: '#f4850dff'
  }
});

export default TabBar;