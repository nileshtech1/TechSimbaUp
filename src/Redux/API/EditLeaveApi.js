import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL, Update_Leave_url } from '../NWConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = `${BASE_URL}${Update_Leave_url}`;

export const EditLeaveApi = createAsyncThunk(
  'EditLeave',
  async (PostData, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('Token');
        const newtoken = JSON.parse(token); // Parse if the token is stringified JSON
        console.log(newtoken, 'newToken');
        const User = await AsyncStorage.getItem('User');
        const Userjson = JSON.parse(User); // Parse if the token is stringified JSON
        console.log(Userjson, 'userr');
        const id = Userjson.id;
        const role_id = Userjson?.role_id
       console.log(url + id);

      const headers = {
        Authorization: `Bearer ${newtoken}`,
      };

      const response = await axios.post(url + id, PostData, { headers }); // Correct usage of headers
      const result = response.data;
      console.log(response.data, 'Edit leave data response');

      return result;
    } catch (error) {
      Alert.alert('', 'Invalid Edit Leave Data');
      console.error('Error during API call:', error);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);
