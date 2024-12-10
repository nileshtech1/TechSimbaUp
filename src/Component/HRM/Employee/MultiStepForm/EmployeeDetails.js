import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ImagePicker from '../../../../ReusableComponent/ImagePicker';
import CustomCheckbox from '../../../../ReusableComponent/CustomCheckbox';
import CustomInputField from '../../../../ReusableComponent/CustomInputField';
import SelectDropDown from '../../../../ReusableComponent/SelectDropDown';
import Marquee from '../../../../ReusableComponent/Marquee';

const EmployeeDetails = ({nextStep, onSubmit }) => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState(new Date());
    const [contact, setContact] = useState('');
    const [alternateNumber, setAlternateNumber] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const genderOption = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
      ];
    const [currentAddress, setCurrentAddress] = useState({
        country: '',
        state: '',
        city: '',
        pincode: '',
        address: '',
    });
    const [permanentAddress, setPermanentAddress] = useState({
        country: '',
        state: '',
        city: '',
        pincode: '',
        address: '',
    });
    const [sameAsCurrent, setSameAsCurrent] = useState(false);

    const handleSameAsCurrent = () => {
        setSameAsCurrent(!sameAsCurrent);
        if (!sameAsCurrent) {
            setPermanentAddress(currentAddress);
        } else {
            setPermanentAddress({
                country: '',
                state: '',
                city: '',
                pincode: '',
                address: '',
            });
        }
    };

    const handleNext = () => {
        const employeeData = {
            firstName,
            middleName,
            lastName,
            gender,
            dob,
            contact,
            alternateNumber,
            personalEmail,
            workEmail,
            jobRole,
            profilePhoto,
            currentAddress,
            permanentAddress,
        };
        console.log(employeeData, 'emp');
        nextStep();
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
             <CustomInputField
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
        required={true}
      />
       <CustomInputField
        label="Middle Name (Optional)"
        value={middleName}
        onChangeText={setMiddleName}
        placeholder="Middle Name"
      />
        <CustomInputField
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
        required={true}
      />
      <SelectDropDown
        label="Gender"
        options={genderOption}
        selectedValues={gender}
        onSelect={setGender}
        placeholder="Select Gender"
        isMultipleSelect={false}
        isRequired={true}
      />

            <Text style={styles.label}>Date of Birth<Text style={styles.required}> *</Text></Text>
            <TouchableOpacity style={styles.datePickerContainer} onPress={() => setIsDatePickerOpen(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="Select Date of Birth"
                    value={dob.toDateString()}
                    editable={false}
                    onPressIn={() => setIsDatePickerOpen(true)}
                />
                {/* <Button title="Pick Date" onPress={() => setIsDatePickerOpen(true)} /> */}
            </TouchableOpacity>

            <DatePicker
                modal
                open={isDatePickerOpen}
                date={dob}
                mode="date"
                onConfirm={(date) => {
                    setIsDatePickerOpen(false);
                    setDob(date);
                }}
                onCancel={() => {
                    setIsDatePickerOpen(false);
                }}
            />
             <CustomInputField
        label="Contact"
        value={contact}
        onChangeText={setContact}
        placeholder="Contact"
        required={true}
      />
       <CustomInputField
        label="Alernate Number"
        value={alternateNumber}
        onChangeText={setAlternateNumber}
        placeholder="Alernate Number"
        required={true}
      />
       <CustomInputField
        label="Personal Email"
        value={personalEmail}
        onChangeText={setPersonalEmail}
        placeholder="Personal Email"
        required={true}
      />
       <CustomInputField
        label="Work Email"
        value={workEmail}
        onChangeText={setWorkEmail}
        placeholder="Work Email"
        required={true}
      />
      <CustomInputField
        label="Job Role"
        value={jobRole}
        onChangeText={setJobRole}
        placeholder="Job Role"
        required={true}
      />
      
            <Text style={styles.label}>Profile Photo<Text style={styles.required}> *</Text></Text>
            <ImagePicker image={profilePhoto} onImageSelected={setProfilePhoto} />
            <Marquee text="Current Address" />

            {/* <Text style={styles.label1}>Current Address</Text> */}
            <CustomInputField
        label="Country"
        value={currentAddress.country}
        onChangeText={text => setCurrentAddress({ ...currentAddress, country: text })}
        placeholder="Country"
        required={true}
      />
       <CustomInputField
        label="State"
        value={currentAddress.state}
        onChangeText={text => setCurrentAddress({ ...currentAddress, state: text })}
        placeholder="State"
        required={true}
      />
       <CustomInputField
        label="City"
        value={currentAddress.city}
        onChangeText={text => setCurrentAddress({ ...currentAddress, city: text })}
        placeholder="City"
        required={true}
      />
       <CustomInputField
        label="Pincode"
        value={currentAddress.pincode}
        onChangeText={text => setCurrentAddress({ ...currentAddress, pincode: text })}
        placeholder="Pincode"
        required={true}
      />
      <CustomInputField
        label="Address"
        value={currentAddress.address}
        onChangeText={text => setCurrentAddress({ ...currentAddress, address: text })}
        placeholder="Address"
        required={true}
      />

            <CustomCheckbox
                label="Same as Current Address"
                isChecked={sameAsCurrent}
                onToggle={handleSameAsCurrent}
            />

            <Marquee text="Permanent Address" />
            <CustomInputField
        label="Country"
        value={permanentAddress.country}
        onChangeText={text => setPermanentAddress({ ...permanentAddress, country: text })}
        placeholder="Country"
        required={true}
      />
       <CustomInputField
        label="State"
        value={permanentAddress.state}
        onChangeText={text => setPermanentAddress({ ...permanentAddress, state: text })}
        placeholder="State"
        required={true}
      />
       <CustomInputField
        label="City"
        value={permanentAddress.city}
        onChangeText={text => setPermanentAddress({ ...permanentAddress, city: text })}
        placeholder="City"
        required={true}
      />
       <CustomInputField
        label="Pincode"
        value={permanentAddress.pincode}
        onChangeText={text => setPermanentAddress({ ...permanentAddress, pincode: text })}
        placeholder="Pincode"
        required={true}
      />
      <CustomInputField
        label="Address"
        value={permanentAddress.address}
        onChangeText={text => setPermanentAddress({ ...permanentAddress, address: text })}
        placeholder="Address"
        required={true}
      />

                <View style={styles.navigationButtons}>
                    <Button title="Next" onPress={handleNext} />
                </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        marginVertical: 5,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    label1 :{
        backgroundColor : '#D1D1D185',
        color : '#000000FF',
        padding : 10,
        fontWeight : 'bold',
        textAlign : 'center'
    },
    navigationButtons: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      required: {
        color: 'red', // Red asterisk for required fields
      },
});

export default EmployeeDetails;
