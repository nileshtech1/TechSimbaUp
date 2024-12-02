import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Modal,
  Button,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const CreateLeave = ({ navigation }) => {
  const [subject, setSubject] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [description, setDescription] = useState('');
  const [fromVisible, setFromVisible] = useState(false);
  const [toVisible, setToVisible] = useState(false);

  const openFromDatePicker = () => setFromVisible(true);
  const openToDatePicker = () => setToVisible(true);

  const closeFromDatePicker = () => setFromVisible(false);
  const closeToDatePicker = () => setToVisible(false);

  const handleFromDateSelect = (date) => {
    setFromDate(moment(date).format('YYYY-MM-DD')); // Format date to 'YYYY-MM-DD'
    closeFromDatePicker();
  };

  const handleToDateSelect = (date) => {
    setToDate(moment(date).format('YYYY-MM-DD')); // Format date to 'YYYY-MM-DD'
    closeToDatePicker();
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
        <Text style={styles.label}>From</Text>
        <TextInput
          value={fromDate}
          style={styles.input}
          placeholder="Select from date"
          onFocus={openFromDatePicker}
        />

        {/* To Date Field */}
        <Text style={styles.label}>To</Text>
        <TextInput
          value={toDate}
          style={styles.input}
          placeholder="Select to date"
          onFocus={openToDatePicker}
        />

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

        {/* From Date Picker Modal */}
        <Modal visible={fromVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <CalendarPicker
                onDateChange={handleFromDateSelect}
                selectedDayColor="#007BFF"
                selectedDayTextColor="#fff"
              />
              <View style={styles.buttonContainer}>
                <Button title="Close" onPress={closeFromDatePicker} />
              </View>
            </View>
          </View>
        </Modal>

        {/* To Date Picker Modal */}
        <Modal visible={toVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <CalendarPicker
                onDateChange={handleToDateSelect}
                selectedDayColor="#007BFF"
                selectedDayTextColor="#fff"
              />
              <View style={styles.buttonContainer}>
                <Button title="Close" onPress={closeToDatePicker} />
              </View>
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default CreateLeave;
