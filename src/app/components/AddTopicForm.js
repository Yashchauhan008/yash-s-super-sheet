// app/components/AddTopicForm.js
"use client";

import React, { useState } from 'react';

const AddTopicForm = ({ onAddMainTopic }) => {
  const [newMainTopicName, setNewMainTopicName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMainTopicName.trim()) {
      onAddMainTopic(newMainTopicName.trim());
      setNewMainTopicName('');
    }
  };

  return (
    <div className="subsection">
      <h3>➕ Add New Main Topic</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          className="todo-input" // Reusing style
          placeholder="e.g., Blockchain"
          value={newMainTopicName}
          onChange={(e) => setNewMainTopicName(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" className="add-btn">Add Topic</button>
      </form>
    </div>
  );
};

export default AddTopicForm;
