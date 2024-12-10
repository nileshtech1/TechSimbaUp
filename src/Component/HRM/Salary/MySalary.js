import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Ensure you have react-native-vector-icons installed

const MySalary = ({ navigation }) => {
  // Mock salary data for a specific user
  const salaryData = [
    { id: '1', month: 'January', amount: '50,000', status: 'Paid' },
    { id: '2', month: 'February', amount: '50,000', status: 'Pending' },
    { id: '3', month: 'March', amount: '50,000', status: 'Paid' },
  ];

  // Dynamic styling for payment status
  const getStatusStyle = (status) => ({
    color: status === 'Paid' ? '#28a745' : '#dc3545',
    fontWeight: 'bold',
  });

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.month}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
      <Text style={[styles.cell, getStatusStyle(item.status)]}>{item.status}</Text>
      <TouchableOpacity
        style={styles.iconButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('SalaryDetails', { salaryId: item.id })}
      >
        <Icon name="eye" size={20} color="#007bff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={[styles.row, styles.header]}>
        <Text style={styles.headerText}>MONTH</Text>
        <Text style={styles.headerText}>AMOUNT</Text>
        <Text style={styles.headerText}>STATUS</Text>
        <Text style={styles.headerText}>VIEW</Text>
      </View>

      {/* List of Monthly Salaries */}
      <FlatList
        data={salaryData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    marginBottom: 15,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 15,
  },
  iconButton: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MySalary;
