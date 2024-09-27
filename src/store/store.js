import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice/todoSlice";
import authSlice from "./authSlice/authSlice";

const store = configureStore({
    reducer: {
      [todoSlice.name]: todoSlice.reducer,
      [authSlice.name]: authSlice.reducer,
    },
});

export default store;