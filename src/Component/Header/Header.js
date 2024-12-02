import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Using Feather icons

const Header = ({ backButton = false}) => {
  const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
      };
      const handleNotificationPress = () => {
        navigation.navigate('Notification')
      };
    
      const handleWishlistPress = () => {
        navigation.navigate('Wishlist')
      };
    
     
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.headerContainer}>
      {/* Left Section: Back Button or Logo */}
      {backButton ? (
        <TouchableOpacity onPress={handleBackPress} style={styles.iconButtonBack}>
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={styles.LeftIconsContainer}>
        <TouchableOpacity onPress={openDrawer} style={styles.iconButton}>
        <Icon name="menu" size={24} color="black" />
      </TouchableOpacity>
        <Image
          source={{uri : 'https://techsimba.in//wp-content/uploads/2023/09/techsimbalogo.png'}} // Replace with your logo path
          style={styles.logo}
          resizeMode="contain"
        />
        </View>
      )}

      {/* Right Section: Icons */}
      <View style={styles.rightIconsContainer}>
        <TouchableOpacity onPress={handleNotificationPress} style={styles.iconButton}>
          <Icon name="bell" size={24} color="black" />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleWishlistPress} style={styles.iconButton}>
          <Icon name="heart" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCartPress} style={styles.iconButton}>
          <Icon name="shopping-cart" size={24} color="black" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 0.8,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 100,
    height: 50,
    left : 10,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  LeftIconsContainer :{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent : 'space-evenly'
  },
  iconButton: {
    marginLeft: 15,
  },
  iconButtonBack: {
    marginLeft: 5,
  },
});
