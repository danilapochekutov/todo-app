import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const renderWithProvider = (component: React.ReactNode) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

test('adds a new todo', () => {
  renderWithProvider(<TodoApp />);
  
  const input = screen.getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  
  expect(screen.getByText('New Task')).toBeInTheDocument();
});

test('toggles todo completion', () => {
  renderWithProvider(<TodoApp />);
  
  const input = screen.getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  
  const todoItem = screen.getByText('New Task');
  fireEvent.click(todoItem);
  
  expect(todoItem).toHaveClass('completed');
  
  // Переключаем обратно
  fireEvent.click(todoItem);
  expect(todoItem).not.toHaveClass('completed');
});

test('filters todos by active', () => {
  renderWithProvider(<TodoApp />);
  
  const input = screen.getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, { target: { value: 'Task 1' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  fireEvent.change(input, { target: { value: 'Task 2' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  
  const todoItem1 = screen.getByText('Task 1');
  const todoItem2 = screen.getByText('Task 2');
  
  fireEvent.click(todoItem1); // Завершаем первую задачу
  
  // Фильтруем только активные задачи
  const activeButton = screen.getByText('Active');
  fireEvent.click(activeButton);
  
  expect(todoItem1).not.toBeInTheDocument();  // Завершенная задача не должна отображаться
  expect(todoItem2).toBeInTheDocument();     // Активная задача должна отображаться
});

test('filters todos by completed', () => {
  renderWithProvider(<TodoApp />);
  
  const input = screen.getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, { target: { value: 'Task 1' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  
  const todoItem1 = screen.getByText('Task 1');
  fireEvent.click(todoItem1);  // Завершаем задачу
  
  const completedButton = screen.getByText('Completed');
  fireEvent.click(completedButton);
  
  expect(todoItem1).toBeInTheDocument();  // Завершенная задача должна отображаться
});

test('clears completed todos', () => {
  renderWithProvider(<TodoApp />);
  
  const input = screen.getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, { target: { value: 'Task 1' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  
  const todoItem1 = screen.getByText('Task 1');
  fireEvent.click(todoItem1);  // Завершаем задачу
  
  const clearCompletedButton = screen.getByText('Clear completed');
  fireEvent.click(clearCompletedButton);
  
  expect(todoItem1).not.toBeInTheDocument();  // Завершенная задача должна быть удалена
});
