import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "../../api/api";

const initialState = {
	isAuthenticated: false,
	isLoading: false,
	error: null,
	role: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.error = null; 
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.isAuthenticated = true;
				state.isLoading = false;
				state.role = payload.role; 
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload || "Ошибка регистрации";
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.isAuthenticated = true;
				state.isLoading = false;
				state.role = payload.role; 
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload || "Ошибка входа"; 
			})
			.addCase(logoutUser.pending, (state) => {
				state.isLoading = true;
				state.error = null; 
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.isLoading = false;
				state.role = null; 
			})
			.addCase(logoutUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload || "Ошибка выхода";
			});
	},
});

export default authSlice;
