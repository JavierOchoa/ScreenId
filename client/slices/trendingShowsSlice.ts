import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {TrendingTvResult} from "../interfaces";

export interface trendingShowsState {
    value: TrendingTvResult[]
}

const initialState: trendingShowsState = {
    value: [],
}

export const trendingShowsSlice = createSlice({
    name: 'trendingShows',
    initialState,
    reducers: {
        shows: (state, action: PayloadAction<TrendingTvResult[]>) => {
            state.value.push(...action.payload);
        },
        cleanShows: (state) => {
            state.value = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const { shows, cleanShows } = trendingShowsSlice.actions

export default trendingShowsSlice.reducer