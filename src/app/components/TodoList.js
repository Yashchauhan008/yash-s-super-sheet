// app/components/TodoList.js
"use client";

import React, { useState, useEffect } from 'react';

const TodoList = ({ initialTodos, onSaveTodos }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      onSaveTodos(updatedTodos);
      setNewTodoText('');
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    onSaveTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    onSaveTodos(updatedTodos);
  };

  return (
    <>
      <div className="sidebar-title" style={{ marginTop: '20px' }}>📝 To-Do List</div>
      <div className="todo-input-container">
        <input
          type="text"
          id="todoInput"
          className="todo-input"
          placeholder="Add a new task..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
        />
        <button onClick={addTodo} className="add-btn">
          Add
        </button>
      </div>
      <ul id="todoList" className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            onClick={() => toggleTodo(todo.id)}
          >
            <span className="todo-text">{todo.text}</span>
            <button onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}>❌</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
