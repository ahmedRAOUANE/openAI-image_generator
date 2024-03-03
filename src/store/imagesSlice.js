import { createSlice } from "@reduxjs/toolkit";

const imagesSlice = createSlice({
    name: "images",
    initialState: { images: null },
    reducers: {
        setImages: (state, { payload }) => {
            state.images = payload;
        }
    }
})

export const { setImages } = imagesSlice.actions;

export default imagesSlice.reducer;


