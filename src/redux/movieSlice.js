// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
    movies: [],
    statusMovies: "idle",
    selectedMovie: {},
    statusSelectedMovie: "idle",
    selectedMovieId: null,
};

// Create async thunk for fetching data (GET request)
export const fetchOneMovie = createAsyncThunk(
    "movie/fetchOneMovie",
    async (id) => {
        const API_KEY = "30560503a2bf2603ab571c72b800a94d";
        const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
        const response = await axios.get(URL);
        return response.data;
    }
);

export const fetchMovies = createAsyncThunk("movie/fetchMovies", async (id) => {
    const API_KEY = "30560503a2bf2603ab571c72b800a94d";
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    const response = await axios.get(URL);
    console.log("Movies = ", response);
    return response.data.results;
});

export const selectMovie = createAsyncThunk("movie/addMovie", async (id) => {
    return id;
});

// Create slice
const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOneMovie.pending, (state) => {
                state.statusSelectedMovie = "loading";
            })
            .addCase(fetchOneMovie.fulfilled, (state, action) => {
                state.statusSelectedMovie = "succeeded";
                state.selectedMovie = action.payload;
            })
            .addCase(fetchOneMovie.rejected, (state) => {
                state.statusSelectedMovie = "failed";
            })
            .addCase(selectMovie.fulfilled, (state, action) => {
                state.selectedMovieId = action.payload;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.statusMovies = "succeeded";
                state.movies = action.payload;
            });
    },
});

export default movieSlice.reducer;
