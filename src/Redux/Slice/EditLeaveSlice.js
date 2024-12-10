import { EditLeaveApi } from '../API/EditLeaveApi';
const {createSlice} = require('@reduxjs/toolkit');

const EditLeaveSlice = createSlice({
  name: 'EditLeave',
  initialState: {
    EditLeaveLoading: false,
    isError: false,
    EditLeaveData: [],
  },
  extraReducers: builder => {
    builder.addCase(EditLeaveApi.pending, (state, action) => {
      state.EditLeaveLoading = true;
    });
    builder.addCase(EditLeaveApi.fulfilled, (state, action) => {
      state.EditLeaveLoading = false;
      state.EditLeaveData = action.payload;
    });
    builder.addCase(EditLeaveApi.rejected, (state, action) => {
      state.EditLeaveLoading = false;
      state.isError = true;
    });
  },
});

export default EditLeaveSlice.reducer;
