import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import { localStorageMiddleware } from './middleware/localStorageMiddleware';

export const store = configureStore({
    reducer: {
        todos: todosReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
