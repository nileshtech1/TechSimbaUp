import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const AttendanceRecord = ({navigation}) => {
  return (
      <TouchableOpacity style={{flex : 1,justifyContent : 'center', alignItems : 'center'}}>
            <Text>Attendance Record</Text>
          </TouchableOpacity>
  )
}

export default AttendanceRecord
