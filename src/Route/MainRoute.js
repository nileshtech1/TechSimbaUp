import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Component/Login/Login';
import DrawerNavigator from './DrawerRoute';
import Notification from '../Component/Notification/Notification';
import Profile from '../Component/HRM/Profile/Profile';
import Settings from '../Component/Settings/Settings';
import ViewMyLeave from '../Component/HRM/Leave/ViewMyLeave';
import EditLeave from '../Component/HRM/Leave/EditLeave';

const Stack = createStackNavigator();

const MainRoute = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Notification"
            component={Notification}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: true }}
          />
           <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: true }}
          />
               <Stack.Screen
            name="My Leave"
            component={ViewMyLeave}
            options={{ headerShown: true }}
          />
                <Stack.Screen
            name="Edit Leave"
            component={EditLeave}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default MainRoute;
