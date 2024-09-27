import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GET_URL = import.meta.env.VITE_API_URL;
const POST_URL = import.meta.env.VITE_API_URL;
const DELETE_URL = import.meta.env.VITE_API_URL;
const PATCH_URL = import.meta.env.VITE_API_URL;

export const getRequest = createAsyncThunk(
	"todo/getRequest",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(GET_URL);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const postRequest = createAsyncThunk(
	"todo/postRequest",
	async (value, { rejectWithValue, dispatch }) => {
		try {
			const { data } = await axios.post(POST_URL, value);
      dispatch(getRequest());
      toast.success("Задача успешно добавлена");
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteRequest = createAsyncThunk(
  "todo/deleteRequest",
  async (id, { rejectWithValue,dispatch }) => {
    try {
      await axios.delete(`${DELETE_URL}/${id}`);
      dispatch(getRequest());
      toast.success("Задача успешно удалена");
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const patchRequest = createAsyncThunk(
  "todo/patchRequest",
  async (param, { rejectWithValue, dispatch }) => {
    try {
      const { id, ...rest } = param;
      await axios.patch(`${PATCH_URL}/${id}`, rest);
      dispatch(getRequest());
      toast.success("Данныйе успешно изменены")
    } catch (error) {
        toast.error("Ошибка при изминение данных")
      return rejectWithValue(error);
    }
  }
);