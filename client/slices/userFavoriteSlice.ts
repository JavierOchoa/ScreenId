import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserFavorites } from "../interfaces";

interface UserFavoriteMedia {
    value: IUserFavorites[]
}

const initialState: UserFavoriteMedia = {
    value: []
}

export const favoriteMediaSlice = createSlice ({
    name: 'favoriteMedia',
    initialState,
    reducers: {
        favoriteItems: (state, action: PayloadAction<IUserFavorites[]>) => {
            state.value.push(...action.payload)
        },
        cleanFavoriteItems: (state) => {
            state.value = []
        }
    }
})

export const { favoriteItems, cleanFavoriteItems} = favoriteMediaSlice.actions;

export default favoriteMediaSlice.reducer;