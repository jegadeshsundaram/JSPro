import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get("window").height * 1;
export default StyleSheet.create({ 
  
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 1,
    marginBottom: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cardDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  desc: {
    fontSize: 14,
    color: '#777777',
  },
  desc_1: {
    fontSize: 14,
    color: '#777777',
  },
  recordsText: {
    color: '#ef6b3fff',
    textAlign: 'right',
    fontStyle: 'italic',
    fontSize: 11,
  }
});
