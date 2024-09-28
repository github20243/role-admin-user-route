import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const REGISTER_URL = import.meta.env.VITE_API_REGISTER_URL;
const LOGIN_URL = import.meta.env.VITE_API_LOGIN_URL;
const LOGOUT_URL = import.meta.env.VITE_API_LOGOUT_URL;

// Создаем экземпляр axios
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
      const { email, password } = loginData;
      const adminEmail = import.meta.env.REACT_APP_ADMIN_EMAIL;
      const adminPassword = import.meta.env.REACT_APP_ADMIN_PASSWORD;

      // Проверка для администратора
      if (email === adminEmail) {
        if (password === adminPassword) {
          const userInfo = { email, role: 'admin' };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          localStorage.setItem("token", "admin_token"); // Используйте реальный токен в продакшене
          localStorage.setItem("isAuthenticated", "true");
          toast.success("Вход администратора выполнен успешно!");
          return userInfo;
        } else {
          throw new Error("Неверный пароль для администратора");
        }
      }

      // Запрос для обычных пользователей
      console.log('Отправка запроса на:', LOGIN_URL);
      const response = await api.post(LOGIN_URL, loginData);
      console.log('Ответ сервера:', response.data);
      const role = determineRole(email);
      const userInfo = { ...response.data, role };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Вход выполнен успешно!");
      return userInfo;
    } catch (error) {
      console.error('Ошибка при входе:', error);
      const errorMessage = error.response?.data?.message || error.message || "Не удалось войти";
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
      toast.success("Вы успешно вышли из системы");
    } catch (error) {
      console.error("Ошибка выхода:", error);
      const errorMessage = error.response?.data?.message || "Не удалось выйти";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);