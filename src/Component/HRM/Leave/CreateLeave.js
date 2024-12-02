import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Button,
} from 'react-native';
import DatePicker from 'react-native-date-picker'; // Correct import
import moment from 'moment';

const CreateLeave = ({ navigation }) => {
  const [subject, setSubject] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [description, setDescription] = useState('');
  const [showFromDatePicker, setShowFromDatePicker] = useState(false); // state for from date picker visibility
  const [showToDatePicker, setShowToDatePicker] = useState(false); // state for to date picker visibility

  const handleFromDateChange = (date) => {
    setFromDate(moment(date).format('YYYY-MM-DD'));
    setShowFromDatePicker(false); // Hide the picker after selection
  };

  const handleToDateChange = (date) => {
    setToDate(moment(date).format('YYYY-MM-DD'));
    setShowToDatePicker(false); // Hide the picker after selection
  };

  const handleSubmit = () => {
    console.log({ description, fromDate, toDate, subject });
    navigation.navigate('Manage Leave');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Leave</Text>

        {/* Subject Field */}
        <Text style={styles.label}>Subject</Text>
        <TextInput
          value={subject}
          onChangeText={(text) => setSubject(text)}
          style={styles.input}
          placeholder="Enter subject"
        />

        {/* From Date Field */}
        <Text style={styles.label}>From Date</Text>
        <TextInput
          value={fromDate}
          style={styles.input}
          placeholder="Select from date"
          onFocus={() => setShowFromDatePicker(true)} // show date picker on focus
        />
        {showFromDatePicker && (
          <DatePicker
            modal
            open={showFromDatePicker}
            date={fromDate ? new Date(fromDate) : new Date()}
            mode="date"
            onConfirm={handleFromDateChange}
            onCancel={() => setShowFromDatePicker(false)} // close date picker on cancel
          />
        )}

        {/* To Date Field */}
        <Text style={styles.label}>To Date</Text>
        <TextInput
          value={toDate}
          style={styles.input}
          placeholder="Select to date"
          onFocus={() => setShowToDatePicker(true)} // show date picker on focus
        />
        {showToDatePicker && (
          <DatePicker
            modal
            open={showToDatePicker}
            date={toDate ? new Date(toDate) : new Date()}
            mode="date"
            onConfirm={handleToDateChange}
            onCancel={() => setShowToDatePicker(false)} // close date picker on cancel
          />
        )}

        {/* Description Field */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={[styles.input, styles.textarea]}
          placeholder="Enter description"
          multiline
          numberOfLines={5}
        />

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  buttonContainer: {
    marginTop: 20,
  },
});

export default CreateLeave;
