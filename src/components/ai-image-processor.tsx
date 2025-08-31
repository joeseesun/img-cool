import React, { useState, useEffect } from 'react';
import { PlaitBoard } from '@plait/core';
import { processSelectedImagesWithAI } from '../plugins/with-ai-image';

interface AIImageProcessorProps {
  board: PlaitBoard | null;
}

export const AIImageProcessor: React.FC<AIImageProcessorProps> = ({ board }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!board) return;

    window.__drawnix_ai_image_handler = {
      showMenu: (targetBoard, pos) => {
        setPosition(pos);
        setVisible(true);
        setPrompt('');
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (visible && !target.closest('[data-ai-menu]')) {
        setVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      delete window.__drawnix_ai_image_handler;
      document.removeEventListener('click', handleClickOutside);
    };
  }, [board, visible]);

  const handleProcess = async () => {
    if (!board || !prompt.trim()) return;

    setLoading(true);
    try {
      const success = await processSelectedImagesWithAI(board, prompt);
      if (success) {
        setVisible(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setVisible(false);
    setPrompt('');
  };

  if (!visible || !board) return null;

  return (
    <div
      data-ai-menu
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        background: 'white',
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        minWidth: '320px',
        maxWidth: '400px'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ 
        marginBottom: '12px', 
        fontSize: '14px', 
        fontWeight: '600',
        color: '#2c3e50'
      }}>
        🤖 AI 图片处理
      </div>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="输入处理指令，例如：&#10;• 将图片转为黑白风格&#10;• 去除背景&#10;• 增强图片对比度"
        style={{
          width: '100%',
          height: '80px',
          border: '1px solid #e1e5e9',
          borderRadius: '6px',
          padding: '12px',
          resize: 'none',
          fontSize: '13px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: '1.4'
        }}
        autoFocus
      />
      
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginTop: '12px',
        justifyContent: 'flex-end'
      }}>
        <button
          onClick={handleClose}
          style={{
            background: 'transparent',
            color: '#6c757d',
            border: '1px solid #e1e5e9',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500'
          }}
        >
          取消
        </button>
        
        <button
          onClick={handleProcess}
          disabled={loading || !prompt.trim()}
          style={{
            background: loading ? '#e9ecef' : '#007AFF',
            color: loading ? '#6c757d' : 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: loading ? 'default' : 'pointer',
            fontSize: '13px',
            fontWeight: '500'
          }}
        >
          {loading ? '🔄 处理中...' : '✨ 处理'}
        </button>
      </div>
    </div>
  );
};