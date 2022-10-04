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
        cleanFavoriteItems: (state) => {
            state.value = []
        }
    }
})

export const { favoriteItems, cleanFavoriteItems} = favoriteMediaSlice.actions;

export default favoriteMediaSlice.reducer;