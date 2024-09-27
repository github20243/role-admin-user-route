import axios from "axios";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";

const REGISTER_URL = import.meta.env.VITE_API_REGISTER_URL;
const LOGIN_URL = import.meta.env.VITE_API_LOGIN_URL;
const LOGOUT_URL = import.meta.env.VITE_API_LOGOUT_URL;


const determineRole = (email) => {
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
  if (email === adminEmail) {
    return "admin";
  }
  return "user";
};


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(REGISTER_URL, userData);
      const role = determineRole(userData.email);
      toast.success("Регистрация прошла успешно!");
      return { ...data, role };
    } catch (error) {
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const { email, password } = loginData;
      const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
      const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

      // Проверьте правильность пароля администратора
      if (email === adminEmail && password !== adminPassword) {
        throw new Error("Неверный пароль для администратора");
      }

      const { data } = await axios.post(LOGIN_URL, loginData);
      const role = determineRole(email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Вход выполнен успешно!");
      return { ...data, role }; 
    } catch (error) {
      toast.error("Не удалось войти: " + error.message);
      return rejectWithValue(error.message);
    }
  }
);




export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(LOGOUT_URL);
      localStorage.removeItem("token");
      localStorage.setItem("isAuthenticated", "false");
      toast.success("Вы успешно вышли из системы");
    } catch (error) {
      console.error("Ошибка выхода:", error);
      toast.error("Не удалось выйти");
      return rejectWithValue(error.message);
    }
  }
);
