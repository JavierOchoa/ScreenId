import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {TrendingMovieResult} from "../interfaces";

export interface trendingMoviesState {
    value: TrendingMovieResult[]
}

const initialState: trendingMoviesState = {
    value: [],
}

export const trendingMoviesSlice = createSlice({
    name: 'trendingMovies',
    initialState,
    reducers: {
        movies: (state, action: PayloadAction<TrendingMovieResult[]>) => {
            state.value.push(...action.payload);
        },
        clean: (state) => {
            state.value = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const { movies, clean } = trendingMoviesSlice.actions

export default trendingMoviesSlice.reducer