import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const MySalary = ({navigation}) => {

  return (
      <TouchableOpacity style={{flex : 1,justifyContent : 'center', alignItems : 'center'}}>
            <Text>My Salary Screen</Text>
          </TouchableOpacity>
  )
}

export default MySalary