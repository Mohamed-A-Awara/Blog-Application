import { configureStore } from "@reduxjs/toolkit";
import user from "./Reducers/user";
import blogs from "./Reducers/blogs";

export const store = configureStore({
    reducer: {
        user ,
        blogs
    },
});
