import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ steps, currentStep }) => {
  return (
    <View>
      <View style={styles.container}>
        {steps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.step,
              {
                backgroundColor: index < currentStep ? '#007BFF' : '#E0E0E0', // Fill color for previous steps
                borderColor: index === currentStep ? '#007BFF' : '#E0E0E0', // Border for the current step
                borderWidth: index === currentStep ? 2 : 0, // Show border only for current step
              },
            ]}
          >
            <Text
              style={[
                styles.stepText,
                { color: index < currentStep ? 'white' : '#2E2E2E' }, // White color for filled steps
              ]}
            >
              {index + 1}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.labelsContainer}>
        {steps.map((step, index) => (
          <Text
            key={index}
            style={[
              styles.label,
              { color: index < currentStep ? '#007BFF' : '#2E2E2E' }, // Color for completed steps
            ]}
          >
            {step}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginVertical: 10,
    justifyContent: 'space-between',
  },
  step: {
    flex: 1,
    height: 30,
    marginHorizontal: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  label: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default ProgressBar;
