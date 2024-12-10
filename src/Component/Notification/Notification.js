import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

// Static data for notifications
const notifications = [
    { 
      id: '1', 
      message: 'New message from HR regarding your leave request.', 
      isNew: true, 
      type: 'message', 
      timestamp: '2024-12-01 09:30', 
      priority: 'high',
      user: 'employee1',
    },
    { 
      id: '2', 
      message: 'Your project task has been assigned to you in the management portal.', 
      isNew: true, 
      type: 'task_assignment', 
      timestamp: '2024-12-01 10:00', 
      priority: 'medium',
      user: 'employee2',
    },
    { 
      id: '3', 
      message: 'The quarterly financial report is now available for review.', 
      isNew: false, 
      type: 'report', 
      timestamp: '2024-11-30 14:20', 
      priority: 'low',
      user: 'employee3',
    },
    { 
      id: '4', 
      message: 'System maintenance scheduled for tonight between 10 PM and 2 AM.', 
      isNew: false, 
      type: 'maintenance', 
      timestamp: '2024-11-30 16:45', 
      priority: 'medium',
      user: 'admin',
    },
    { 
      id: '5', 
      message: 'Reminder: Monthly meeting scheduled for tomorrow at 9 AM in the conference room.', 
      isNew: true, 
      type: 'reminder', 
      timestamp: '2024-12-01 08:00', 
      priority: 'medium',
      user: 'employee1',
    },
  ];
  

const Notification = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.notification, item.isNew && styles.newNotification]}>
            <View style={styles.notificationContent}>
              <Text style={[styles.message, item.isNew && styles.newMessage]}>
                {item.message}
              </Text>
              {item.isNew && <Text style={styles.newTag}>New</Text>}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  notification: {
    backgroundColor: '#ffffff',
    padding: 18,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  newNotification: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e9',
  },
  notificationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: '#333',
    maxWidth: '85%',
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
})

export default Notification
