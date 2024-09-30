// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
    data: [],
    status: "idle",
    id: null,
};

// Create async thunk for fetching data (GET request)
export const fetchData = createAsyncThunk("movie/fetchData", async (id) => {
    const API_KEY = "30560503a2bf2603ab571c72b800a94d";
    const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
});

export const addMovie = createAsyncThunk("movie/addMovie", async (id) => {
    return id;
});

// Create slice
const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(addMovie.fulfilled, (state, action) => {
                state.id = action.payload;
            });
    },
});

export default movieSlice.reducer;
