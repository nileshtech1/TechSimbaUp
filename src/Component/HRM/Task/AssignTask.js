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
import DropDownPicker from 'react-native-dropdown-picker';
import CalendarPicker from 'react-native-calendar-picker';
import DocumentPicker from 'react-native-document-picker';

const AssignTask = ({ navigation }) => {
  const [assignee, setAssignee] = useState('');
  const [assigneeOpen, setAssigneeOpen] = useState(false);
  const [assigneeOptions, setAssigneeOptions] = useState([
    { label: 'John Doe', value: 'John Doe' },
    { label: 'Jane Smith', value: 'Jane Smith' },
    { label: 'Alice Johnson', value: 'Alice Johnson' },
    { label: 'Bob Brown', value: 'Bob Brown' },

  ]);

  const [projectName, setProjectName] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
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
    // Add further submission logic here
  };

  return (
    <View>
      <Text style={styles.label}>Assign To</Text>
      <DropDownPicker
        open={assigneeOpen}
        value={assignee}
        items={assigneeOptions}
        setOpen={setAssigneeOpen}
        setValue={setAssignee}
        setItems={setAssigneeOptions}
        searchable={true}
        placeholder="Select Assignee"
        style={styles.dropdown}
        containerStyle={{ marginBottom: 15 }}
        dropDownContainerStyle={{ borderColor: '#ccc' }}
      />

      <Text style={styles.label}>Project Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Project Name"
        value={projectName}
        onChangeText={setProjectName}
      />

      <Text style={styles.label}>Deadline Date</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowCalendar(true)}>
        <Text style={{ color: deadlineDate ? '#000' : '#aaa' }}>
          {deadlineDate || 'Select Deadline Date'}
        </Text>
      </TouchableOpacity>
      {showCalendar && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.calendarContainer}>
              <CalendarPicker
                onDateChange={(date) => {
                  setDeadlineDate(date.format('YYYY-MM-DD'));
                  setShowCalendar(false);
                }}
              />
              <TouchableOpacity onPress={() => setShowCalendar(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 30,
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
  dropdown: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AssignTask;
