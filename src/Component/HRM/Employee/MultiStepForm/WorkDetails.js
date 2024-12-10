import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import SelectDropDown from '../../../../ReusableComponent/SelectDropDown';
import CustomInputField from '../../../../ReusableComponent/CustomInputField';

const WorkDetails = ({nextStep, prevStep, onSubmit}) => {
  const [OnboardingSettings, setOnboardingSettings] = useState(null);
  const [Shift, setShift] = useState(null);
  const [AttendanceNumber, setAttendanceNumber] = useState(null);
  const [Department, setDepartment] = useState(null);

  const handleNext = () => {
    console.log({
      OnboardingSettings,
      Shift,
      AttendanceNumber,
      Department,
    });
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  // Static Data for SelectDropDown
  const OnboardingSettingsOptions = [
    {value: 'As per company norms', label: 'As per company norms'},
  ];

  const ShiftOptions = [
    {value: '12:00 PM - 08:00 PM', label: '12:00 PM - 08:00 PM'},
    {value: '10:00 AM - 07:00 PM', label: '10:00 AM - 07:00 PM'},
  ];

  const DepartmentOptions = [
    {value: 'Project Management', label: 'Project Management'},
    {value: 'Buisness Analysis', label: 'Buisness Analysis'},
    {value: 'Finance & Accounting', label: 'Finance & Accounting'},
    {value: 'Human Resource (HR)', label: 'Human Resource (HR)'},
    {value: 'Sales & Marketing', label: 'Sales & Marketing'},
    {value: 'Network Administration', label: 'Network Administration'},
    {value: 'Software Development', label: 'Software Development'},
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SelectDropDown
        label="Onboarding Settings"
        options={OnboardingSettingsOptions}
        selectedValues={OnboardingSettings}
        onSelect={setOnboardingSettings}
        placeholder="Select Onboarding Settings"
        isMultipleSelect={false}
        isRequired={true}
      />
      <SelectDropDown
        label="Shift"
        options={ShiftOptions}
        selectedValues={Shift}
        onSelect={setShift}
        placeholder="Select Shift"
        isMultipleSelect={false}
      />
      <CustomInputField
        label="Attendance Number"
        value={AttendanceNumber}
        onChangeText={setAttendanceNumber}
        placeholder="Attendance Number"
        required={true}
      />
      <SelectDropDown
        label="Department"
        options={DepartmentOptions}
        selectedValues={Department}
        onSelect={setDepartment}
        placeholder="Select Department"
        isMultipleSelect={false}
        isRequired={true}
      />

      <View style={styles.ButtonContainer}>
        <TouchableOpacity onPress={handlePrev} style={styles.nextButton}>
          <Text style={styles.buttonText}>previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  required: {
    color: 'red', // Red asterisk for required fields
  },
});

export default WorkDetails;
