import { PostLeaveApi } from '../API/PostLeaveApi';

const {createSlice} = require('@reduxjs/toolkit');

const PostLeaveSlice = createSlice({
  name: 'PostLeave',
  initialState: {
    ProfileLoading: false,
    isError: false,
    isLoggedin: false,
    PostLeaveData: [],
  },
  extraReducers: builder => {
    builder.addCase(PostLeaveApi.pending, (state, action) => {
      state.ProfileLoading = true;
    });
    builder.addCase(PostLeaveApi.fulfilled, (state, action) => {
      state.ProfileLoading = false;
      state.PostLeaveData = action.payload;
      state.isLoggedin = true;
    });
    builder.addCase(PostLeaveApi.rejected, (state, action) => {
      state.ProfileLoading = false;
      state.isError = true;
    });
  },
});

export default PostLeaveSlice.reducer;
