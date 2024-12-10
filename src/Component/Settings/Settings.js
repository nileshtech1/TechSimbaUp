import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigator from '../../Route/DrawerRoute';

const names = ['Employee', 'Task', 'AttendanceRecords'];

const Settings = ({navigation}) => {
  const [states, setStates] = useState({});

  useEffect(() => {
    // Load initial states for all names from AsyncStorage
    const fetchStates = async () => {
      try {
        const loadedStates = {};
        for (const name of names) {
          const storedState = await AsyncStorage.getItem(`state_${name}`);
          loadedStates[name] = storedState ? JSON.parse(storedState) : false;
        }
        setStates(loadedStates);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  const toggleState = async (name) => {
    try {
      const newStates = { ...states, [name]: !states[name] };
      setStates(newStates);
  
      // Pass newStates as a parameter while navigating to the DrawerNavigator
      navigation.navigate('DrawerNavigator', { states: newStates });
  
      await AsyncStorage.setItem(`state_${name}`, JSON.stringify(newStates[name]));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  };
  

  const renderItem = ({ item: name }) => (
    <View style={styles.box}>
      <Text style={styles.name}>Active {name}</Text>
      <Switch
        value={states[name]}
        onValueChange={() => toggleState(name)}
        thumbColor={states[name] ? '#4caf50' : '#f4f4f4'}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={names}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  list: {
    paddingBottom: 20,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    borderWidth : 0.5,
    borderColor : '#757575E8'
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Settings;
