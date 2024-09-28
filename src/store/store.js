import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice/todoSlice";
import authSlice from "./authSlice/authSlice";
import adminSlice from "./adminSlice/adminSlice";
const store = configureStore({
    reducer: {
      [todoSlice.name]: todoSlice.reducer,
      [authSlice.name]: authSlice.reducer,
      [adminSlice.name]: adminSlice.reducer,
    },
});

export default store;