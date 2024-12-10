import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Employee from '../Component/HRM/Employee/Employee';
import VectorIcon from '../Icon/VectorIcon';
import Leave from '../Component/HRM/Leave/Leave';
import Salary from '../Component/HRM/Salary/Salary';
import Announcement from '../Component/HRM/Announcement/Announcement';
import Task from '../Component/HRM/Task/Task';
import AttendanceRecord from '../Component/HRM/AttendanceRecord/AttendanceRecord';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Home from '../Component/Home/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({route, navigation }) => {
  const [showHRMSubmenu, setShowHRMSubmenu] = useState(false);
  const [showCRMSubmenu, setShowCRMSubmenu] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeItem, setActiveItem] = useState('Home'); // Track active menu itemz
  const [sideBarContent, setSideBarContent] = useState([ 'Leave', 'Salary','Announcement'])
  const { ProfileData } = useSelector((state) => state.ShowProfile);
   // Retrieve newStates from the route params
   const { states } = route.params || {};

   useEffect(() => {
    // console.log('Received states:', states);
  
    if (states) {
  
      let updatedSideBarContent = [...sideBarContent];
  
      // Check if the value is true for each key and add it to the updated array
      if (states?.Employee) updatedSideBarContent.push('Employee');
      if (states?.AttendanceRecords) updatedSideBarContent.push('Attendance Records');
      if (states?.CRM) updatedSideBarContent.push('CRM');
      if (states?.Task) updatedSideBarContent.push('Task');
  
      setSideBarContent(updatedSideBarContent);
    }
  }, [states]);
   

  const handleProfileClick = () => {
    navigation.navigate('Profile')
    setModalVisible(false);
  };

  const handleLogoutClick = () => {
    AsyncStorage.removeItem("Token");
    AsyncStorage.removeItem("User");
    GoogleSignin.signOut();
    navigation.navigate('Login')
    setModalVisible(false);
  };

  const CustomDrawerContent = ({ navigation }) => (
    <ScrollView style={styles.drawerContainer} showsVerticalScrollIndicator={false}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: 'https://techsimba.in//wp-content/uploads/2023/09/techsimbalogo.png',
          }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Dashboard */}
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'Home' && styles.activeMenuItem, // Apply active styling
        ]}
        onPress={() => {
          setActiveItem('Home');
          navigation.navigate('Home');
        }}
      >
        <VectorIcon icon="MaterialIcons" name="home" size={22} color="#000000D5" />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>

      {/* HRM */}
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'HRM' && styles.activeMenuItem,
        ]}
        onPress={() => {
          setActiveItem('HRM');
          setShowHRMSubmenu(!showHRMSubmenu);
          setShowCRMSubmenu(false);
        }}
      >
        <VectorIcon icon="FontAwesome5" name="users" size={22} color="#000000D5" />
        <Text style={styles.menuText}>HRM</Text>
        <VectorIcon
          icon="FontAwesome"
          name={showHRMSubmenu ? 'sort-down' : 'caret-right'}
          size={20}
          color="#000000D5"
          style={styles.chevronIcon}
        />
      </TouchableOpacity>
      {showHRMSubmenu && (
        <View style={styles.submenuContainer}>
          {sideBarContent.map((submenu) => (
            <TouchableOpacity
              key={submenu}
              style={[
                styles.submenuItem,
                activeItem === submenu && styles.activeSubmenuItem,
              ]}
              onPress={() => {
                setActiveItem(submenu);
                navigation.navigate(submenu);
              }}
            >
              <VectorIcon icon="FontAwesome" name="minus" size={10} color="#000" style={styles.minusIcon} />
              <Text style={styles.submenuText}>{submenu}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* CRM */}
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'CRM' && styles.activeMenuItem,
        ]}
        onPress={() => {
          setActiveItem('CRM');
          setShowCRMSubmenu(!showCRMSubmenu);
          setShowHRMSubmenu(false);
        }}
      >
        {/* <VectorIcon icon="MaterialIcons" name="layers" size={22} color="#000000D5" />
        <Text style={styles.menuText}>CRM</Text>
        <VectorIcon
          icon="FontAwesome"
          name={showCRMSubmenu ? 'sort-down' : 'caret-right'}
          size={20}
          color="#000000D5"
          style={styles.chevronIcon}
        /> */}
      </TouchableOpacity>
      {/* {showCRMSubmenu && (
        <View style={styles.submenuContainer}>
          {['CRM Screen 1', 'CRM Screen 2'].map((submenu) => (
            <TouchableOpacity
              key={submenu}
              style={[
                styles.submenuItem,
                activeItem === submenu && styles.activeSubmenuItem,
              ]}
              onPress={() => {
                setActiveItem(submenu);
                navigation.navigate(submenu);
              }}
            >
              <VectorIcon icon="FontAwesome" name="minus" size={10} color="#000" style={styles.minusIcon} />
              <Text style={styles.submenuText}>{submenu}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )} */}
         {/* Modal implementation */}
    <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)} // Close modal when back button is pressed
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png',
          }}
          style={styles.logo1}
          resizeMode="contain"
        />
              <Text style={styles.modalText1}>{ProfileData?.employee?.first_name} {ProfileData?.employee?.last_name}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)} // Close modal when clicked
              style={styles.closeButton}
            >
              <VectorIcon icon="FontAwesome" name="times" size={22} color="#000" />
            </TouchableOpacity>

            {/* Profile and Logout options */}
            <TouchableOpacity onPress={handleProfileClick} style={styles.modalItem}>
              <VectorIcon icon="FontAwesome" name="user" size={22} color="#000" />
              <Text style={styles.modalText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogoutClick} style={styles.modalItem}>
              <VectorIcon icon="FontAwesome" name="sign-out" size={22} color="#000" />
              <Text style={styles.modalText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { width: 280 },
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notification'); // Replace this with navigation or other functionality
              }}
              style={styles.bellIconContainer}
            >
              <VectorIcon icon="FontAwesome" name="bell" size={20} color="#000000D5" style={styles.bellIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(true)} // Open the modal on settings icon click
              style={styles.bellIconContainer}
            >
              <VectorIcon icon="Ionicons" name="settings" size={20} color="#000000D5" style={styles.bellIcon} />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Employee" component={Employee} />
      <Drawer.Screen name="Leave" component={Leave} />
      <Drawer.Screen name="Salary" component={Salary} />
      <Drawer.Screen name="Announcement" component={Announcement} />
      <Drawer.Screen name="Task" component={Task} />
      <Drawer.Screen name="Attendance Records" component={AttendanceRecord} />
    </Drawer.Navigator>
  
 
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 0,
  },
  logo: {
    width: 150,
    height: 90,
  },
  logo1: {
    width: "100%",
    height: 90,
    justifyContent : 'center',
    alignItems : 'center'
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#000',
  },
  menuText1: {
    fontSize: 8,
    marginLeft: 10,
    color: '#000',
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
  submenuContainer: {
    borderLeftWidth: 1, // Vertical line
    borderLeftColor: '#000000', // Vertical line color
    marginLeft: 30,
    marginTop: 5,
    marginBottom: 5,
  },
  submenuItem: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align icon and text vertically
    paddingVertical: 8,
  },
  minusIcon: {
    marginRight: 10, // Space between the minus icon and the label
  },
  submenuText: {
    fontSize: 14,
    color: '#000',
  },
  
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeMenuItem: {
    backgroundColor: '#DDDDDDFF',
  },
  activeSubmenuItem: {
    backgroundColor: '#DDDDDDCB',
  },
  bellIcon: {
    marginRight: 15,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
    paddingTop: 60,
    paddingRight : 10,
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical : 10,
    width: 200,
    borderRadius: 10,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width : 100
  },
  modalText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#000',
  },
  modalText1 : {
    width : '100%',
    fontSize: 18,
    // marginLeft: 10,
    color: '#000',
    textAlign : 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 10,
    padding: 10,
  },
});

export default DrawerNavigator;
