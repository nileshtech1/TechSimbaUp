import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VectorIcon from '../../../Icon/VectorIcon';
import ManageLeave from './ManageLeave';
import CreateLeave from './CreateLeave';
import AllLeave from './AllLeave';

const Tab = createBottomTabNavigator();

const Leave = () => {
  return (
    <Tab.Navigator
      initialRouteName="Manage Leave" // Set the default route
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconLibrary = 'FontAwesome'; // Default icon library

          // Assign icons based on route names
          switch (route.name) {
            case 'Apply Leave':
              iconName = 'new-message'; // Change to your preferred icon
              iconLibrary = 'Entypo'; // Specify the library for this icon
              break;
            case 'Manage Leave':
              iconName = 'cog'; // Change to your preferred icon
              iconLibrary = 'FontAwesome'; // Specify the library for this icon
              break;
            case 'All Leave':
              iconName = 'list'; // Change to your preferred icon
              iconLibrary = 'FontAwesome'; // Specify the library for this icon
              break;
            default:
              iconName = 'user'; // Default icon
          }

          return (
            <View style={styles.iconContainer}>
              {focused && <View style={[styles.activeTabLine, { backgroundColor: color }]} />}
              <VectorIcon icon={iconLibrary} name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: '#A0114DFF',
        tabBarInactiveTintColor: '#000000CE',
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="Apply Leave"
        component={CreateLeave}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Manage Leave"
        component={ManageLeave}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen
        name="All Leave"
        component={AllLeave}
        options={{ headerShown: false }}
      /> */}
    </Tab.Navigator>
  );
};

export default Leave;

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 0.8,
    borderTopColor: '#ddd',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabLine: {
    width: 100, // Adjust line width
    height: 3,
    borderRadius: 2,
    marginBottom: 5,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
