import { ShowProfileApi } from '../API/ShowProfileApi';

const {createSlice} = require('@reduxjs/toolkit');

const ShowProfileSlice = createSlice({
  name: 'ShowProfile',
  initialState: {
    ProfileLoading: false,
    isError: false,
    isLoggedin: false,
    ProfileData: [],
  },
  extraReducers: builder => {
    builder.addCase(ShowProfileApi.pending, (state, action) => {
      state.ProfileLoading = true;
    });
    builder.addCase(ShowProfileApi.fulfilled, (state, action) => {
      state.ProfileLoading = false;
      state.ProfileData = action.payload;
      state.isLoggedin = true;
    });
    builder.addCase(ShowProfileApi.rejected, (state, action) => {
      state.ProfileLoading = false;
      state.isError = true;
    });
  },
});

export default ShowProfileSlice.reducer;
