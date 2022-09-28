import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../interfaces";

export interface UserState {
    value: UserInfo
}

const initialState: UserState = {
    value: {
        fullName: '',
        email: ''
    },
}

export const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        userInfo: (state, action: PayloadAction<UserInfo>) => {
            state.value = {
                fullName: action.payload.fullName,
                email: action.payload.email
            }
        },
        cleanUserInfo: (state) => {
            state.value = {
                fullName: '',
                email: ''
            }
        }
    }
})

export const {userInfo, cleanUserInfo} = userSlice.actions;

export default userSlice.reducer;