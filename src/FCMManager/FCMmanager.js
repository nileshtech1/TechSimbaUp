import React, { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

export const FCMManager = () => {
  const [notificationPermission, setNotificationPermission] = useState(false);
 const dispatch = useDispatch();
  useEffect(() => {
    const initialize = async () => {
      await checkNotificationPermission();
      await getToken();

      const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(token => {
        console.log('FCM onTokenRefresh ', token);
      });

      messaging().setBackgroundMessageHandler(async remoteMessage => {
        // console.log('Message handled in the background!', remoteMessage);
        await saveNotification(remoteMessage);
      });

      const initialNotification = await messaging().getInitialNotification();
      if (initialNotification) {
        // console.log('Message handled in the background on app launch!', initialNotification);
        await saveNotification(initialNotification);
      }

      const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
        // console.log('Message handled in the foreground!', remoteMessage);
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          const title = notification?.title;
          const body = notification?.body;

          if (title && body) {
            Alert.alert('You have a new notification!', `${title}\n${body}`);
          } else {
            Alert.alert('You have a new notification!', JSON.stringify(notification));
          }
          await saveNotification(remoteMessage);
        }
      });

      return () => {
        unsubscribeOnTokenRefresh();
        unsubscribeOnMessage();
      };
    };

    initialize().catch(error => console.error('Initialization error:', error));
  }, []);

  const checkNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message: 'This app would like to send you notifications.',
            buttonNegative: 'Deny',
            buttonPositive: 'Allow',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setNotificationPermission(true);
          // console.log('You have granted the permission.');
        } else {
          setNotificationPermission(false);
          // console.log('You have not granted the permission.');
        }
      } catch (err) {
        console.warn('Permission error:', err);
      }
    } else if (Platform.OS === 'ios') {
      try {
        const authorizationStatus = await messaging().requestPermission();
        setNotificationPermission(
          authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED
        );
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          // console.log('iOS: Notification permission granted');
        } else {
          // console.log('iOS: Notification permission denied');
        }
      } catch (err) {
        console.warn('Permission error:', err);
      }
    }
  };

  const getToken = async () => {
    try {
      // Retrieve the FCM token
      const token = await messaging().getToken();
      console.log('FCM token:', token);
  
      if (token) {
        // Store the token in AsyncStorage
        await AsyncStorage.setItem('fcmToken', JSON.stringify(token));
        // console.log('FCM token stored successfully.');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };
  

  const saveNotification = async notification => {
    try {
      const storedData = await AsyncStorage.getItem('User');
      if (storedData) {
        const { id: customerId } = JSON.parse(storedData);

        // Retrieve existing notifications
        const existingNotifications = await AsyncStorage.getItem(
          `notifications_${customerId}`
        );
        const notifications = existingNotifications
          ? JSON.parse(existingNotifications)
          : [];

        // Add new notification with current timestamp and unread status
        notifications.push({
          id: notification.messageId, // Unique identifier from the notification
          notification: notification.notification,
          timestamp: new Date(notification.sentTime).toISOString(),
          read: false,
        });

        // Save notifications back to AsyncStorage
        await AsyncStorage.setItem(
          `notifications_${customerId}`,
          JSON.stringify(notifications)
        );
      } else {
        console.warn('No user data found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error saving notification:', error);
    }
  };

  return null; // Since this is a manager component, it does not render anything
};
