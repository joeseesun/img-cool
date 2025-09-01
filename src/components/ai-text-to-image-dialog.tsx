import React, { useState, useRef, useEffect } from 'react';
import { PlaitBoard } from '@plait/core';
import { insertImage } from '../data/image';
import { DrawnixState } from '../hooks/use-drawnix';
import { generateImageFromText } from '../services/text-to-image';
import { WandIcon } from './icons';

interface AITextToImageDialogProps {
  board: PlaitBoard | null;
  isOpen: boolean;
  updateAppState: (state: Partial<DrawnixState>) => void;
}

export const AITextToImageDialog: React.FC<AITextToImageDialogProps> = ({ 
  board, 
  isOpen, 
  updateAppState 
}) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!board || !prompt.trim()) return;

    setLoading(true);
    const currentPrompt = prompt;
    
    try {
      console.log('🎨 文本生图请求:', currentPrompt);
      
      // 关闭对话框
      updateAppState({ openDialogType: null });
      setPrompt('');
      
      // 调用文本生图API
      const result = await generateImageFromText(currentPrompt);
      
      if (result.success && result.imageUrl) {
        console.log('✅ 文本生图成功:', result.imageUrl);
        
        if (result.imageUrl.startsWith('data:')) {
          // base64格式直接处理
          const response = await fetch(result.imageUrl);
          const blob = await response.blob();
          const file = new File([blob], 'text-generated.png', { type: 'image/png' });
          await insertImage(board, file);
        } else {
          // URL格式需要下载
          const response = await fetch(result.imageUrl);
          const blob = await response.blob();
          const file = new File([blob], 'text-generated.png', { type: 'image/png' });
          await insertImage(board, file);
        }
      } else {
        console.error('文本生图失败:', result.error);
      }
      
    } catch (error) {
      console.error('文本生图出错:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClose = () => {
    updateAppState({ openDialogType: null });
    setPrompt('');
  };

  if (!isOpen || !board) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.4)',
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
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          minWidth: '500px',
          maxWidth: '600px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{ width: '20px', height: '20px', color: '#8B5CF6' }}>
            {WandIcon}
          </div>
          <span style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937'
          }}>
            文本生成图片
          </span>
        </div>
        
        <textarea
          ref={inputRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="描述你想要生成的图片..."
          style={{
            width: '100%',
            height: '120px',
            padding: '16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            resize: 'vertical',
            lineHeight: '1.5'
          }}
        />
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#6b7280'
          }}>
            Command+Enter 生成
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleClose}
              disabled={loading}
              style={{
                background: 'transparent',
                color: '#6b7280',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '10px 20px',
                cursor: loading ? 'default' : 'pointer',
                fontSize: '14px'
              }}
            >
              取消
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={!prompt.trim() || loading}
              style={{
                background: !prompt.trim() || loading ? '#e5e7eb' : '#8B5CF6',
                color: !prompt.trim() || loading ? '#9ca3af' : 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                cursor: !prompt.trim() || loading ? 'default' : 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <div style={{ width: '16px', height: '16px' }}>
                {WandIcon}
              </div>
              {loading ? '生成中...' : '生成图片'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};