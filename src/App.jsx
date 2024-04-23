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
      <hr />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;