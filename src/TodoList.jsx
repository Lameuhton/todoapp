import React, { useState, useEffect } from 'react';

function TodoList({ todos, setTodos }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, [setTodos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleToggle = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (index) => {
    setTodos((prevTodos) =>
      prevTodos.filter((_, i) => i !== index)
    );
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  };

  const handleSaveEdit = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === editingIndex ? { ...todo, text: editingText } : todo
      )
    );
    setEditingIndex(null);
    setEditingText('');
  };

  return (
    <section>
      <h2>Todos:</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(index)}
                  />
                  {todo.text}
                </label>
                <div>
                  <button onClick={() => handleEdit(index)} className="pen">
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(index)} className="trash">
                    🗑️
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodoList;