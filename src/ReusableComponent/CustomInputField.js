import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInputField = ({ label, value, onChangeText, placeholder, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* Label with optional required asterisk */}
      <Text style={[styles.label, isFocused || value ? styles.labelFocused : styles.labelBlurred]}>
        {label} 
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        style={[styles.input, isFocused && styles.focusedBorder]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#999',
  },
  labelFocused: {
    color: '#000', // Darker label color when focused
    fontWeight: 'bold',
  },
  labelBlurred: {
    color: '#000000', // Default label color
    fontWeight: 'bold',
  },
  required: {
    color: 'red', // Red asterisk for required fields
  },
  input: {
    height: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
  },
  focusedBorder: {
    borderColor: '#000', // Darker border when focused
  },
});

export default CustomInputField;
