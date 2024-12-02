import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DocumentPicker from 'react-native-document-picker';
import SelectDropDown from '../../../ReusableComponent/SelectDropDown';
import moment from 'moment'; // Import moment for date formatting

const AssignTask = ({ navigation }) => {
  const [assignee, setAssignee] = useState('');
  const [assigneeOptions, setAssigneeOptions] = useState([
    { label: 'John Doe', value: 'John Doe' },
    { label: 'Jane Smith', value: 'Jane Smith' },
    { label: 'Alice Johnson', value: 'Alice Johnson' },
    { label: 'Bob Brown', value: 'Bob Brown' },
    { label: 'Bob Brow', value: 'Bob Brow' },
    { label: 'Bob Bro', value: 'Bob Bro' },
  ]);

  const [projectName, setProjectName] = useState('');
  const [deadlineDate, setDeadlineDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [file, setFile] = useState(null);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(result);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('File pick error:', err);
      }
    }
  };

  const handleSubmit = () => {
    const taskData = {
      assignee,
      projectName,
      deadlineDate,
      taskDescription,
      remarks,
      file,
    };
    console.log('Submitted Task Data:', taskData);
    navigation.navigate('Task List');
    // Add further submission logic here
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Assign Task</Text>
      <SelectDropDown
        label="Assign To"
        options={assigneeOptions}
        selectedValue={assignee}
        onSelect={setAssignee}
        placeholder="Select Assignee"
      />

      <Text style={styles.label}>Project Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Project Name"
        value={projectName}
        onChangeText={setProjectName}
      />

      <Text style={styles.label}>Deadline Date</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: deadlineDate ? '#000' : '#aaa' }}>
          {deadlineDate ? moment(deadlineDate).format('YYYY-MM-DD') : 'Select Deadline Date'}
        </Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={showDatePicker}
        date={deadlineDate || new Date()}
        mode="date"
        onConfirm={(date) => {
          setDeadlineDate(date);
          setShowDatePicker(false);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />

      <Text style={styles.label}>Upload Files</Text>
      <TouchableOpacity style={styles.button} onPress={handleFilePick}>
        <Text style={styles.buttonText}>Pick File</Text>
      </TouchableOpacity>
      {file && <Text style={styles.fileName}>{file.name}</Text>}

      <Text style={styles.label}>Task Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter Task Description"
        multiline
        value={taskDescription}
        onChangeText={setTaskDescription}
      />

      <Text style={styles.label}>Remarks</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter Remarks"
        multiline
        value={remarks}
        onChangeText={setRemarks}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
    height: 50,
    justifyContent: 'center',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 0.2,
  },
  buttonText: {
    color: '#aaa',
    fontWeight: 'bold',
  },
  fileName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AssignTask;
