import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  //Charge depuis le local storage
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  //Change les todos dans le local storage à chaque changement
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos(prevTodos => [
        ...prevTodos,
        { text: newTodo, completed: false }
      ]);
      setNewTodo('');
    };
  };

  const handleToggle = (index) => {
    setTodos(prevTodos =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
                <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(index)}/>
                {todo.text}
              </label>
            </li>
          ))}
        </ul>
      </section>  
    </>
  )
};

export default App
