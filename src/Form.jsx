import React, { useState, useRef } from 'react';

function Form({ todos, setTodos }) {

  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputElement = inputRef.current.value;
    if (inputElement.trim() !== '') {
      setTodos(prevTodos => [
        ...prevTodos,
        { text: inputElement, completed: false }
      ]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newTodo">Type a new todo:</label>
      <input
        type="text"
        id="newTodo"
        name="newTodo"
        ref={inputRef}
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default Form;