// // app/layout.js
// import './globals.css';
// import { DataProvider } from './data-context'; // Import DataProvider

// export const metadata = {
//   title: 'Ultimate Placement Preparation Platform',
//   description: 'Prepare for your placements with this interactive platform.',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <svg width="0" height="0" style={{ position: 'absolute' }}>
//           <defs>
//             <linearGradient id="gradientPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" style={{ stopColor: '#58a6ff' }} />
//               <stop offset="100%" style={{ stopColor: '#bc8cff' }} />
//             </linearGradient>
//           </defs>
//         </svg>
//         <DataProvider> {/* Wrap children with DataProvider */}
//           {children}
//         </DataProvider>
//       </body>
//     </html>
//   );
// }

// app/layout.js
import './globals.css';
import { DataProvider } from './data-context';

export const metadata = {
  title: 'Ultimate Placement Preparation Platform',
  description: 'Prepare for your placements with this interactive platform.',
};

export default function RootLayout({ children }) {
  return (
    // Add suppressHydrationWarning to the <html> tag
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="gradientPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#58a6ff' }} />
              <stop offset="100%" style={{ stopColor: '#bc8cff' }} />
            </linearGradient>
          </defs>
        </svg>
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
