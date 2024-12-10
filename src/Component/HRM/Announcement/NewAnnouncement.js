import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import SelectDropDown from '../../../ReusableComponent/SelectDropDown';

const NewAnnouncement = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [Employee, setEmployee] = useState([]);
  const [assigneeOptions, setAssigneeOptions] = useState([
    { label: 'John Doe', value: 'John Doe' },
    { label: 'Jane Smith', value: 'Jane Smith' },
    { label: 'Alice Johnson', value: 'Alice Johnson' },
    { label: 'Bob Brown', value: 'Bob Brown' },
    { label: 'Bob Brow', value: 'Bob Brow' },
    { label: 'Bob Bro', value: 'Bob Bro' },
  ]);

  const handleToDateChange = (date) => {
    setDeadlineDate(moment(date).format('YYYY-MM-DD'));
    setShowToDatePicker(false); 
  };

  const handleSubmit = () => {
    navigation.navigate('Announcement List');
    const Data = {
      title,
      description,
      deadlineDate
    }
    // console.log('Data:', Data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Announcement</Text>
      <SelectDropDown
         label="Select Employee"
         options={assigneeOptions}
         selectedValue={Employee}
         onSelect={setEmployee}
         placeholder="Select Employee"
        isMultipleSelect={true}
        isRequired={true}
      />


      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowToDatePicker(true)}>
        <Text style={{ color: deadlineDate ? '#000' : '#aaa' }}>
          {deadlineDate ? moment(deadlineDate).format('YYYY-MM-DD') : 'Select Date'}
        </Text>
      </TouchableOpacity>

      {/* DatePicker Modal */}
      {showToDatePicker && (
        <DatePicker
          modal
          open={showToDatePicker}
          date={deadlineDate ? new Date(deadlineDate) : new Date()}
          mode="date"
          onConfirm={handleToDateChange}
          onCancel={() => setShowToDatePicker(false)} 
        />
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline={true}
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewAnnouncement;
