import { configureStore } from "@reduxjs/toolkit";

// slices
import userSlice from "./userSlice"

const store = configureStore({
    reducer: {
        userSlice,
    }
});

export default store;


