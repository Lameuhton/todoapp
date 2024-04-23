import React, { useState } from 'react';

function Form({ todos, setTodos }) {
  const [newTodo, setNewTodo] = useState('');

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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newTodo">Type a new todo:</label>
      <input
        type="text"
        id="newTodo"
        name="newTodo"
        value={newTodo}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default Form;