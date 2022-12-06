import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserFavorite } from "../interfaces";

interface UserFavoriteMedia {
    value: IUserFavorite[]
}

const initialState: UserFavoriteMedia = {
    value: []
}

export const favoriteMediaSlice = createSlice ({
    name: 'favoriteMedia',
    initialState,
    reducers: {
        favoriteItems: (state, action: PayloadAction<IUserFavorite[]>) => {
            state.value.push(...action.payload)
        },
        addItemToFavorites: (state, action: PayloadAction<IUserFavorite>) => {
          state.value = [...state.value, action.payload]
        },
        removeItemFromFavorites: (state, action: PayloadAction<IUserFavorite>) => {
          state.value = state.value.filter((favorite) => favorite.profilePath !== action.payload.profilePath);
        },
        cleanFavoriteItems: (state) => {
            state.value = []
        }
    }
})

export const { favoriteItems, cleanFavoriteItems, addItemToFavorites, removeItemFromFavorites} = favoriteMediaSlice.actions;

export default favoriteMediaSlice.reducer;