import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../Component/Dashboard/Dashboard';
import Employee from '../Component/HRM/Employee/Employee';
import VectorIcon from '../Icon/VectorIcon';
import Leave from '../Component/HRM/Leave/Leave';
import Salary from '../Component/HRM/Salary/Salary';
import Announcement from '../Component/HRM/Announcement/Announcement';
import Task from '../Component/HRM/Task/Task';
import AttendanceRecord from '../Component/HRM/AttendanceRecord/AttendanceRecord';
import Notification from '../Component/Notification/Notification';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}) => {
  const [showHRMSubmenu, setShowHRMSubmenu] = useState(false);
  const [showCRMSubmenu, setShowCRMSubmenu] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard'); // Track active menu item

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
          activeItem === 'Dashboard' && styles.activeMenuItem, // Apply active styling
        ]}
        onPress={() => {
          setActiveItem('Dashboard');
          navigation.navigate('Dashboard');
        }}
      >
        <VectorIcon icon="MaterialIcons" name="dashboard" size={22} color="#000000D5" />
        <Text style={styles.menuText}>Dashboard</Text>
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
        <VectorIcon icon="FontAwesome" name="users" size={22} color="#000000D5" />
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
          {['Employee', 'Leave', 'Salary',  'Task','Announcement', 'Attendance Records'].map((submenu) => (
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
        <VectorIcon icon="MaterialIcons" name="layers" size={22} color="#000000D5" />
        <Text style={styles.menuText}>CRM</Text>
        <VectorIcon
          icon="FontAwesome"
          name={showCRMSubmenu ? 'sort-down' : 'caret-right'}
          size={20}
          color="#000000D5"
          style={styles.chevronIcon}
        />
      </TouchableOpacity>
      {showCRMSubmenu && (
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
      )}
    </ScrollView>
  );


  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      drawerStyle: { width: 280 },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
           navigation.navigate('Notification') // Replace this with navigation or other functionality
          }}
          style={styles.bellIconContainer}
        >
          <VectorIcon icon="FontAwesome" name="bell" size={20} color="#000000D5" style={styles.bellIcon}/>
        </TouchableOpacity>
      ),
    }}
  >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Employee" component={Employee} />
      <Drawer.Screen name="Leave" component={Leave} />
      <Drawer.Screen  name="Salary" component={Salary} />
      <Drawer.Screen name="Announcement" component={Announcement} />
      <Drawer.Screen name="Task" component={Task} />
      <Drawer.Screen name="Attendance Records" component={AttendanceRecord} />
      {/* <Drawer.Screen name="Notification" component={Notification} /> */}
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
  chevronIcon: {
    marginLeft: 'auto',
  },
  submenuContainer: {
    borderLeftWidth: 1, // Vertical line
    borderLeftColor: '#000000', // Vertical line color
    marginLeft: 30,
    marginTop : 5,
    marginBottom : 5,
  },
  submenuItem: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align icon and text vertically
    paddingVertical: 8,
    // paddingLeft: 8,
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
    // color : 'blue'
  },
  activeSubmenuItem: {
    backgroundColor: '#DDDDDDCB',
  },
  bellIcon :{
    marginRight : 15
  }
});

export default DrawerNavigator;
