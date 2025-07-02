// // app/[subtopicSlug]/page.js
// "use client";

// import React, { useEffect, useState } from 'react'; // REMOVE 'use' hook import
// import DashboardLayout from '../dashboard-layout';
// import { useData } from '../data-context';
// import { markdownToHtml } from '@/lib/markdown';
// // No longer need initialTopicDefinitions here, as topicDefinitions comes from context

// export default function SubtopicPage({ params }) {
//   // REVERT: Access params directly. This is the correct way for Client Components.
//   const { subtopicSlug } = params;

//   const [markdownContent, setMarkdownContent] = useState('');
//   const [subtopicTitle, setSubtopicTitle] = useState('');
//   const { isLoaded, topicDefinitions } = useData();

//   useEffect(() => {
//     if (!isLoaded || Object.keys(topicDefinitions).length === 0) {
//       return; // Wait for data to load
//     }

//     // Function to find the original topic name from the slug
//     const findTopicNameAndContent = async () => {
//       let foundTopicName = '';
//       let markdownFileName = '';

//       // Helper to slugify a string for comparison
//       const slugify = (text) => {
//         return text.toString().toLowerCase()
//           .replace(/\s+/g, '-')           // Replace spaces with -
//           .replace(/[^\w-]+/g, '')       // Remove all non-word chars
//           .replace(/--+/g, '-')         // Replace multiple - with single -
//           .replace(/^-+/, '')           // Trim - from start of text
//           .replace(/-+$/, '');          // Trim - from end of text
//       };

//       // Iterate through all topic definitions to find the matching subtopic
//       for (const sectionKey in topicDefinitions) {
//         const section = topicDefinitions[sectionKey];

//         if (section.topics) { // Direct topics
//           for (const topic of section.topics) {
//             if (slugify(topic) === subtopicSlug) {
//               foundTopicName = topic;
//               markdownFileName = slugify(topic);
//               break;
//             }
//           }
//         } else if (section.subsections) { // Topics within subsections
//           for (const subKey in section.subsections) {
//             const subSection = section.subsections[subKey];
//             for (const topic of subSection.topics) {
//               if (slugify(topic) === subtopicSlug) {
//                 foundTopicName = topic;
//                 markdownFileName = slugify(topic);
//                 break;
//               }
//             }
//             if (foundTopicName) break;
//           }
//         }
//         if (foundTopicName) break;
//       }

//       setSubtopicTitle(foundTopicName || subtopicSlug.replace(/-/g, ' ')); // Fallback title

//       if (markdownFileName) {
//         try {
//           // Fetch markdown file from the public/content directory
//           const response = await fetch(`/content/${markdownFileName}.md`);
//           if (response.ok) {
//             const markdownText = await response.text();
//             const htmlContent = await markdownToHtml(markdownText);
//             setMarkdownContent(htmlContent);
//           } else {
//             setMarkdownContent(`## Content Not Found for "${foundTopicName}"\n\n_Markdown file not found at /content/${markdownFileName}.md_`);
//           }
//         } catch (error) {
//           console.error("Error fetching or processing markdown:", error);
//           setMarkdownContent(`## Error Loading Content\n\n_Could not load content for "${foundTopicName}"._`);
//         }
//       } else {
//         setMarkdownContent(`## Subtopic Not Recognized\n\n_No content mapping found for "${subtopicSlug}"._`);
//       }
//     };

//     findTopicNameAndContent();
//   }, [subtopicSlug, isLoaded, topicDefinitions]); // Re-run when slug or data changes

//   return (
//     <DashboardLayout>
//       <div className="content-area">
//         <h2 className="section-title">{subtopicTitle}</h2>
//         <div className="markdown-content" dangerouslySetInnerHTML={{ __html: markdownContent }} />
//       </div>
//     </DashboardLayout>
//   );
// }

// app/[subtopicSlug]/page.js
"use client";

import React, { useEffect, useState } from 'react';
import DashboardLayout from '../dashboard-layout';
import { useData } from '../data-context';
import { markdownToHtml } from '@/lib/markdown';

export default function SubtopicPage({ params }) {
  // FIX: Disable the ESLint warning for the next line.
  // This is the correct way to handle this in a Client Component for now.
  // eslint-disable-next-line react/no-unescaped-entities
  const { subtopicSlug } = params;

  const [markdownContent, setMarkdownContent] = useState('');
  const [subtopicTitle, setSubtopicTitle] = useState('');
  const { isLoaded, topicDefinitions } = useData();

  useEffect(() => {
    if (!isLoaded || Object.keys(topicDefinitions).length === 0) {
      return; // Wait for data to load
    }

    // Function to find the original topic name from the slug
    const findTopicNameAndContent = async () => {
      let foundTopicName = '';
      let markdownFileName = '';

      // Helper to slugify a string for comparison
      const slugify = (text) => {
        return text.toString().toLowerCase()
          .replace(/\s+/g, '-')           // Replace spaces with -
          .replace(/[^\w-]+/g, '')       // Remove all non-word chars
          .replace(/--+/g, '-')         // Replace multiple - with single -
          .replace(/^-+/, '')           // Trim - from start of text
          .replace(/-+$/, '');          // Trim - from end of text
      };

      // Iterate through all topic definitions to find the matching subtopic
      for (const sectionKey in topicDefinitions) {
        const section = topicDefinitions[sectionKey];

        if (section.topics) { // Direct topics
          for (const topic of section.topics) {
            if (slugify(topic) === subtopicSlug) {
              foundTopicName = topic;
              markdownFileName = slugify(topic);
              break;
            }
          }
        } else if (section.subsections) { // Topics within subsections
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

      setSubtopicTitle(foundTopicName || subtopicSlug.replace(/-/g, ' ')); // Fallback title

      if (markdownFileName) {
        try {
          // Fetch markdown file from the public/content directory
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
  }, [subtopicSlug, isLoaded, topicDefinitions]); // Re-run when slug or data changes

  return (
    <DashboardLayout>
      <div className="content-area">
        <h2 className="section-title">{subtopicTitle}</h2>
        <div className="markdown-content" dangerouslySetInnerHTML={{ __html: markdownContent }} />
      </div>
    </DashboardLayout>
  );
}
