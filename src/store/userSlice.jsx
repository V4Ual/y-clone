// store/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: JSON.parse(localStorage.getItem("userDetails")),
  reducers: {
    userDetails(state, action) {
      state = action.payload;
    },
  },
});

export const { userDetails, logout } = userSlice.actions;
export default userSlice.reducer;
