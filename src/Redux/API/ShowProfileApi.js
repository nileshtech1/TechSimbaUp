import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL, Show_Profile_Url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Show_Profile_Url}`;

export const ShowProfileApi = createAsyncThunk(
  'ShowProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('Token');
      const newtoken = JSON.parse(token); // Parse if the token is stringified JSON

      const headers = {
        Authorization: `Bearer ${newtoken}`,
      };

      const response = await axios.get(url, { headers }); // Correct usage of headers
      return response.data;
    } catch (error) {
      Alert.alert('', 'Invalid Credentials');
      console.error('Error during API call:', error);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);
