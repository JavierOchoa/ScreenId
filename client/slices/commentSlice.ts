import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from '../interfaces'

interface MediaComment {
  value: Comment[];
  currentSlice: number;
  totalComments: number;
}

const initialState: MediaComment = {
  value: [],
  currentSlice: 3,
  totalComments: 0
}

export const mediaCommentSlice = createSlice({
  name: 'mediaComment',
  initialState,
  reducers: {
    userComments: (state, action:PayloadAction<Comment[]>)=>{
      state.value = action.payload;
      state.totalComments = action.payload.length;
    },
    reverseComments: (state)=>{
      state.value.reverse();
    },
    addToSlice: (state) => {
      state.currentSlice += 5;
    },
    resetSliceCounter: (state)=>{
      state.currentSlice = 3
    },
    cleanUserComments: (state) => {
      state.value = [];
    }
  }
})

export const { userComments, addToSlice, cleanUserComments, resetSliceCounter, reverseComments } = mediaCommentSlice.actions;

export default mediaCommentSlice.reducer;