import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  celebrities: [],
};

export const getCelebrities = createAsyncThunk(
  "celebrity/getCelebrity",
  async () => {
    const { data } = await axios.get(`/celebrities`);
    // const { data } = await axios.get(`http://localhost:3001/celebrities`);
    return data;
  }
);

export const searchCelebrities = createAsyncThunk(
  "celebrity/searchCelebrity",
  async (searchtext: String) => {
    const { data } = await axios.get(`/celebrities?q=${searchtext}`);
    return data;
  }
);

export const celebritySlice = createSlice({
  name: "celebrity",
  initialState,
  reducers: {
    deleteCelebrity: (state, action) => {
      const currCopy = [...state.celebrities];
      const indexToRemove = currCopy.findIndex((object) => {
        return object._id === action.payload.id;
      });
      currCopy.splice(indexToRemove, 1);

      state.celebrities = currCopy;
    },
  },
  extraReducers: {
    [getCelebrities.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCelebrities.fulfilled]: (state, action) => {
      state.status = "success";

      const curr_state_obj = {};
      const res_obj = {};
      state.celebrities.map((e) => (curr_state_obj[e._id] = e));
      action.payload.map((e) => (res_obj[e._id] = e));
      state.celebrities = Object.values(Object.assign(curr_state_obj, res_obj));
    },
    [getCelebrities.rejected]: (state, action) => {
      state.status = "failed";
    },
    [searchCelebrities.pending]: (state, action) => {
      state.status = "searching";
    },
    [searchCelebrities.fulfilled]: (state, action) => {
      state.status = "success";

      const curr_state_obj = {};
      const res_obj = {};
      state.celebrities.map((e) => (curr_state_obj[e._id] = e));
      action.payload.map((e) => (res_obj[e._id] = e));
      state.celebrities = action.payload;
    },
    [searchCelebrities.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default celebritySlice.reducer;
export const { deleteCelebrity } = celebritySlice.actions;
