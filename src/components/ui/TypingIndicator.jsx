import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1.5 py-2">
      <div className="flex space-x-1.5">
        <div 
          className="w-2 h-2 rounded-full animate-bounce" 
          style={{ 
            backgroundColor: '#9CA3AF',
            animationDelay: '0ms',
            animationDuration: '1.4s'
          }} 
        />
        <div 
          className="w-2 h-2 rounded-full animate-bounce" 
          style={{ 
            backgroundColor: '#9CA3AF',
            animationDelay: '200ms',
            animationDuration: '1.4s'
          }} 
        />
        <div 
          className="w-2 h-2 rounded-full animate-bounce" 
          style={{ 
            backgroundColor: '#9CA3AF',
            animationDelay: '400ms',
            animationDuration: '1.4s'
          }} 
        />
      </div>
    </div>
  );
}
