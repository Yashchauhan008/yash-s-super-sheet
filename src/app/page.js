// app/page.js
"use client";

import React from 'react';
import DashboardLayout from './dashboard-layout'; // Import the new layout component
import CompanyInfo from './components/CompanyInfo';
import TopicSection from './components/TopicSection';
import AddTopicForm from './components/AddTopicForm';
import { useData } from './data-context'; // Use the context
import { initialTopicDefinitions } from '@/lib/data'; // Still needed for initial structure

export default function HomePage() {
  const {
    topicDefinitions,
    topicStates,
    companyName,
    isLoaded,
    handleToggleTopic,
    handleAddMainTopic,
    handleAddSubtopic,
    handleDeleteTopic,
    handleDeleteSection,
  } = useData();

  // Helper to render TopicSections dynamically
  const renderTopicSections = () => {
    if (!isLoaded || Object.keys(topicDefinitions).length === 0) {
      return <p>Loading topics...</p>;
    }

    const sectionsToDisplay = [
      {
        key: 'core-cs',
        title: 'Core Programming & CS',
        icon: '💻',
        sectionData: {
          subsections: {
            dsa: topicDefinitions.dsa,
            oop: topicDefinitions.oop,
            database: topicDefinitions.database,
          }
        }
      },
      {
        key: 'aptitude',
        title: 'Aptitude & Reasoning',
        icon: '🧠',
        sectionData: topicDefinitions.aptitude,
      },
      {
        key: 'security-networks',
        title: 'Security & Networks',
        icon: '🛡️',
        sectionData: {
          subsections: {
            security: topicDefinitions.security,
            networks: topicDefinitions.networks,
          }
        }
      },
      {
        key: 'swe',
        title: 'Software Engineering',
        icon: '🏗️',
        sectionData: topicDefinitions.swe,
      },
    ];

    Object.keys(topicDefinitions).forEach(key => {
      const isAlreadyDisplayed = sectionsToDisplay.some(s => {
        if (s.key === key) return true;
        if (s.sectionData && s.sectionData.subsections && s.sectionData.subsections[key]) return true;
        return false;
      });

      if (topicDefinitions[key].topics && !isAlreadyDisplayed) {
        sectionsToDisplay.push({
          key: key,
          title: topicDefinitions[key].name,
          icon: '📚',
          sectionData: topicDefinitions[key],
        });
      }
    });


    return sectionsToDisplay.map(section => {
      if (!section.sectionData || (section.sectionData.subsections && Object.values(section.sectionData.subsections).some(sub => !sub))) {
        console.warn(`Skipping section due to missing or incomplete data: ${section.key}`);
        return null;
      }
      return (
        <TopicSection
          key={section.key}
          title={section.title}
          icon={section.icon}
          sectionData={section.sectionData}
          topicStates={topicStates}
          onToggleTopic={handleToggleTopic}
          onAddSubtopic={handleAddSubtopic}
          onDeleteTopic={handleDeleteTopic}
          onDeleteSection={handleDeleteSection}
        />
      );
    });
  };


  return (
    <DashboardLayout> {/* Wrap content with DashboardLayout */}
      <div className="content-area">
        <CompanyInfo companyName={companyName} />

        <h2 className="section-title">📚 Technical & Aptitude Preparation</h2>

        <AddTopicForm onAddMainTopic={handleAddMainTopic} />

        {renderTopicSections()}

      </div>
    </DashboardLayout>
  );
}
