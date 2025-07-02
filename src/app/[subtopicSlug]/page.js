// app/[subtopicSlug]/page.js
"use client";

import React, { useEffect, useState, use } from 'react';
import DashboardLayout from '../dashboard-layout';
import { useData } from '../data-context';
import { markdownToHtml } from '@/lib/markdown';

export default function SubtopicPage({ params }) {
  // Use React.use() to unwrap the params Promise
  const resolvedParams = use(params);
  const { subtopicSlug } = resolvedParams;

  const [markdownContent, setMarkdownContent] = useState('');
  const [subtopicTitle, setSubtopicTitle] = useState('');
  const { isLoaded, topicDefinitions } = useData();

  useEffect(() => {
    if (!isLoaded || Object.keys(topicDefinitions).length === 0) {
      return; // Wait for data to load
    }

    const findTopicNameAndContent = async () => {
      let foundTopicName = '';
      let markdownFileName = '';

      const slugify = (text) => {
        return text.toString().toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/--+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '');
      };

      for (const sectionKey in topicDefinitions) {
        const section = topicDefinitions[sectionKey];

        if (section.topics) {
          for (const topic of section.topics) {
            if (slugify(topic) === subtopicSlug) {
              foundTopicName = topic;
              markdownFileName = slugify(topic);
              break;
            }
          }
        } else if (section.subsections) {
          for (const subKey in section.subsections) {
            const subSection = section.subsections[subKey];
            for (const topic of subSection.topics) {
              if (slugify(topic) === subtopicSlug) {
                foundTopicName = topic;
                markdownFileName = slugify(topic);
                break;
              }
            }
            if (foundTopicName) break;
          }
        }
        if (foundTopicName) break;
      }

      setSubtopicTitle(foundTopicName || subtopicSlug.replace(/-/g, ' '));

      if (markdownFileName) {
        try {
          const response = await fetch(`/content/${markdownFileName}.md`);
          if (response.ok) {
            const markdownText = await response.text();
            const htmlContent = await markdownToHtml(markdownText);
            setMarkdownContent(htmlContent);
          } else {
            setMarkdownContent(`<h2>Content Not Found for "${foundTopicName}"</h2><p><i>Markdown file not found at /content/${markdownFileName}.md</i></p>`);
          }
        } catch (error) {
          console.error("Error fetching or processing markdown:", error);
          setMarkdownContent(`<h2>Error Loading Content</h2><p><i>Could not load content for "${foundTopicName}".</i></p>`);
        }
      } else {
        setMarkdownContent(`<h2>Subtopic Not Recognized</h2><p><i>No content mapping found for "${subtopicSlug}".</i></p>`);
      }
    };

    findTopicNameAndContent();
  }, [subtopicSlug, isLoaded, topicDefinitions]);

  return (
    <DashboardLayout>
      <div className="content-area">
        <h2 className="section-title">{subtopicTitle}</h2>
        <div className="markdown-content" dangerouslySetInnerHTML={{ __html: markdownContent }} />
      </div>
    </DashboardLayout>
  );
}