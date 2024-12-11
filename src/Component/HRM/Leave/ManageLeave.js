import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {GetLeaveApi} from '../../../Redux/API/GetLeaveApi';
import Colors from '../../../Assets/Css/Colors';

const ManageLeave = ({navigation}) => {
  const dispatch = useDispatch();
  const {GetLeaveData} = useSelector(state => state.GetLeave);

  useEffect(() => {
    dispatch(GetLeaveApi());
  }, [dispatch]);

  const getStatusStyle = status => {
    switch (status) {
      case 'approved':
        return styles.statusApproved;
      case 'pending':
        return styles.statusPending;
      case 'rejected':
        return styles.statusRejected;
      default:
        return styles.statusDefault;
    }
  };
  const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);


  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.leaveTitle}>{item.user?.name || 'N/A'}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigation.navigate('My Leave', {GetLeaveData : GetLeaveData})}>
            <Icon name="eye" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('Edit Leave', {GetLeaveData : GetLeaveData})}>
            <Icon name="edit" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.subjectContainer}>
        <Text style={styles.label}>Subject:</Text>
        <Text style={styles.value}>{item.subject || 'No Subject'}</Text>
      </View>

      <View style={styles.dateRow}>
        <View>
          <Text style={styles.label}>From:</Text>
          <Text style={styles.value}>{item.start_date}</Text>
        </View>
        <View>
          <Text style={styles.label}>To:</Text>
          <Text style={styles.value}>{item.end_date}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View>
          <Text style={styles.label}>Approved By:</Text>
          <Text style={styles.value}>{item.approved_by || 'Pending'}</Text>
        </View>
        <View style={[styles.statusContainer, getStatusStyle(item.status)]}>
        <Text style={styles.statusText}>{item.status ? capitalizeFirstLetter(item.status) : 'N/A'}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Leave</Text>
      <FlatList
        data={GetLeaveData?.leavedata ? [GetLeaveData.leavedata] : []}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
    backgroundColor: '#f8f9fa',
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leaveTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color : Colors.theme_background_dark
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
  subjectContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  value: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusApproved: {
    backgroundColor: '#28A745',
  },
  statusPending: {
    backgroundColor: '#FFC107',
  },
  statusRejected: {
    backgroundColor: '#DC3545',
  },
  statusDefault: {
    backgroundColor: '#6c757d',
  },
});

export default ManageLeave;