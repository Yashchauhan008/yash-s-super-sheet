// // app/components/CodeExample.js
// "use client";

// import React, { useState, useEffect } from 'react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// const CodeExample = ({ title, description, solutions }) => {
//   // If there are no solutions, don't render anything.
//   if (!solutions || solutions.length === 0) {
//     return null;
//   }

//   // State to keep track of the selected language index. Default to the first one.
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   // Reset to the first tab if the solutions prop changes.
//   useEffect(() => {
//     setSelectedIndex(0);
//   }, [solutions]);

//   const selectedSolution = solutions[selectedIndex];

//   return (
//     <div className="code-example-container">
//       <h3 className="code-example-title">{title}</h3>
//       <p className="code-example-description">{description}</p>
//       <div className="code-block-wrapper">
//         {/* Language Tabs */}
//         <div className="language-tabs">
//           {solutions.map((solution, index) => (
//             <button
//               key={index}
//               className={`language-tab ${index === selectedIndex ? 'active' : ''}`}
//               onClick={() => setSelectedIndex(index)}
//             >
//               {solution.language.toUpperCase()}
//             </button>
//           ))}
//         </div>

//         {/* Syntax Highlighter */}
//         <SyntaxHighlighter
//           language={selectedSolution.language}
//           style={oneDark}
//           showLineNumbers={true}
//           wrapLines={true}
//           customStyle={{
//             margin: 0,
//             borderRadius: '0 0 8px 8px',
//             borderTop: '1px solid #30363d' // Add a separator line
//           }}
//         >
//           {selectedSolution.code}
//         </SyntaxHighlighter>
//       </div>
//     </div>
//   );
// };

// export default CodeExample;
// app/components/CodeExample.js
"use client";

import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeExample = ({ title, description, solutions }) => {
  // FIX: Call hooks at the top level, before any conditions or returns.
  const [selectedIndex, setSelectedIndex] = useState(0);

  // This effect is now safe to call here.
  useEffect(() => {
    // Reset to the first tab if the solutions prop changes.
    setSelectedIndex(0);
  }, [solutions]);

  // FIX: Handle the early return condition after the hooks.
  if (!solutions || solutions.length === 0) {
    return null; // Now it's safe to return early.
  }

  const selectedSolution = solutions[selectedIndex];

  // This check is an extra safeguard in case the selectedIndex is out of bounds.
  if (!selectedSolution) {
    return null;
  }

  return (
    <div className="code-example-container">
      <h3 className="code-example-title">{title}</h3>
      <p className="code-example-description">{description}</p>
      <div className="code-block-wrapper">
        {/* Language Tabs */}
        <div className="language-tabs">
          {solutions.map((solution, index) => (
            <button
              key={index}
              className={`language-tab ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => setSelectedIndex(index)}
            >
              {solution.language.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Syntax Highlighter */}
        <SyntaxHighlighter
          language={selectedSolution.language}
          style={vscDarkPlus}
          showLineNumbers={true}
          wrapLines={true}
          customStyle={{
            margin: 0,
            borderRadius: '0 0 8px 8px',
            background: '#1E1E1E',
            borderTop: '1px solid #30363d'
          }}
        >
          {selectedSolution.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeExample;
