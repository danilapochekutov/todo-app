// src/App.tsx
import React from 'react';
import TodoApp from './components/TodoApp'; // Импортируем главный компонент

const App: React.FC = () => {
    return (
        <div className="App">
            <TodoApp /> {/* Рендерим компонент TodoApp */}
        </div>
    );
};

export default App;
