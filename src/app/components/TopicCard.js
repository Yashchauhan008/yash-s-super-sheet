// app/components/TopicCard.js
"use client";

import React from 'react';
import TopicItem from './TopicItem';
import AddSubtopicForm from './AddSubtopicForm';
import { generateTopicId } from '@/lib/data';

const TopicCard = ({ title, sectionKey, topics, topicStates, onToggleTopic, onAddSubtopic, onDeleteTopic, onDeleteSection }) => { // Added onDeleteSection prop
  return (
    <div className="topic-card">
      <h5>
        {title}
        {/* Delete button for the entire section/card */}
        <button
          className="delete-section-btn"
          onClick={(e) => {
            e.stopPropagation(); // Prevent any parent click handlers
            onDeleteSection(sectionKey, title); // Pass sectionKey and title for deletion
          }}
          title={`Delete "${title}" section`}
        >
          &#x2715; {/* Unicode 'X' character */}
        </button>
      </h5>
      <ul className="topic-list">
        {topics.map((topic) => {
          const topicId = generateTopicId(sectionKey, topic);
          const isCompleted = topicStates[topicId] || false;
          return (
            <TopicItem
              key={topicId}
              topic={topic}
              topicId={topicId}
              isCompleted={isCompleted}
              onToggle={onToggleTopic}
              onDelete={onDeleteTopic}
            />
          );
        })}
      </ul>
      {/* Add Subtopic Form */}
      <AddSubtopicForm onAddSubtopic={(newSubtopic) => onAddSubtopic(sectionKey, newSubtopic)} />
    </div>
  );
};

export default TopicCard;
