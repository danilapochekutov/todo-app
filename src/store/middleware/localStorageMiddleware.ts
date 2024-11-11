import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState() as RootState;
    localStorage.setItem('todos', JSON.stringify(state.todos.todos));
    return result;
};
