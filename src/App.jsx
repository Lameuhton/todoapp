import React, { useState } from 'react';
import Form from './Form';
import TodoList from './TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <h1>My Todo App</h1>
      <Form todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
      <div>
        <p>Made with React.js, Node.js, Vite</p>
      </div>
    </div>
  );
}

export default App;