import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "@services/axios";

interface AddComplaintData {
  name: string;
  category: string;
  description: string;
  status: string;
}

const addComplaint = createAsyncThunk(
  "complaints/addComplaint",
  async (data: AddComplaintData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/complaints", data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export default addComplaint;