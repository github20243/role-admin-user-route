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

const determineRole = (email, password) => {
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL; 
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD; 

  if (email === adminEmail && password === adminPassword) {
    return "admin";
  }
  return "user";
};

const setUserData = (userInfo) => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  localStorage.setItem("token", userInfo.token);
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("userRole", userInfo.role);
};

const clearUserData = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userRole");
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(REGISTER_URL, userData);
      const role = determineRole(userData.email, userData.password);
      const userInfo = { ...data, role };
      setUserData(userInfo);
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
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
        
        let role = "user";
        if (email === adminEmail && loginData.password === adminPassword) {
          role = "admin";
        }

        const userInfo = { email, token, role };

        setUserData(userInfo);
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
      clearUserData();
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
      const token = localStorage.getItem("token");
      const { data } = await api.get(USER_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!data || data.length === 0) {
        toast.error("Нет доступных пользователей");
        return rejectWithValue("Нет доступных пользователей");
      }

      return data;
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
      const token = localStorage.getItem("token");
      await api.delete(`${USER_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Пользователь успешно удален!");
      return userId;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Не удалось удалить пользователя";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
