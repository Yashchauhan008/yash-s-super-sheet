// app/components/AddSubtopicForm.js
"use client";

import React, { useState } from 'react';

const AddSubtopicForm = ({ onAddSubtopic }) => {
  const [newSubtopicName, setNewSubtopicName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newSubtopicName.trim()) {
      onAddSubtopic(newSubtopicName.trim());
      setNewSubtopicName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
      <input
        type="text"
        className="todo-input" // Reusing style
        placeholder="Add sub-topic..."
        value={newSubtopicName}
        onChange={(e) => setNewSubtopicName(e.target.value)}
        style={{ flex: 1, padding: '6px', fontSize: '12px' }}
      />
      <button type="submit" className="add-btn" style={{ padding: '6px 10px', fontSize: '12px' }}>Add</button>
    </form>
  );
};

export default AddSubtopicForm;
