import { Feather } from '@expo/vector-icons'
import React from 'react'

export const icon = {
   dashboard: (props: any) => (
      <Feather name='home' size={24} color={'#222'} {...props} />
   ),
   settings: (props: any) => (
      <Feather name='compass' size={24} color={'#222'} {...props} />
   ),
   users: (props: any) => (
      <Feather name='user' size={24} color={'#222'} {...props} />
   ),
}


export default icon