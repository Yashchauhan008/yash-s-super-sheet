// app/components/TopicItem.js
"use client";
import React from 'react';
import ToggleSwitch from './ToggleSwitch';

const TopicItem = ({ topic, topicId, isCompleted, onToggle, onDelete }) => { // Added onDelete prop
  return (
    <li className={`topic-item ${isCompleted ? 'completed' : ''}`} data-topic-id={topicId}>
      <ToggleSwitch isActive={isCompleted} onToggle={() => onToggle(topicId)} />
      <span>{topic}</span>
      {/* Delete button */}
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation(); // Prevent toggle from firing when delete is clicked
          onDelete(topicId, topic); // Pass topicId and topic name for confirmation/context
        }}
        title={`Delete "${topic}"`}
      >
        &#x2715; {/* Unicode 'X' character */}
      </button>
    </li>
  );
};
export default TopicItem;
