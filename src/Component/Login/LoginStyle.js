import { StyleSheet } from "react-native";
import Colors from "../../Assets/Css/Colors";

export default LoginStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.bgwhite,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundCircle: {
      position: 'absolute',
      top: -150,
      left: -10,
      width: 450,
      height: 450,
      borderRadius: 225,
      backgroundColor: '#d4d4ff',
    },
    backgroundCircle1: {
      position: 'absolute',
      top: 140,
      left: 240,
      width: 300,
      height: 300,
      borderRadius: 140,
      backgroundColor: '#d4d4ff',
    },
    backgroundCircle2: {
      position: 'absolute',
      right: 150,
      bottom : -30,
      width: 400,
      height: 400,
      borderRadius: 200,
      backgroundColor: '#d4d4ff',
    },
    backgroundCircle3: {
      position: 'absolute',
      left: 140,
      bottom : -80,
      width: 280,
      height: 280,
      borderRadius: 140,
      backgroundColor: '#d4d4ff',
    },
    imageCircleContainer: {
      position: 'absolute',
      top: 80,
      alignItems: 'center',
    },
    imageCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      overflow: 'hidden',
      marginBottom: 20,
      top : 160,
      backgroundColor: Colors.bgwhite,
      justifyContent: 'center',
      alignItems: 'center',
      // borderWidth : 0.2,
      elevation : 2

    },
    imageCircle1: {
      width: 120,
      height: 120,
      borderRadius: 60,
      overflow: 'hidden',
      marginBottom: 20,
      backgroundColor: Colors.bgwhite,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 130,
    },
    lowerCircle: {
      marginLeft: 30,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    titleContainer: {
      right: 80,
      bottom: 50,
      width: 120,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 200,
    },
    subtitle: {
      fontSize: 13,
      color: Colors.bggray,
      textAlign: 'center',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
      backgroundColor: Colors.bgwhite,
      paddingHorizontal: 40,
      paddingVertical: 15,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: Colors.blue_crayola_color,
    },
    googleIcon: {
      marginRight: 10,
    },
    buttonText: {
      color: Colors.blue_crayola_color,
      fontSize: 16,
      fontWeight: 'bold',
      left : 5,
    },
    googleLogin : {
      width : 19,
      height : 19
    },
  });
  