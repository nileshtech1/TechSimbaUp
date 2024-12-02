import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ManageLeave = ({ navigation }) => {
  const [leaves, setLeaves] = useState([
    {
      id: '1',
      subject: 'Sick Leave',
      from: '2024-11-01',
      to: '2024-11-03',
      status: 'Approved',
    },
    {
      id: '2',
      subject: 'Vacation Leave',
      from: '2024-12-10',
      to: '2024-12-15',
      status: 'Pending',
    },
    {
      id: '3',
      subject: 'Personal Leave',
      from: '2024-11-20',
      to: '2024-11-22',
      status: 'Rejected',
    },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.leaveTitle}>{item.subject}</Text>
      <Text>{`From: ${item.from} To: ${item.to}`}</Text>
      <Text style={styles.leaveStatus}>{`Status: ${item.status}`}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate('LeaveDetails', { leaveId: item.id })}
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Leave</Text>
      <FlatList
        data={leaves}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  leaveTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  leaveStatus: {
    marginTop: 5,
    fontStyle: 'italic',
  },
  detailsButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ManageLeave;
