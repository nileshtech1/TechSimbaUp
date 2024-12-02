import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const NewAnnouncement = ({navigation}) => {

  return (
      <TouchableOpacity style={{flex : 1,justifyContent : 'center', alignItems : 'center'}}>
            <Text>New Announcement</Text>
          </TouchableOpacity>
  )
}

export default NewAnnouncement