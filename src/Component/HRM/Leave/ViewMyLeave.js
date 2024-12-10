import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../../Assets/Css/Colors';

const ViewMyLeave = () => {
  const { GetLeaveData } = useSelector((state) => state.GetLeave);
  const leaveData = GetLeaveData?.leavedata;
  const userName = leaveData?.user?.name || 'User';

  const getStatusColor = (status) => {
    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    switch (formattedStatus) {
      case 'Approved':
        return Colors.green_color;
      case 'Pending':
        return Colors.banana_Yellow_color;
      case 'Rejected':
        return Colors.red_crayola_color;
      default:
        return Colors.gray;
    }
  };

  const calculateLeaveDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Add 1 to include both start and end days
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {  day: 'numeric', month: 'short', year: 'numeric'}); // More user-friendly date format
  };

  if (!leaveData) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No leave data available</Text>
      </View>
    );
  }



  const renderLeaveItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.leaveTitle}>{item.subject}</Text>
        <Text style={[styles.leaveStatus, { color: getStatusColor(item.status), marginLeft: 'auto' }]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}
        </Text>
        </View>
        <View style={styles.cardContent}>

      <View style={styles.cardRow}>
        <Icon name="calendar" size={16} color={Colors.theme_secondary} />
        <Text style={styles.leaveDates}>{formatDate(item.start_date)} - {formatDate(item.end_date)} ({calculateLeaveDays(item.start_date, item.end_date)} days)</Text>
      </View>
      <View style={styles.cardRow}>
        <Icon name="align-left" size={16} color={Colors.theme_secondary} />
        <Text style={styles.leaveDescription}>{item.description}</Text>
      </View>

      <View style={styles.cardRow}>
         <Icon name="clock" size={16} color={Colors.theme_secondary} />
        <Text style={styles.leaveDates}>Created: {formatDate(item.created_at)}</Text>
      </View>

        {item.approved_by && (
             <View style={styles.cardRow}>
        <Icon name="user-check" size={16} color={Colors.theme_secondary} />
        <Text style={styles.leaveApprovedBy}>Approved by: {item.approved_by}</Text>
      </View>
        )}


      </View>

    </View>
  );

  return (
    <View style={styles.container}>
        <View style={styles.header}>

      <Text style={styles.userName}>{`Hello, ${userName}`}</Text>
            <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.avatar}
        />
        </View>
      <FlatList
        data={Array.isArray(leaveData) ? leaveData : [leaveData]}
        renderItem={renderLeaveItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2', // Added a background color
  },

 header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items to opposite ends
    marginBottom: 20,
    backgroundColor: Colors.bgwhite,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,

  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.theme_background_dark,
  },
  noDataText: {
    fontSize: 18,
    color: Colors.theme_secondary,
    textAlign: 'center',
  },
  list: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: Colors.bgwhite,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },

cardContent: {
    // Add padding or other styling as needed
},
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align to the top
    marginBottom: 8,
  },
  leaveTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.theme_primary,
  },
  leaveDates: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.theme_secondary,
  },
  leaveDescription: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.theme_secondary,
  },
  leaveStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
     marginLeft: 10,

  },
  leaveDays: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.theme_secondary,
  },

  leaveApprovedBy: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.theme_secondary,
  },
});

export default ViewMyLeave;