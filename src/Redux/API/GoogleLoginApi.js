
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL, Google_Login_Url } from '../NWConfig';

const url = `${BASE_URL}${Google_Login_Url}`;

export const GoogleLoginApi = createAsyncThunk(
  'Login',
  async (PostData) => {
    const header = {
        "Content-Type" : "application/json"
    }
    try {
      const response = await axios.post(url,PostData,{header});

      const result = response.data;
      console.log(result, 'result google login');
      return result;
    } catch (error) {
      Alert.alert('', "Invalid Crediential")
      // console.error('Error during API call', error);
      throw error;
    }
  }
);
