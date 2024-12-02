import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const AnnouncementList = ({navigation}) => {
  // Static data for the announcement list
  const announcements = [
    { id: '1', title: 'Maintenance Update', description: 'Scheduled maintenance on Dec 5th, 2024. Please expect some downtime.', color: '#FFFFFFFF', icon: 'wrench' },
    { id: '2', title: 'New Feature Launch', description: 'Introducing new features for better user experience in the upcoming version.', color: '#FFFFFFFF', icon: 'rocket' },
    { id: '3', title: 'System Upgrade', description: 'The system will be upgraded on Dec 12th, 2024. All services will be paused.', color: '#FFFFFFFF', icon: 'cogs' },
    { id: '4', title: 'Security Patch', description: 'We have released a security patch to improve system stability and security.', color: '#FFFFFFFF', icon: 'shield' },
  ];

  // Render item for each announcement
  const renderItem = ({ item }) => (
    <View style={[styles.announcementCard, { backgroundColor: item.color }]}>

      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={30} color="#000" />
      </View>
      <TouchableOpacity style={styles.textContainer}>
        <Text style={styles.announcementTitle}>{item.title}</Text>
        <Text style={styles.announcementDescription}>{item.description}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Announcement List</Text>
      <FlatList 
        data={announcements} 
        renderItem={renderItem} 
        scrollIndicatorInsets={false}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  announcementCard: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2, 
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // shadowOffset: { width: 0, height: 3 },
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1, 
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  announcementDescription: {
    fontSize: 14,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default AnnouncementList;
