import Back from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  pageTitle: string;
}


const PageHeader = ({ pageTitle }: HeaderProps) => {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <Back
          name="arrow-back"
          size={30}
          style={styles.backIcon}
          onPress={() => router.back()}
        />
      </View>
      <View style={styles.containerRight}>
        <Text style={styles.title}>{ pageTitle }</Text>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  )
}

export default PageHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#03150cff'
  },
  containerLeft: {
    width: '15%',
    height: 100,
    paddingLeft: 5,
  },
  backIcon: {
    color: '#ffffff',
    marginTop: 50,
    marginLeft: 12
  },
  containerRight: {
    width: '85%',
    height: 100,
  },
  title: {
    color: '#ffffff',
    marginTop: 50,
    fontSize: 20,
    marginLeft: 20,
  }
})