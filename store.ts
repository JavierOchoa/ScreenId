import { configureStore } from '@reduxjs/toolkit'
import trendingMoviesReducer from './slices/trendingMoviesSlice';

export const store = configureStore({
    reducer: {
        trendingMovies: trendingMoviesReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch