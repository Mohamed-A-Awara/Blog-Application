import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { notifyError } from "../../Components/Notify";
import Api from "../../Config/api";

export const fetchUserBlogs = createAsyncThunk(
    "user/fetchUserBlogs",
    async (_, thunkApi) => {
        try {
        let user = await Api.get("/blog");
        return user.data;
        } catch (error) {
            const errMsg =
                error?.response?.data?.message || error?.response?.data?.error;
            console.log(errMsg);
            // notifyError(errMsg)
        return thunkApi.rejectWithValue(errMsg);
        }
    }
);

export const fetchAdminBlogs = createAsyncThunk(
    "user/fetchAdminBlogs",
    async (_, thunkApi) => {
        try {
        let user = await Api.get("/blog/allblogs");
        return user.data;
        } catch (error) {
            const errMsg =
                error?.response?.data?.message || error?.response?.data?.error;
            console.log(errMsg);
            // notifyError(errMsg)
        return thunkApi.rejectWithValue(errMsg);
        }
    }
);

export const Blogs = createSlice({
    name: "blogs",
    initialState: {
        data: [],
        allData :[],
        isLogin: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserBlogs.fulfilled, (state, action) => {
        state.data = action.payload;
        });
        // Handle Admin
        builder.addCase(fetchAdminBlogs.fulfilled, (state , action) => {
            state.allData =action.payload ;
        });
    },
});

// Action creators are generated for each case reducer function
// export const { } = user.actions;

export default Blogs.reducer;
