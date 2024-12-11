import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing MaterialIcons

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedData = await AsyncStorage.getItem('User');
        if (storedData) {
          const {id: customerId} = JSON.parse(storedData);

          // Retrieve notifications for the specific user
          const existingNotifications = await AsyncStorage.getItem(
            `notifications_${customerId}`,
          );
          if (existingNotifications) {
            const parsedNotifications = JSON.parse(existingNotifications);

            // Sort notifications: New ones first
            const sortedNotifications = parsedNotifications.sort((a, b) => {
              if (a.isNew && !b.isNew) return -1;
              if (!a.isNew && b.isNew) return 1;
              return 0;
            });

            setNotifications(sortedNotifications.reverse());
          }
        }
      } catch (error) {
        console.error('Error fetching notifications from AsyncStorage:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationPress = async (notificationId) => {
    try {
      const updatedNotifications = notifications.map((notification) => {
        if (notification.id === notificationId) {
          notification.read = true;
          notification.isNew = false;
        }
        return notification;
      });
      setNotifications(updatedNotifications.reverse());

      const storedData = await AsyncStorage.getItem('User');
      if (storedData) {
        const {id: customerId} = JSON.parse(storedData);

        await AsyncStorage.setItem(
          `notifications_${customerId}`,
          JSON.stringify(updatedNotifications),
        );
      }
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const updatedNotifications = notifications.filter(
        (notification) => notification.id !== notificationId,
      );
      setNotifications(updatedNotifications);

      const storedData = await AsyncStorage.getItem('User');
      if (storedData) {
        const {id: customerId} = JSON.parse(storedData);

        await AsyncStorage.setItem(
          `notifications_${customerId}`,
          JSON.stringify(updatedNotifications),
        );
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.notification,
              item.isNew && styles.newNotification,
            ]}
            onPress={() => handleNotificationPress(item.id)}>
            {item?.notification?.android?.imageUrl ? (
              <Image
                source={{uri: item?.notification?.android?.imageUrl}}
                style={styles.notificationImage}
              />
            ) : null}
            <View style={styles.notificationHeader}>
              <Text style={styles.title}>{item.notification?.title}</Text>
              <TouchableOpacity
                 style={styles.deleteIcon}
                onPress={() => handleDeleteNotification(item.id)}>
                <Icon name="delete" size={20} color="#ff4444" />
              </TouchableOpacity>
            </View>
            <View style={styles.notificationContent}>
              <Text
                style={[styles.message, item.isNew && styles.newMessage]}>
                {item.notification?.body}
              </Text>
              {!item.read && <Text style={styles.newTag}>New</Text>}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  notification: {
    backgroundColor: '#ffffff',
    padding: 18,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: '#000000C5',
  },
  newNotification: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e9',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  message: {
    fontSize: 14,
    color: '#333',
    maxWidth: '85%',
  },
  title: {
    fontSize: 16,
    color: '#000000',
    maxWidth: '95%',
    fontWeight: 'bold',
  },
  newMessage: {
    fontWeight: 'bold',
    color: '#4caf50',
  },
  newTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    color: 'white',
    backgroundColor: '#4caf50',
    borderRadius: 12,
    textAlign: 'center',
  },
  notificationImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteIcon :{
    // marginRight : 10
  }
});

export default Notification;
