import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import EmployeeDetails from './MultiStepForm/EmployeeDetails';
import WorkDetails from './MultiStepForm/WorkDetails';
import JobDetails from './MultiStepForm/JobDetails';
import Compensation from './MultiStepForm/Compensation';
import ProgressBar from '../../../ReusableComponent/Progressbar';

const CreateEmployee = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const steps = ['Employee', 'Job', 'Work', 'Compensation'];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Add your submission logic here
    console.log('Form Submitted');
    navigation.goBack(); // Navigate back after submission
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EmployeeDetails nextStep={handleNext} progress={step} />;
      case 2:
        return <JobDetails nextStep={handleNext} prevStep={handlePrevious} progress={step} />;
      case 3:
        return <WorkDetails nextStep={handleNext} prevStep={handlePrevious} progress={step} />;

      case 4:
        return <Compensation prevStep={handlePrevious} progress={step} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar steps={steps} currentStep={step} />
      <View style={styles.stepContainer}>{renderStep()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, justifyContent: 'center', backgroundColor : '#ffffff' },
  stepContainer: { flex: 1, padding: 10 },
});

export default CreateEmployee;
