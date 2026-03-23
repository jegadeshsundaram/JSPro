import { logout } from "@/src/features/auth/authSlice";
import { useAppDispatch } from "@/src/features/hooks";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TabBar() {
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());

    router.replace("/Login");
  }

  return (
    <View style={styles.tabBar}>
      <View style={styles.tabBarItem}>
        <TouchableOpacity>
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
        <TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <Feather name="users" style={styles.tabBarItemIcon} size={28} />
            <Text style={styles.tabBarItemText}>USERS</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.tabBarItem}>
        <TouchableOpacity onPress={() => handleLogout()}>
          <View style={{ alignItems: "center" }}>
            <Feather name="users" style={styles.tabBarItemIcon} size={28} />
            <Text style={styles.tabBarItemText}>LOGOUT</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
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
