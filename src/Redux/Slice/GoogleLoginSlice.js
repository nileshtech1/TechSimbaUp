import { GoogleLoginApi } from '../API/GoogleLoginApi';

const {createSlice} = require('@reduxjs/toolkit');

const GoogleLoginSlice = createSlice({
  name: 'GoogleLogin',
  initialState: {
    GoogleLoading: false,
    isError: false,
    isLoggedin: false,
    GoogleLoginData: [],
  },
//   reducers: {
//     Logout: state => {
//       state.isLoggedin = false;
//       AsyncStorage.removeItem('LoginSuccess');
//       AsyncStorage.removeItem('session'); 
//       AsyncStorage.removeItem("GoogleLoginData");
//       AsyncStorage.removeItem("Token");
//       AsyncStorage.removeItem("Id");
//     },
//   },

  extraReducers: builder => {
    builder.addCase(GoogleLoginApi.pending, (state, action) => {
      state.GoogleLoading = true;
    });
    builder.addCase(GoogleLoginApi.fulfilled, (state, action) => {

      state.GoogleLoading = false;
      state.GoogleLoginData = action.payload;
      state.isLoggedin = true;
    });
    builder.addCase(GoogleLoginApi.rejected, (state, action) => {

      state.GoogleLoading = false;
      state.isError = true;
    });
  },
});

// Export the actions
// export const {Logout} = GoogleLoginSlice.actions;

// Export the reducer
export default GoogleLoginSlice.reducer;
