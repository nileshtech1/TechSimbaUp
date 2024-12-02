import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package

const ManageLeave = ({ navigation }) => {
  const [leaves, setLeaves] = useState([
    {
      id: '1',
      name: 'John Doe',
      subject: 'Sick Leave',
      from: '2024-11-01',
      to: '2024-11-03',
      approvedBy: 'Manager',
      status: 'Approved',
    },
    {
      id: '2',
      name: 'Adam Smith',
      subject: 'Vacation Leave',
      from: '2024-12-10',
      to: '2024-12-15',
      approvedBy: 'Team-Leader',
      status: 'Pending',
    },
    {
      id: '3',
      name: 'Doe Smith',
      subject: 'Personal Leave',
      from: '2024-11-20',
      to: '2024-11-22',
      approvedBy: 'Manager',
      status: 'Rejected',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return '#28A745'; // Green
      case 'Pending':
        return '#FFC107'; // Yellow
      case 'Rejected':
        return '#DC3545'; // Red
      default:
        return '#6c757d'; // Default gray color
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.nameContainer}>
        <Text style={styles.leaveTitle}>{item.name}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigation.navigate('LeaveDetails', { leaveId: item.id })}
          >
            <Icon name="eye" size={18} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditLeave', { leaveId: item.id })}
          >
            <Icon name="edit" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.leaveDates}>{`From: ${item.from} To: ${item.to}`}</Text>
      <Text style={styles.leaveApprovedBy}>{`Approved By: ${item.approvedBy || 'N/A'}`}</Text>

      <Text style={[styles.leaveStatus, { color: getStatusColor(item.status) }]}>
        {`Status: ${item.status}`}
      </Text>
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
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leaveTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  detailsButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#28A745',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  leaveDates: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  leaveApprovedBy: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  leaveStatus: {
    marginTop: 5,
    fontStyle: 'italic',
  },
});

export default ManageLeave;
