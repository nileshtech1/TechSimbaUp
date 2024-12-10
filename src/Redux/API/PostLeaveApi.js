import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL, Post_Leave_url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Post_Leave_url}`;

export const PostLeaveApi = createAsyncThunk(
  'PostLeave',
  async (PostData, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('Token');
      const newtoken = JSON.parse(token); // Parse if the token is stringified JSON

      const headers = {
        Authorization: `Bearer ${newtoken}`,
      };

      const response = await axios.post(url, PostData, { headers }); // Correct usage of headers
      const result = response.data;

      return result;
    } catch (error) {
      Alert.alert('', 'Invalid Credentials');
      console.error('Error during API call:', error);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);
