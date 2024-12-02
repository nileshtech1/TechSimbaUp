import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Task = ({navigation}) => {


  return (
      <TouchableOpacity style={{flex : 1,justifyContent : 'center', alignItems : 'center'}}>
            <Text>Task List</Text>
          </TouchableOpacity>
  )
}

export default Task
