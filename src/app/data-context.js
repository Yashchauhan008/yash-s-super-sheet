// app/data-context.js
"use client";

import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { initialTopicDefinitions, generateTopicId, generateUniqueKey } from '@/lib/data';

const DataContext = createContext(undefined);

export function DataProvider({ children }) {
  const [topicDefinitions, setTopicDefinitions] = useState({});
  const [topicStates, setTopicStates] = useState({});
  const [todos, setTodos] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let loadedTopicDefs = initialTopicDefinitions; // Start with initial definitions
      try {
        const savedTopicDefinitions = localStorage.getItem("topicDefinitions");
        if (savedTopicDefinitions) {
          const parsed = JSON.parse(savedTopicDefinitions);
          // Only use saved if it's a non-empty object
          if (parsed && Object.keys(parsed).length > 0) {
            loadedTopicDefs = parsed;
          }
        }
      } catch (e) {
        console.error("Error parsing saved topic definitions from localStorage:", e);
        // Fallback to initialTopicDefinitions if parsing fails
      }
      setTopicDefinitions(loadedTopicDefs);


      let loadedTopicStates = {};
      try {
        const savedTopicStates = localStorage.getItem("topicStatesV2");
        if (savedTopicStates) {
          const parsed = JSON.parse(savedTopicStates);
          if (parsed && Object.keys(parsed).length > 0) {
            loadedTopicStates = parsed;
          }
        }
      } catch (e) {
        console.error("Error parsing saved topic states from localStorage:", e);
      }
      setTopicStates(loadedTopicStates);


      let loadedTodos = [];
      try {
        const savedTodos = localStorage.getItem("todosV2");
        if (savedTodos) {
          const parsed = JSON.parse(savedTodos);
          if (Array.isArray(parsed) && parsed.length > 0) {
            loadedTodos = parsed;
          }
        }
      } catch (e) {
        console.error("Error parsing saved todos from localStorage:", e);
      }
      setTodos(loadedTodos);


      let loadedCompanyName = '';
      try {
        const savedCompanyName = localStorage.getItem("companyName");
        if (savedCompanyName) {
          loadedCompanyName = savedCompanyName;
        }
      } catch (e) {
        console.error("Error parsing saved company name from localStorage:", e);
      }
      setCompanyName(loadedCompanyName);

      setIsLoaded(true);
    }
  }, []); // Empty dependency array means this runs once on mount

  // ... (rest of the DataProvider component, which remains the same)
  // Save states to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("topicDefinitions", JSON.stringify(topicDefinitions));
    }
  }, [topicDefinitions]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("topicStatesV2", JSON.stringify(topicStates));
    }
  }, [topicStates]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("todosV2", JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("companyName", companyName);
    }
  }, [companyName]);


  const handleToggleTopic = useCallback((topicId) => {
    setTopicStates(prevStates => ({
      ...prevStates,
      [topicId]: !prevStates[topicId]
    }));
  }, []);

  const handleSaveTodos = useCallback((updatedTodos) => {
    setTodos(updatedTodos);
  }, []);

  const handleUpdateCompanyName = useCallback((name) => {
    setCompanyName(name);
  }, []);

  const handleAddMainTopic = useCallback((newTopicName) => {
    const newKey = generateUniqueKey(newTopicName);
    setTopicDefinitions(prevDefs => {
      if (prevDefs[newKey]) {
        return prevDefs;
      }
      return {
        ...prevDefs,
        [newKey]: {
          name: newTopicName,
          topics: [],
        },
      };
    });
  }, []);

  const handleAddSubtopic = useCallback((sectionKey, newSubtopic) => {
    setTopicDefinitions(prevDefs => {
      const updatedDefs = { ...prevDefs };
      let targetSection = null;

      if (updatedDefs[sectionKey] && updatedDefs[sectionKey].topics) {
        targetSection = updatedDefs[sectionKey];
      } else {
        for (const topLevelKey in updatedDefs) {
          const topLevelSection = updatedDefs[topLevelKey];
          if (topLevelSection.subsections && topLevelSection.subsections[sectionKey]) {
            targetSection = topLevelSection.subsections[sectionKey];
            break;
          }
        }
      }

      if (targetSection && targetSection.topics) {
        if (!targetSection.topics.includes(newSubtopic)) {
          targetSection.topics = [...targetSection.topics, newSubtopic];
        }
      } else {
        console.error(`Could not find target topics array for sectionKey: ${sectionKey}`);
      }
      return updatedDefs;
    });
  }, []);

  const handleDeleteTopic = useCallback((topicIdToDelete, topicName) => {
    if (!window.confirm(`Are you sure you want to delete the subtopic "${topicName}"?`)) {
      return;
    }

    setTopicDefinitions(prevDefs => {
      const updatedDefs = { ...prevDefs };
      let foundAndDeleted = false;

      for (const sectionKey in updatedDefs) {
        const section = updatedDefs[sectionKey];

        if (section.topics && generateTopicId(sectionKey, topicName) === topicIdToDelete) {
            section.topics = section.topics.filter(t => t !== topicName);
            foundAndDeleted = true;
            break;
        }
        else if (section.subsections) {
          for (const subKey in section.subsections) {
            const subSection = section.subsections[subKey];
            if (subSection.topics && generateTopicId(subKey, topicName) === topicIdToDelete) {
              subSection.topics = subSection.topics.filter(t => t !== topicName);
              foundAndDeleted = true;
              break;
            }
          }
        }
        if (foundAndDeleted) break;
      }

      if (foundAndDeleted) {
        setTopicStates(prevStates => {
          const newTopicStates = { ...prevStates };
          delete newTopicStates[topicIdToDelete];
          return newTopicStates;
        });
      } else {
        console.warn(`Could not find subtopic to delete with ID: ${topicIdToDelete}`);
      }

      return updatedDefs;
    });
  }, []);

  const handleDeleteSection = useCallback((sectionKeyToDelete, sectionTitle) => {
    if (!window.confirm(`Are you sure you want to delete the entire section "${sectionTitle}"? This will remove all its topics and completion data.`)) {
      return;
    }

    setTopicDefinitions(prevDefs => {
      const updatedDefs = { ...prevDefs };
      let topicsToDeleteFromStates = [];

      if (updatedDefs[sectionKeyToDelete]) {
        const section = updatedDefs[sectionKeyToDelete];
        if (section.topics) {
          topicsToDeleteFromStates = section.topics.map(t => generateTopicId(sectionKeyToDelete, t));
        } else if (section.subsections) {
          Object.values(section.subsections).forEach(sub => {
            if (sub.topics) {
              topicsToDeleteFromStates = topicsToDeleteFromStates.concat(
                sub.topics.map(t => generateTopicId(sub.name.toLowerCase().replace(/\s/g, ''), t))
              );
            }
          });
        }
        delete updatedDefs[sectionKeyToDelete];
      }
      else {
        let found = false;
        for (const topLevelKey in updatedDefs) {
          const topLevelSection = updatedDefs[topLevelKey];
          if (topLevelSection.subsections && topLevelSection.subsections[sectionKeyToDelete]) {
            const subSection = topLevelSection.subsections[sectionKeyToDelete];
            if (subSection.topics) {
              topicsToDeleteFromStates = subSection.topics.map(t => generateTopicId(sectionKeyToDelete, t));
            }
            delete topLevelSection.subsections[sectionKeyToDelete];
            found = true;
            break;
          }
        }
        if (!found) {
          console.warn(`Could not find section to delete with key: ${sectionKeyToDelete}`);
        }
      }

      if (topicsToDeleteFromStates.length > 0) {
        setTopicStates(prevStates => {
          const newTopicStates = { ...prevStates };
          topicsToDeleteFromStates.forEach(id => delete newTopicStates[id]);
          return newTopicStates;
        });
      }

      return updatedDefs;
    });
  }, []);


  const value = {
    topicDefinitions,
    topicStates,
    todos,
    companyName,
    isLoaded,
    handleToggleTopic,
    handleSaveTodos,
    handleUpdateCompanyName,
    handleAddMainTopic,
    handleAddSubtopic,
    handleDeleteTopic,
    handleDeleteSection,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
