import { createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest, deleteRequest, patchRequest } from "../request/request";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRequest.fulfilled, (state, { payload }) => {
        state.todos = payload;
        state.isLoading = false;
      })
      .addCase(getRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      })
      .addCase(postRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postRequest.fulfilled, (state, { payload }) => {
        state.todos = [...state.todos, payload];
        state.isLoading = false;
      })
      .addCase(postRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRequest.fulfilled, (state, { payload }) => {
        state.todos = state.todos.filter((todo) => todo.id !== payload);
        state.isLoading = false;
      })
      .addCase(deleteRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      })
      .addCase(patchRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(patchRequest.fulfilled, (state, { payload }) => {
        state.todos = state.todos.map((todo) =>
          todo.id === payload.id ? payload : todo
        );
        state.isLoading = false;
      })
      .addCase(patchRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      });
  },
});


export default todoSlice;