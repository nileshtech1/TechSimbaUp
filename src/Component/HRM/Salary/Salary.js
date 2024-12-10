import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VectorIcon from '../../../Icon/VectorIcon';
import { useNavigation } from '@react-navigation/native';
import CreateSalary from './CreateSalary';
import ManageSalary from './ManageSalary';
import MySalary from './MySalary';

const Tab = createBottomTabNavigator();

const Salary = () => {
  const navigation = useNavigation()
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconLibrary = 'FontAwesome'; // Default icon library

          // Assign icons based on route names
          switch (route.name) {
            case 'Create Salary':
              iconName = 'new-message'; // Change to your preferred icon
              iconLibrary = 'Entypo'; // Specify the library for this icon
              break;
            case 'Manage Salary':
              iconName = 'cog'; // Change to your preferred icon
              iconLibrary = 'FontAwesome'; // Specify the library for this icon
              break;
            case 'My Salary':
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
      {/* <Tab.Screen
        name="Create Salary"
        component={CreateSalary}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Manage Salary"
        component={ManageSalary}
        options={{ headerShown: false }}
      /> */}
       <Tab.Screen
        name="My Salary"
        component={MySalary}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Salary;

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
