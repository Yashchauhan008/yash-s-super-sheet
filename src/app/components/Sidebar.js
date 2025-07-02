// app/components/Sidebar.js
"use client";

import React from 'react';
import DashboardStats from './DashboardStats';
import OverallProgress from './OverallProgress';
import ProgressCard from './ProgressCard';
import { generateTopicId } from '@/lib/data';
import Link from 'next/link';
import { useData } from '../data-context';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { topicDefinitions, topicStates, todos } = useData();

  let totalTopics = 0;
  let completedTopics = 0;
  const sectionProgress = {};

  Object.keys(topicDefinitions).forEach(sectionKey => {
    const section = topicDefinitions[sectionKey];
    let currentSectionTotalTopics = 0;
    let currentSectionCompletedTopics = 0;

    if (section.topics) {
      currentSectionTotalTopics = section.topics.length;
      currentSectionCompletedTopics = section.topics.filter(t =>
        topicStates[generateTopicId(sectionKey, t)]
      ).length;
    } else if (section.subsections) {
      Object.keys(section.subsections).forEach(subKey => {
        const sub = section.subsections[subKey];
        currentSectionTotalTopics += sub.topics.length;
        currentSectionCompletedTopics += sub.topics.filter(t =>
          topicStates[generateTopicId(subKey, t)]
        ).length;
      });
    }

    totalTopics += currentSectionTotalTopics;
    completedTopics += currentSectionCompletedTopics;

    sectionProgress[sectionKey] = currentSectionTotalTopics > 0
      ? Math.round((currentSectionCompletedTopics / currentSectionTotalTopics) * 100)
      : 0;
  });

  const overallPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const fixedOrderKeys = ['oop', 'dsa', 'database', 'aptitude', 'security', 'networks', 'swe'];
  const progressCardsData = [];

  fixedOrderKeys.forEach(key => {
    if (topicDefinitions[key] && topicDefinitions[key].name) {
      progressCardsData.push({
        key: key,
        title: topicDefinitions[key].name,
        percentage: sectionProgress[key] || 0,
        className: key
      });
    }
  });

  Object.keys(topicDefinitions).forEach(key => {
    if (!fixedOrderKeys.includes(key) && topicDefinitions[key].name) {
      progressCardsData.push({
        key: key,
        title: topicDefinitions[key].name,
        percentage: sectionProgress[key] || 0,
        className: 'dynamic-topic'
      });
    }
  });


  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-title">📊 Dashboard</div>
        {/* Close button for sidebar - always visible when sidebar is open */}
        {isOpen && ( // Only render if sidebar is open
          <button className="menu-toggle" onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: 'var(--primary-text)', fontSize: '1.5em', cursor: 'pointer' }}>
            &times;
          </button>
        )}
      </div>
      <div className="sidebar-content">
        <DashboardStats
          totalTopicsCompleted={completedTopics}
          totalTopics={totalTopics}
        />

        <OverallProgress overallPercentage={overallPercentage} />

        <div className="progress-cards">
          {progressCardsData.map(card => (
            <ProgressCard
              key={card.key}
              title={card.title}
              percentage={card.percentage}
              className={card.className}
            />
          ))}
        </div>

        {/* Navigation to To-Do List */}
        <div className="sidebar-title" style={{ marginTop: '20px' }}>
          <Link href="/todo" onClick={toggleSidebar} style={{textDecoration: 'none', color: 'inherit'}}>
            📝 Go to To-Do List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
