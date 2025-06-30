// app/components/TopicItem.js
"use client";
import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import { Trash2 } from "lucide-react";
import Link from 'next/link'; // Import Link

const TopicItem = ({ topic, topicId, isCompleted, onToggle, onDelete }) => {

    // Helper to slugify a string for the URL
  const slugify = (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w-]+/g, '')       // Remove all non-word chars
      .replace(/--+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')           // Trim - from start of text
      .replace(/-+$/, '');          // Trim - from end of text
  };

  const subtopicSlug = slugify(topic);


  // Added onDelete prop
  return (
    <li
      className={`topic-item ${isCompleted ? "completed" : ""}`}
      data-topic-id={topicId}
    >
      <ToggleSwitch isActive={isCompleted} onToggle={() => onToggle(topicId)} />
      <div className="topic-item2">
      <Link href={`/${subtopicSlug}`} passHref style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
           <span>{topic}</span>
      </Link>
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

// // app/components/TopicItem.js
// "use client";
// import React from 'react';
// import ToggleSwitch from './ToggleSwitch';
// import Link from 'next/link'; // Import Link

// const TopicItem = ({ topic, topicId, isCompleted, onToggle, onDelete }) => {
//   // Helper to slugify a string for the URL
//   const slugify = (text) => {
//     return text.toString().toLowerCase()
//       .replace(/\s+/g, '-')           // Replace spaces with -
//       .replace(/[^\w-]+/g, '')       // Remove all non-word chars
//       .replace(/--+/g, '-')         // Replace multiple - with single -
//       .replace(/^-+/, '')           // Trim - from start of text
//       .replace(/-+$/, '');          // Trim - from end of text
//   };

//   const subtopicSlug = slugify(topic);

//   return (
//     <li className={`topic-item ${isCompleted ? 'completed' : ''}`} data-topic-id={topicId}>
//       <div className="topic-item2"> {/* Your existing wrapper for content */}
//         <ToggleSwitch isActive={isCompleted} onToggle={() => onToggle(topicId)} />
//         {/* Use Link for navigation */}
//         <Link href={`/${subtopicSlug}`} passHref style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
//           <span>{topic}</span>
//         </Link>
//       </div>
//       {/* Delete button */}
//       <button
//         className="delete-btn"
//         onClick={(e) => {
//           e.stopPropagation();
//           onDelete(topicId, topic);
//         }}
//         title={`Delete "${topic}"`}
//       >
//         &#x2715;
//       </button>
//     </li>
//   );
// };
// export default TopicItem;
