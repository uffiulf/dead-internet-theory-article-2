import React from 'react';

export default function Layout({ children }) {
  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        background: `
          radial-gradient(ellipse at top, rgba(30, 30, 30, 0.3) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, rgba(20, 20, 20, 0.3) 0%, transparent 50%),
          linear-gradient(to bottom, var(--color-dark-bg) 0%, var(--color-dark-surface) 20%, var(--color-dark-bg) 40%, var(--color-dark-surface) 60%, var(--color-dark-bg) 80%, var(--color-dark-surface) 100%)
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      <main className="relative">
        {children}
      </main>
    </div>
  );
}

