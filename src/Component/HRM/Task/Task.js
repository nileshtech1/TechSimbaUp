import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VectorIcon from '../../../Icon/VectorIcon';
import AssignTask from './AssignTask';
import TaskList from './TaskList';

const Tab = createBottomTabNavigator();

const Task = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconLibrary = 'FontAwesome'; // Default icon library

          // Assign icons based on route names
          switch (route.name) {
            case 'Assign Task':
              iconName = 'new-message'; // Change to your preferred icon
              iconLibrary = 'Entypo'; // Specify the library for this icon
              break;
            case 'Task List':
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
        name="Assign Task"
        component={AssignTask}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Task List"
        component={TaskList}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Task;

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
