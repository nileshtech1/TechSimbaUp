import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import VectorIcon from '../../../Icon/VectorIcon';
import { tasks } from '../../../Assets/StaticData/Data';

const TaskList = ({ navigation }) => {
  // Handle Edit task
  const handleEdit = (taskId) => {
    navigation.navigate('EditTask', { taskId });
  };

  // Handle Delete task
  const handleDelete = (taskId) => {
    console.log('Delete Task:', taskId);
  };

  // Handle View task details
  const handleView = (task) => {
    navigation.navigate('TaskDetails', { task });
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskName}>{item.projectName}</Text>
        <Text style={styles.taskDescription}>
          Assigned to: {item.assignee}
        </Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => handleView(item)}>
          <VectorIcon icon='Feather' name="eye" size={21} color="#007BFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEdit(item.id)}>
          <VectorIcon icon='Feather' name="edit" size={21} color="#28a745" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <VectorIcon icon='Feather' name="trash" size={21} color="#FF0000" style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  taskInfo: {
    flex: 1,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#777',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 80,
  },
  deleteIcon: {
    // marginLeft: 10,
  },
});

export default TaskList;
