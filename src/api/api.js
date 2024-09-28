import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const REGISTER_URL = import.meta.env.VITE_API_REGISTER_URL;
const LOGIN_URL = import.meta.env.VITE_API_LOGIN_URL;
const LOGOUT_URL = import.meta.env.VITE_API_LOGOUT_URL;
const USER_URL = import.meta.env.VITE_API_USER_URL;

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const determineRole = (email) => {
  const adminEmail = import.meta.env.REACT_APP_ADMIN_EMAIL; 
  return email === adminEmail ? "admin" : "user";
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(REGISTER_URL, userData);
      const role = determineRole(userData.email);
      const userInfo = { ...data, role };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", role);
      toast.success("Регистрация прошла успешно!");
      return userInfo;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Не удалось зарегистрироваться";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post(LOGIN_URL, loginData);

      if (response.status === 200 || response.status === 201) {
        const { email, token } = response.data;
        const role = determineRole(email);
        const userInfo = { email, token, role };

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", role);

        toast.success("Вход выполнен успешно!");
        return userInfo;
      } else {
        throw new Error("Ошибка входа");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Не удалось войти";
      toast.error("Ошибка входа: " + errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post(LOGOUT_URL);
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userRole");
      toast.success("Вы успешно вышли из системы");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Не удалось выйти";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);


export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(USER_URL);
      return data; // Возвращаем массив пользователей
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Не удалось получить пользователей";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`${USER_URL}/${userId}`); // Предполагается, что DELETE работает по этому URL
      toast.success("Пользователь успешно удален!");
      return userId; // Возвращаем ID удаленного пользователя
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Не удалось удалить пользователя";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
