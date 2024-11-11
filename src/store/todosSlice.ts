import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types';

interface TodosState {
    todos: Todo[];
}

const initialState: TodosState = {
    todos: JSON.parse(localStorage.getItem('todos') || '[]'),
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            };
            state.todos.push(newTodo);
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        clearCompleted: (state) => {
            state.todos = state.todos.filter(todo => !todo.completed);
        },
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
        },
    },
});

export const { addTodo, toggleTodo, clearCompleted, setTodos } = todosSlice.actions;
export default todosSlice.reducer;
