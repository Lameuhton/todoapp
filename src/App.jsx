import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

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

  const handleDelete = (index) => {
    setTodos(prevTodos =>
      prevTodos.filter((_, i) => i !== index)
    );
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  };

  const handleSaveEdit = () => {
    setTodos(prevTodos =>
      prevTodos.map((todo, i) =>
        i === editingIndex ? { ...todo, text: editingText } : todo
      )
    );
    setEditingIndex(null);
    setEditingText('');
  };

  return (
    <>
      <h1>My Todo App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newTodo">Type a new todo:</label>
        <input type="text" id="newTodo" name="newTodo" value={newTodo} onChange={handleInputChange} required/>
        <button type="submit">Add Todo</button>
      </form>
      <hr/>
      <section>
        <h2>Todos:</h2>
        <ul>
          {todos.map((todo, index) => (
              <li key={index}>
                {editingIndex === index ? (
                  <>
                    <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)}/>
                    <button onClick={handleSaveEdit}>Save</button>
                  </>
                ) : (
                  <>
                    <label>
                      <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(index)}/>
                      {todo.text}
                    </label>
                    <div>
                      <button onClick={() => handleEdit(index)} className="pen">✏️</button>
                      <button onClick={() => handleDelete(index)} className="trash">🗑️</button>
                    </div>
                  </>
                )}
              </li>
            ))}
        </ul>
      </section>  
    </>
  )
};

export default App
