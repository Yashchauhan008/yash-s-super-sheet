// app/components/TopicItem.js
"use client";
import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import { Trash2 } from "lucide-react";

const TopicItem = ({ topic, topicId, isCompleted, onToggle, onDelete }) => {
  // Added onDelete prop
  return (
    <li
      className={`topic-item ${isCompleted ? "completed" : ""}`}
      data-topic-id={topicId}
    >
      <ToggleSwitch isActive={isCompleted} onToggle={() => onToggle(topicId)} />
      <div className="topic-item2">
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
          <Trash2 size={20} color="#933e3e" strokeWidth={2.5} />
        </button>
      </div>
    </li>
  );
};
export default TopicItem;
