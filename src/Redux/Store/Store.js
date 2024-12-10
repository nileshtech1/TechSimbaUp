import { configureStore } from "@reduxjs/toolkit";
import GoogleLoginReducer from "../Slice/GoogleLoginSlice";
import ShowProfileReducer from "../Slice/ShowProfileSlice";
import PostLeaveReducer from "../Slice/PostLeaveSlice";
import GetLeaveReducer from "../Slice/GetLeaveSlice";
import EditLeaveReducer from "../Slice/EditLeaveSlice";

export const store = configureStore({
    reducer : {
        GoogleLogin : GoogleLoginReducer,
        ShowProfile : ShowProfileReducer,
        PostLeave : PostLeaveReducer,
        GetLeave : GetLeaveReducer,
        EditLeave : EditLeaveReducer,
    }
})