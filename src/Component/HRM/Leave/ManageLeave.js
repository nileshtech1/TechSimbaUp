import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { GetLeaveApi } from '../../../Redux/API/GetLeaveApi';

const ManageLeave = ({ navigation }) => {
  const dispatch = useDispatch();
  const { GetLeaveData } = useSelector((state) => state.GetLeave);

  useEffect(() => {
    dispatch(GetLeaveApi());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return '#28A745'; // Green
      case 'pending':
        return '#FFC107'; // Yellow
      case 'rejected':
        return '#DC3545'; // Red
      default:
        return '#6c757d'; // Default gray color
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.nameContainer}>
        <Text style={styles.leaveTitle}>{item.user?.name || 'N/A'}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigation.navigate('My Leave')}
          >
            <Icon name="eye" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('Edit Leave')}
          >
            <Icon name="edit" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.leaveSubject}>{item.subject || 'No Subject'}</Text>
      <Text style={styles.leaveDates}>{`From: ${item.start_date || 'N/A'} To: ${item.end_date || 'N/A'}`}</Text>
      <Text style={styles.leaveApprovedBy}>{`Approved By: ${item.approved_by || 'N/A'}`}</Text>
      <Text style={[styles.leaveStatus, { color: getStatusColor(item.status) }]}>
        {`Status: ${item.status}`}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Leave</Text>
      <FlatList
        data={GetLeaveData?.leavedata ? [GetLeaveData.leavedata] : []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
  leaveSubject: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
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
