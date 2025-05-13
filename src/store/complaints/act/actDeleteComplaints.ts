import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "@services/axios";

const deleteComplaint = createAsyncThunk(
  "complaints/deleteComplaint",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/complaints/${id}`);
      return id; // return the deleted ID so you can remove it from state
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export default deleteComplaint;
