import { IComplaintProps } from "@/types/index";
import { createSlice } from "@reduxjs/toolkit";
import fetchComplaints from "./act/actGetComplaints";
import addComplaint from "./act/actAddComplaints";
import deleteComplaint from "./act/actDeleteComplaints";
import updateComplaint from "./act/actUpdateComplaints";

interface IComplaintsState {
  complaints: IComplaintProps[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: IComplaintsState = {
  complaints: [],
  loading: "idle",
  error: null
};

const complaintsSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET (fetchComplaints)
    builder.addCase(fetchComplaints.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(fetchComplaints.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.complaints = action.payload;
    });
    builder.addCase(fetchComplaints.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

    // POST (addComplaint)
    builder.addCase(addComplaint.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(addComplaint.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.complaints.push(action.payload);
    });
    builder.addCase(addComplaint.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

    // PUT (updateComplaint)
    builder.addCase(updateComplaint.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(updateComplaint.fulfilled, (state, action) => {
      const index = state.complaints.findIndex(
        (c) => c._id === action.payload._id
      );
      if (index !== -1) {
        state.complaints[index] = action.payload;
      }
    });
    builder.addCase(updateComplaint.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

    // DELETE (deleteComplaint)
    builder.addCase(deleteComplaint.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(deleteComplaint.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.complaints = state.complaints.filter(
        (complaint) => complaint._id !== String(action.payload)
      );
    });
    builder.addCase(deleteComplaint.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  }
});

export { fetchComplaints, updateComplaint, addComplaint, deleteComplaint };
export default complaintsSlice.reducer;
