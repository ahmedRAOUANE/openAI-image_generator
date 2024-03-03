import { configureStore } from "@reduxjs/toolkit";

// slices
import userSlice from "./userSlice";
import imagesSlice from "./imagesSlice";
import loaderSlice from "./loaderSlice";

const store = configureStore({
    reducer: {
        userSlice,
        imagesSlice,
        loaderSlice,
    }
});

export default store;


