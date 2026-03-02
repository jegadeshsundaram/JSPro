import { View } from 'react-native'
import '../style/spinner.css'

const Spinner = () => {
  return (
    <View className='spinner' aria-label='spinner-icon'>
      <View className='spinner-circle'></View>
    </View>
  )
}

export default Spinner