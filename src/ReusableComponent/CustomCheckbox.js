import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomCheckbox = ({ isChecked, onToggle, label }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onToggle}>
            <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]} />
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        backgroundColor: '#fff',
    },
    checkedCheckbox: {
        backgroundColor: '#007BFF',
    },
    label: {
        fontSize: 16,
    },
});

export default CustomCheckbox;
