import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "@services/axios";

interface UpdateComplaintData {
  _id: string;
  name: string;
  category: string;
  description: string;
  status: string;
}

const updateComplaint = createAsyncThunk(
  "complaints/updateComplaint",
  async ({ _id, ...data }: UpdateComplaintData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/complaints/${_id}`, data);
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

export default updateComplaint;
