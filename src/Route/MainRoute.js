import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Component/Login/Login';
import DrawerNavigator from './DrawerRoute';
import Notification from '../Component/Notification/Notification';

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
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default MainRoute;
