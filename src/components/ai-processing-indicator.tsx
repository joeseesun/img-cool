import React from 'react';

interface AIProcessingIndicatorProps {
  isProcessing: boolean;
}

export const AIProcessingIndicator: React.FC<AIProcessingIndicatorProps> = ({ isProcessing }) => {
  if (!isProcessing) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
        backgroundSize: '300% 300%',
        animation: 'gradientShift 2s ease infinite',
        padding: '12px 20px',
        borderRadius: '25px',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        zIndex: 1001,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'white',
          animation: 'pulse 1s ease-in-out infinite'
        }}
      />
      🤖 AI正在处理图片...
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};
