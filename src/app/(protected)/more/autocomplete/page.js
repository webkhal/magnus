'use client';

import React, { useState } from 'react';

const technologies = [
  "JavaScript", "TypeScript", "Python", "Java", "C", "C++", "C#", "Go", "Rust", "Ruby",
  "PHP", "Swift", "Kotlin", "Dart", "R", "Scala", "Perl", "Elixir", "Haskell", "Objective-C",

  "HTML", "CSS", "SASS", "LESS", "Tailwind", "Bootstrap", "Material UI", "Chakra UI", "Styled Components",

  "React", "Next.js", "Vue.js", "Nuxt.js", "Angular", "Svelte", "Solid.js", "Backbone.js", "Ember.js",

  "Node.js", "Express.js", "NestJS", "Fastify", "Koa", "Hapi",

  "MongoDB", "MySQL", "PostgreSQL", "SQLite", "OracleDB", "MariaDB", "Redis", "Firebase", "Supabase",

  "GraphQL", "REST API", "gRPC", "Apollo", "Prisma", "TypeORM", "Sequelize",

  "Git", "GitHub", "GitLab", "Bitbucket", "Docker", "Kubernetes", "Jenkins", "CI/CD", "AWS", "Azure", "GCP", "Netlify", "Vercel",

  "Jest", "Mocha", "Chai", "Vitest", "Cypress", "Playwright", "Testing Library",

  "Webpack", "Vite", "Parcel", "Rollup", "Babel", "ESLint", "Prettier",

  "Postman", "Figma", "Canva", "Photoshop", "Illustrator", "Framer", "Trello", "Notion", "Slack", "Zoom"
];

function Page() {
  const [input, setInput] = useState('');
  const [filteredTechs, setFilteredTechs] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim()) {
      const filtered = technologies.filter((tech) =>
        tech.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTechs(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (tech) => {
    setInput(tech);
    setShowSuggestions(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '50px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f4',
      height: '100vh'
    }}>
      <h2 style={{ marginBottom: '20px' }}>Search Any Technology or Language</h2>
      <div style={{ position: 'relative', width: '320px' }}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Start typing..."
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            outline: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        />
        {showSuggestions && filteredTechs.length > 0 && (
          <ul style={{
            position: 'absolute',
            top: '42px',
            width: '100%',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderTop: 'none',
            borderRadius: '0 0 6px 6px',
            maxHeight: '200px',
            overflowY: 'auto',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            margin: 0,
            padding: 0,
            zIndex: 1000
          }}>
            {filteredTechs.map((tech, index) => (
              <li
                key={index}
                onClick={() => handleSelect(tech)}
                style={{
                  listStyle: 'none',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => e.target.style.background = '#f0f0f0'}
                onMouseOut={(e) => e.target.style.background = 'white'}
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Page;
