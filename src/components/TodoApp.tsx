import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addTodo, toggleTodo, clearCompleted } from '../store/todosSlice';
import TodoItem from './TodoItem';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import List from '@mui/material/List';
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

enum Filter {
    ALL = 'all',
    ACTIVE = 'active',
    COMPLETED = 'completed',
}

const TodoApp: React.FC = () => {
    const [filter, setFilter] = useState<Filter>(Filter.ALL);
    const [inputValue, setInputValue] = useState<string>('');
    const todos = useSelector((state: RootState) => state.todos.todos);
    const dispatch = useDispatch();

    const handleAddTodo = (text: string) => dispatch(addTodo(text));
    const handleToggleTodo = (id: number) => dispatch(toggleTodo(id));
    const handleClearCompleted = () => dispatch(clearCompleted());
    const changeFilter = (newFilter: Filter) => setFilter(newFilter);

    const filteredTodos = todos.filter(todo => {
        if (filter === Filter.ACTIVE) return !todo.completed;
        if (filter === Filter.COMPLETED) return todo.completed;
        return true;
    });

    const getButtonStyle = (isActive: boolean) => ({
        textAlign: 'center',
        marginRight: '10px',
        backgroundColor: isActive ? '#FF5733' : 'transparent',
        color: isActive ? '#FFFFFF' : 'success',
    });

    const filterButtons = [
        { label: 'All', filterType: Filter.ALL },
        { label: 'Active', filterType: Filter.ACTIVE },
        { label: 'Completed', filterType: Filter.COMPLETED },
    ];

    return (
        <Container fixed>
            <Typography
                variant="h2"
                sx={{
                    fontWeight: 'bold',
                    fontSize: '2.5rem',
                    textAlign: 'center',
                    color: '#FF5733',
                    paddingBottom: '1rem',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                }}
            >
                todos
            </Typography>
            
            <TextField
                type="text"
                id="outlined-basic"
                label="What needs to be done?"
                variant="outlined"
                color="success"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter' && inputValue) {
                        handleAddTodo(inputValue);
                        setInputValue('');
                    }
                }}
            />

            <List>
                {filteredTodos.map((todo, index) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={() => handleToggleTodo(todo.id)}
                        isFirst={index === 0}
                    />
                ))}
            </List>

            <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                <Typography
                    sx={{
                        padding: '12px 20px',
                        fontWeight: 'bold',
                        color: '#FF5733',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {todos.filter(todo => !todo.completed).length} items left
                </Typography>

                <Box sx={{ display: 'flex', margin: '0 auto' }}>
                    {filterButtons.map(({ label, filterType }) => (
                        <Button
                            key={filterType}
                            sx={getButtonStyle(filter === filterType)}
                            variant="outlined"
                            color="success"
                            onClick={() => changeFilter(filterType)}
                        >
                            {label}
                        </Button>
                    ))}
                </Box>

                <Button
                    sx={{ marginLeft: 'auto' }}
                    variant="outlined"
                    color="success"
                    onClick={handleClearCompleted}
                >
                    Clear completed
                </Button>
            </Box>
        </Container>
    );
};

export default TodoApp;
