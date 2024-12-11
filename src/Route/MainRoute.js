import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Component/Login/Login';
import DrawerNavigator from './DrawerRoute';
import Notification from '../Component/Notification/Notification';
import Profile from '../Component/HRM/Profile/Profile';
import Settings from '../Component/Settings/Settings';
import ViewMyLeave from '../Component/HRM/Leave/ViewMyLeave';
import EditLeave from '../Component/HRM/Leave/EditLeave';
import {FCMManager} from '../FCMManager/FCMmanager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const MainRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('User');
        if (storedData) {
          const updatedData = JSON.parse(storedData);
          setUser(updatedData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  FCMManager();

  if (loading) {
    // Optionally, return a loading spinner or placeholder while checking user status
    return null; // Replace with a loading component if necessary
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        {!user?.id ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="My Leave" component={ViewMyLeave} />
            <Stack.Screen name="Edit Leave" component={EditLeave} />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainRoute;
