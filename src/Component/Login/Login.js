import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LoginStyle from './LoginStyle';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const handleLoginPress = () => {
    navigation.navigate('DrawerNavigator')
  }
  return (
    <View style={LoginStyle.container}>
      <View style={LoginStyle.backgroundCircle} />
      <View style={LoginStyle.backgroundCircle1} />
      <View style={LoginStyle.backgroundCircle2} />
      <View style={LoginStyle.backgroundCircle3} />
      <View style={LoginStyle.imageCircleContainer}>
        <View style={[LoginStyle.imageCircle, LoginStyle.lowerCircle]}>
          <Image
            source={{ uri: 'https://techsimba.in//wp-content/uploads/2023/09/techsimbalogo.png'}}
            style={LoginStyle.image}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={LoginStyle.titleContainer}>
        <Text style={LoginStyle.title}>Let's Get Started</Text>
        <Text style={LoginStyle.subtitle}>Grow Together</Text>
      </View>
      <TouchableOpacity style={LoginStyle.button} onPress={handleLoginPress}>
      <Image
            source={require('../../Assets/Images/google.png')}
            resizeMode="contain"
            style={LoginStyle.googleLogin}
          />
        <Text style={LoginStyle.buttonText}>Login With Google</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Login;
