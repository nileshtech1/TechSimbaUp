import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {GetLeaveApi} from '../../../Redux/API/GetLeaveApi';
import Colors from '../../../Assets/Css/Colors';
import moment from 'moment';

const ViewMyLeave = ({route, navigation}) => {
  const dispatch = useDispatch();
  const { GetLeaveData } = route.params;
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
  const capitalizeFirstLetter = string =>
    string.charAt(0).toUpperCase() + string.slice(1);
  const calculateLeaveDays = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
    return end.diff(start, 'days') + 1; // Add 1 to include both start and end days
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.leaveTitle}>{item.user?.name || 'N/A'}</Text>
      </View>

      <View style={styles.subjectContainer}>
        <Text style={styles.label}>Subject</Text>
        <Text style={styles.value}>{item.subject || 'No Subject'}</Text>
      </View>

      <View style={styles.dateRow}>
        <View>
          <Text style={styles.label}>From</Text>
          <Text style={styles.value}>
            {moment(item.start_date).format('DD-MM-YYYY')}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>To</Text>
          <Text style={styles.value}>
            {moment(item.end_date).format('DD-MM-YYYY')}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View>
          <Text style={styles.label}>Approved By</Text>
          <Text style={styles.value}>{item.approved_by || 'Pending'}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.label}>Status</Text>
          <View style={getStatusStyle(item.status)}>
            <Text style={styles.statusText}>
              {item.status ? capitalizeFirstLetter(item.status) : 'N/A'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.dateRow}>
        <View>
          <Text style={styles.label}>Applied On</Text>
          <Text style={styles.value}>
            {moment(item.created_at).format('DD-MM-YYYY')}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Updated On</Text>
          <Text style={styles.value}>
            {moment(item.updated_at).format('DD-MM-YYYY')}
          </Text>
        </View>
      </View>

      <View style={styles.dateRow}>
        <View>
          <Text style={styles.label}>Leave Days</Text>
          <Text style={styles.value}>
            {calculateLeaveDays(item.start_date, item.end_date)} days
          </Text>
        </View>
      </View>
      <View style={styles.lognContainer}>
        <View>
          <Text style={styles.label}>remark</Text>
          <Text style={styles.value}>
            {item.remark || "Remark Not Available" }
          </Text>
        </View>
      </View>
      <View style={styles.lognContainer}>
        <View>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>
            {item.description?.replace(/<\/?[^>]+(>|$)/g, "") || "" || "Description Not Available" }
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  leaveTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.theme_background_dark,
    textAlign: 'center',
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
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
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
    paddingVertical: 2,
    paddingHorizontal: 10,
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
  lognContainer : {
    marginBottom : 5
  }
});

export default ViewMyLeave;
