import { GetLeaveApi } from '../API/GetLeaveApi';

const {createSlice} = require('@reduxjs/toolkit');

const GetLeaveSlice = createSlice({
  name: 'GetLeave',
  initialState: {
    ProfileLoading: false,
    isError: false,
    GetLeaveData: [],
  },
  extraReducers: builder => {
    builder.addCase(GetLeaveApi.pending, (state, action) => {
      state.ProfileLoading = true;
    });
    builder.addCase(GetLeaveApi.fulfilled, (state, action) => {
      state.ProfileLoading = false;
      state.GetLeaveData = action.payload;
    //   console.log(action.payload, 'Get payload');
    });
    builder.addCase(GetLeaveApi.rejected, (state, action) => {
      state.ProfileLoading = false;
      state.isError = true;
    });
  },
});

export default GetLeaveSlice.reducer;
