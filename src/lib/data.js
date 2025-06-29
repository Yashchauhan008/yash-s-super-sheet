// lib/data.js
export const initialTopicDefinitions = {
    aptitude: {
        name: "Aptitude",
        subsections: {
            quant: { name: "Quantitative Aptitude", topics: ["Number System", "Percentages", "Profit & Loss", "Time & Work", "Time, Speed, Distance", "Permutation & Combination", "Probability"] },
            logical: { name: "Logical Reasoning", topics: ["Coding-Decoding", "Blood Relations", "Direction Sense", "Seating Arrangement", "Syllogism", "Data Interpretation"] },
            verbal: { name: "Verbal Ability", topics: ["Reading Comprehension", "Synonyms & Antonyms", "Para Jumbles", "Sentence Correction", "Vocabulary"] }
        }
    },
    oop: {
        name: "OOP",
        topics: ["Classes & Objects", "Encapsulation", "Inheritance", "Polymorphism", "Abstraction", "SOLID Principles", "Design Patterns"]
    },
    dsa: {
        name: "DSA",
        topics: ["Arrays & Strings", "Linked Lists", "Stacks & Queues", "Trees (BST, AVL)", "Heaps", "Graphs", "Hashing", "Sorting Algorithms", "Searching Algorithms", "Dynamic Programming", "Greedy Algorithms", "Backtracking", "Complexity Analysis"]
    },
    database: {
        name: "Database",
        topics: ["SQL Queries (Joins, Subqueries)", "Normalization (1NF, 2NF, 3NF)", "ACID Properties", "Indexing & Optimization", "NoSQL Databases", "ER Diagrams"]
    },
    security: {
        name: "Cyber Security",
        topics: ["Cryptography (Symmetric/Asymmetric)", "Network Security (Firewalls, IDS/IPS)", "Web Security (XSS, CSRF, SQLi)", "OWASP Top 10", "Authentication & Authorization", "Malware Analysis"]
    },
    networks: {
        name: "Computer Networks",
        topics: ["OSI Model", "TCP/IP Suite", "HTTP/HTTPS", "DNS", "IP Addressing (IPv4/IPv6)", "Routing Protocols (OSPF, BGP)", "Transport Layer (TCP/UDP)"]
    },
    swe: {
        name: "Software Engineering",
        subsections: {
            sdlc: { name: "Software Development Life Cycle", topics: ["Requirement Analysis", "Design", "Implementation", "Testing", "Deployment", "Maintenance"] },
            methods: { name: "Methodologies & Tools", topics: ["Agile (Scrum, Kanban)", "Waterfall Model", "Version Control (Git)", "CI/CD Pipelines", "Microservices Architecture", "Testing Methodologies"] }
        }
    }
};

export const generateTopicId = (section, topic) => {
    // Ensure section is a string and handle potential non-alphanumeric characters
    const safeSection = String(section).toLowerCase().replace(/[^a-z0-9]/g, '');
    const safeTopic = String(topic).toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${safeSection}-${safeTopic}`;
};

export const companySpecificInfo = {
    google: "Focus on algorithms, system design, and Googleyness.",
    microsoft: "Emphasize problem-solving, coding skills, and cultural fit.",
    amazon: "Master the Leadership Principles. Focus on scalability."
};

// Helper to generate a unique key for new main topics
export const generateUniqueKey = (name) => {
    return name.toLowerCase().replace(/\s/g, '').replace(/[^a-z0-9]/g, '');
};
