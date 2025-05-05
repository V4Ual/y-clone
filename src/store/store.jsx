// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // ✅ import reducer, not action

export const Store = configureStore({
  reducer: {
    user: userReducer, // ✅ use reducer
  },
});
