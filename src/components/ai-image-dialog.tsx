import React, { useState } from 'react';
import { PlaitBoard, getSelectedElements } from '@plait/core';
import { MindElement } from '@plait/mind';
import { processImagesWithAI } from '../services/ai-image';
import { insertImage } from '../data/image';
import { DialogType, DrawnixState } from '../hooks/use-drawnix';

interface AIImageDialogProps {
  board: PlaitBoard | null;
  isOpen: boolean;
  imageUrls: string[];
  onClose: () => void;
  updateAppState: (state: Partial<DrawnixState>) => void;
}

export const AIImageDialog: React.FC<AIImageDialogProps> = ({ board, isOpen, imageUrls, onClose, updateAppState }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    console.log('Handle process called:', { board: !!board, prompt, imageUrls });
    if (!board || !prompt.trim() || imageUrls.length === 0) {
      console.log('Early return:', { hasBoard: !!board, hasPrompt: !!prompt.trim(), hasImages: imageUrls.length > 0 });
      return;
    }

    console.log('Closing dialog and starting processing');
    const currentPrompt = prompt;
    onClose();
    updateAppState({ isProcessingAI: true });

    try {
      const result = await processImagesWithAI(imageUrls, currentPrompt);
      
      if (result.success && result.imageUrl) {
        const response = await fetch(result.imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'ai-processed.png', { type: 'image/png' });
        
        await insertImage(board, file);
      } else {
        alert(`处理失败: ${result.error}`);
      }
    } catch (error) {
      alert(`处理失败: ${error}`);
    } finally {
      updateAppState({ isProcessingAI: false });
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setPrompt(''), 100);
  };

  if (!isOpen || !board) return null;

  console.log('Dialog render - imageUrls:', imageUrls, 'prompt:', prompt);
  
  const isButtonDisabled = loading || !prompt.trim() || imageUrls.length === 0;
  console.log('Button disabled:', isButtonDisabled, { loading, hasPrompt: !!prompt.trim(), hasImages: imageUrls.length > 0 });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: 'white',
          border: '1px solid #e1e5e9',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          minWidth: '400px',
          maxWidth: '500px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ 
          marginBottom: '16px', 
          fontSize: '16px', 
          fontWeight: '600',
          color: '#2c3e50'
        }}>
          🤖 AI 图片处理
        </div>
        
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="输入处理指令，例如：\n• 将图片转为黑白风格\n• 去除背景\n• 增强图片对比度"
          style={{
            width: '100%',
            height: '100px',
            border: '1px solid #e1e5e9',
            borderRadius: '6px',
            padding: '12px',
            resize: 'none',
            fontSize: '14px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: '1.4',
            boxSizing: 'border-box'
          }}
          autoFocus
        />
        
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginTop: '16px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleClose}
            disabled={loading}
            style={{
              background: 'transparent',
              color: '#6c757d',
              border: '1px solid #e1e5e9',
              borderRadius: '6px',
              padding: '10px 20px',
              cursor: loading ? 'default' : 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            取消
          </button>
          
          <button
            onClick={() => {
              console.log('Process button clicked');
              handleProcess();
            }}
            disabled={isButtonDisabled}
            style={{
              background: loading ? '#e9ecef' : '#2c3e50',
              color: loading ? '#6c757d' : 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              cursor: loading || !prompt.trim() || imageUrls.length === 0 ? 'default' : 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {loading ? '🔄 处理中...' : '✨ 处理'}
          </button>
        </div>
      </div>
    </div>
  );
};
