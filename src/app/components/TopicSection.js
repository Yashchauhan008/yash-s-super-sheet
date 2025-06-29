// app/components/TopicSection.js
"use client";

import React from 'react';
import TopicCard from './TopicCard';

const TopicSection = ({ title, icon, sectionData, topicStates, onToggleTopic, onAddSubtopic, onDeleteTopic, onDeleteSection }) => { // Added onDeleteSection prop
  return (
    <div className="subsection">
      <h3>{icon} {title}</h3>
      <div className="topic-grid">
        {/* Check if sectionData has a 'subsections' property */}
        {sectionData.subsections ? (
          // If it has subsections, iterate through them
          Object.entries(sectionData.subsections).map(([subKey, subDefinition]) => {
            if (!subDefinition) {
              console.warn(`Skipping undefined subDefinition for subKey: ${subKey}`);
              return null;
            }
            return (
              <TopicCard
                key={subKey}
                title={subDefinition.name || subKey.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                sectionKey={subKey} // Pass the actual subKey for generateTopicId
                topics={subDefinition.topics}
                topicStates={topicStates}
                onToggleTopic={onToggleTopic}
                onAddSubtopic={onAddSubtopic}
                onDeleteTopic={onDeleteTopic}
                onDeleteSection={onDeleteSection} // Pass the delete section function here
              />
            );
          })
        ) : (
          // If no subsections, assume it's a direct section with topics
          <TopicCard
            title={sectionData.name} // Use the 'name' property from the sectionData
            sectionKey={sectionData.name.toLowerCase().replace(/\s/g, '')} // Generate sectionKey from name
            topics={sectionData.topics}
            topicStates={topicStates}
            onToggleTopic={onToggleTopic}
            onAddSubtopic={onAddSubtopic}
            onDeleteTopic={onDeleteTopic}
            onDeleteSection={onDeleteSection} // Pass the delete section function here
          />
        )}
      </div>
    </div>
  );
};

export default TopicSection;
