import { configureStore } from '@reduxjs/toolkit'
import trendingMoviesReducer from './slices/trendingMoviesSlice';
import trendingShowsReducer from './slices/trendingShowsSlice';
import userInfoReducer from './slices/userInfoSlice';
import userFavoriteReducer from './slices/userFavoriteSlice';

export const store = configureStore({
    reducer: {
        trendingMovies: trendingMoviesReducer,
        trendingShows: trendingShowsReducer,
        userInfo: userInfoReducer,
        userFavorites: userFavoriteReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch