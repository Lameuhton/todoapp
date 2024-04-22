import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos(prevTodos => [
        ...prevTodos,
        newTodo
      ]);
      setNewTodo('');
    };
  };

  return (
    <>
      <h1>My Todo App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newTodo">Type a new todo:</label>
        <input type="text" id="newTodo" name="newTodo" value={newTodo} onChange={handleInputChange}/>
        <button type="submit">Add Todo</button>
      </form>
      <hr/>
      <section>
        <h2>Todos:</h2>
        <ul>
          {todos.map((todo, index) => (
              <li key={index}>
            <label>
              <input type="checkbox"/>
              {todo}
            </label>
          </li>
            ))}
        </ul>
      </section>
      
    </>
  )
};

export default App
