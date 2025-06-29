// app/todo/page.js
"use client";

import React from 'react';
import DashboardLayout from '../dashboard-layout'; // Use the shared layout
import TodoList from '../components/TodoList'; // Re-use the TodoList component
import { useData } from '../data-context'; // Consume data from context

export default function TodoPage() {
  const { todos, handleSaveTodos } = useData();

  return (
    <DashboardLayout> {/* Wrap content with DashboardLayout */}
      <div className="content-area">
        <h2 className="section-title">📝 My To-Do List</h2>
        <TodoList initialTodos={todos} onSaveTodos={handleSaveTodos} />
      </div>
    </DashboardLayout>
  );
}
