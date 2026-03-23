import { Pressable, StyleSheet, Text } from "react-native";

const TabBarButton = () => {
  return (
    <Pressable style={styles.tabBarItem}>
      <Text></Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default TabBarButton;
