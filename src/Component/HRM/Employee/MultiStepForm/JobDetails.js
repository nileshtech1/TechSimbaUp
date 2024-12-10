import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import SelectDropDown from '../../../../ReusableComponent/SelectDropDown';

const JobDetails = ({nextStep,prevStep, onSubmit }) => {
  const [workLocation, setWorkLocation] = useState(null);
  const [workCountry, setWorkCountry] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [timeType, setTimeType] = useState(null);
  const [joiningDate, setJoiningDate] = useState(new Date());
  const [workType, setWorkType] = useState(null);
  const [reportingManager, setReportingManager] = useState(null);
  const [reportingTeamLeader, setReportingTeamLeader] = useState(null);
  const [employeeStatus, setEmployeeStatus] = useState(null);
  const [probationPolicy, setProbationPolicy] = useState(null);
  const [remark, setRemark] = useState('');
  
  const [showJoiningDatePicker, setShowJoiningDatePicker] = useState(false);
  
  const handleNext = () => {
    console.log({
      workLocation,
      workCountry,
      jobTitle,
      timeType,
      joiningDate,
      workType,
      reportingManager,
      reportingTeamLeader,
      employeeStatus,
      probationPolicy,
      remark
    });
    nextStep()
  };

  const handlePrev = () =>{
    prevStep()
  }

  const handleJoiningDateChange = (date) => {
    setJoiningDate(date);
    setShowJoiningDatePicker(false);
  };

  // Static Data for SelectDropDown
  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'IN', label: 'India' },
    { value: 'CA', label: 'Canada' },
  ];

  const jobTitles = [
    { value: 'dev', label: 'Developer' },
    { value: 'mgr', label: 'Manager' },
    { value: 'qa', label: 'QA Engineer' },
  ];

  const timeTypes = [
    { value: 'full', label: 'Full-Time' },
    { value: 'part', label: 'Part-Time' },
  ];

  const workTypes = [
    { value: 'remote', label: 'Remote' },
    { value: 'onsite', label: 'Onsite' },
  ];

  const managers = [
    { value: 'john', label: 'John Doe' },
    { value: 'jane', label: 'Jane Smith' },
  ];

  const teamLeaders = [
    { value: 'mike', label: 'Mike Johnson' },
    { value: 'anna', label: 'Anna Brown' },
  ];

  const statuses = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const probationPolicies = [
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SelectDropDown
        label="Work Location"
        options={countries}
        selectedValues={workLocation}
        onSelect={setWorkLocation}
        placeholder="Select Work Location"
        isMultipleSelect={false}
        isRequired={true}
      />
      <SelectDropDown
        label="Work Country"
        options={countries}
        selectedValues={workCountry}
        onSelect={setWorkCountry}
        placeholder="Select Work Country"
        isMultipleSelect={false}
      />
      <SelectDropDown
        label="Job Title"
        options={jobTitles}
        selectedValues={jobTitle}
        onSelect={setJobTitle}
        placeholder="Select Job Title"
        isMultipleSelect={false}
        isRequired={true}
      />
      <SelectDropDown
        label="Time Type"
        options={timeTypes}
        selectedValues={timeType}
        onSelect={setTimeType}
        placeholder="Select Time Type"
        isMultipleSelect={false}
      />
     <Text style={styles.label}>Joining Date<Text style={styles.required}> *</Text></Text>
      <TouchableOpacity onPress={() => setShowJoiningDatePicker(true)} style={styles.input}>
        <Text style={styles.inputText}>{joiningDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showJoiningDatePicker && (
        <DatePicker
          modal
          open={showJoiningDatePicker}
          date={joiningDate}
          mode="date"
          onConfirm={handleJoiningDateChange}
          onCancel={() => setShowJoiningDatePicker(false)}
        />
      )}

      <SelectDropDown
        label="Work Type"
        options={workTypes}
        selectedValues={workType}
        onSelect={setWorkType}
        placeholder="Select Work Type"
        isMultipleSelect={false}
      />
      <SelectDropDown
        label="Reporting Manager"
        options={managers}
        selectedValues={reportingManager}
        onSelect={setReportingManager}
        placeholder="Select Reporting Manager"
        isMultipleSelect={false}
      />
      <SelectDropDown
        label="Reporting Team Leader"
        options={teamLeaders}
        selectedValues={reportingTeamLeader}
        onSelect={setReportingTeamLeader}
        placeholder="Select Reporting Team Leader"
        isMultipleSelect={false}
      />
      <SelectDropDown
        label="Employee Status"
        options={statuses}
        selectedValues={employeeStatus}
        onSelect={setEmployeeStatus}
        placeholder="Select Employee Status"
        isMultipleSelect={false}
        isRequired={true}
      />
      <SelectDropDown
        label="Probation Policy"
        options={probationPolicies}
        selectedValues={probationPolicy}
        onSelect={setProbationPolicy}
        placeholder="Select Probation Policy"
        isMultipleSelect={false}
      />
     <Text style={styles.label}>Remark</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter Remark"
        multiline
        value={remark}
        onChangeText={setRemark}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor : '#fff',
    padding: 10,
    marginVertical: 10,
  },
  inputText: {
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor : '#fff',
    padding: 10,
    marginVertical: 10,
    height: 100,
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
  ButtonContainer : {
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
},
required: {
  color: 'red', // Red asterisk for required fields
},
});

export default JobDetails;
