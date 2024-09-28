import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export const getRequest = createAsyncThunk(
  "todo/getRequest",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      toast.error("Ошибка при получении данных");
      return rejectWithValue(error.message);
    }
  }
);

export const postRequest = createAsyncThunk(
  "todo/postRequest",
  async (value, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(API_URL, value);
      dispatch(getRequest());
      toast.success("Задача успешно добавлена");
      return response.data;
    } catch (error) {
      toast.error("Ошибка при добавлении задачи");
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRequest = createAsyncThunk(
  "todo/deleteRequest",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch(getRequest());
      toast.success("Задача успешно удалена");
      return id;
    } catch (error) {
      toast.error("Ошибка при удалении задачи");
      return rejectWithValue(error.message);
    }
  }
);

export const patchRequest = createAsyncThunk(
  "todo/patchRequest",
  async (param, { rejectWithValue, dispatch }) => {
    try {
      const { id, ...rest } = param;
      const response = await axios.patch(`${API_URL}/${id}`, rest);
      dispatch(getRequest());
      toast.success("Данные успешно изменены");
      return response.data;
    } catch (error) {
      toast.error("Ошибка при изменении данных");
      return rejectWithValue(error.message);
    }
  }
);