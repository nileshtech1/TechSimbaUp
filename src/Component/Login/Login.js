import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import LoginStyle from './LoginStyle';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLoginApi } from '../../Redux/API/GoogleLoginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderOverlay from '../../ReusableComponent/Loader';
import { ShowProfileApi } from '../../Redux/API/ShowProfileApi';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { GoogleLoginData, GoogleLoading } = useSelector((state) => state.GoogleLogin);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { email, givenName, familyName } = userInfo?.data?.user || {};
      if (email) {
        const postData = {
          email : email
        }
        dispatch(GoogleLoginApi(postData)).then((response)=>{
          if (response?.payload?.status == true) {
            AsyncStorage.setItem("Token", JSON.stringify(response?.payload?.access_token));
            AsyncStorage.setItem("User", JSON.stringify(response?.payload?.user));
            dispatch(ShowProfileApi());
           navigation.navigate('DrawerNavigator');
          }
        })
      
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login Error', error.message);
    }
  };
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
      <TouchableOpacity style={LoginStyle.button} onPress={handleGoogleLogin}>
      <Image
            source={require('../../Assets/Images/google.png')}
            resizeMode="contain"
            style={LoginStyle.googleLogin}
          />
        <Text style={LoginStyle.buttonText}>Login With Google</Text>
      </TouchableOpacity>
      {
        GoogleLoading ? <LoaderOverlay/> : null
      }
    </View>
  );
};


export default Login;
