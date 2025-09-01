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
  const inputRef = useRef<HTMLInputElement>(null);

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
      
      // 先创建占位图（默认尺寸 512x512，在画布中心）
      const { Transforms, idCreator } = await import('@plait/core');
      
      const centerX = 200;
      const centerY = 200;
      const width = 512;
      const height = 512;
      
      const placeholderId = idCreator();
      
      // 创建占位图 SVG
      const placeholderUrl = `data:image/svg+xml;base64,${btoa(`
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:0.3">
                <animate attributeName="stop-color" values="#4F46E5;#7C3AED;#EC4899;#4F46E5" dur="2s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:0.3">
                <animate attributeName="stop-color" values="#7C3AED;#EC4899;#4F46E5;#7C3AED" dur="2s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
          </defs>
          <rect width="${width}" height="${height}" fill="url(#gradient)" rx="8"/>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-size="16" font-weight="bold">
            Processing...
          </text>
        </svg>
      `)}`;
      
      const placeholderElement = {
        id: placeholderId,
        type: 'image',
        points: [[centerX, centerY], [centerX + width, centerY + height]],
        url: placeholderUrl,
        width,
        height
      };
      
      Transforms.insertNode(board, placeholderElement, [board.children.length]);
      
      // 调用文本生图API
      const result = await generateImageFromText(currentPrompt);
      
      if (result.success && result.imageUrl) {
        console.log('✅ 文本生图成功:', result.imageUrl);
        
        const response = await fetch(result.imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'text-generated.png', { type: 'image/png' });
        
        // 替换占位图
        const { replaceImageById } = await import('../data/image');
        await replaceImageById(board, placeholderId, file);
      } else {
        console.error('文本生图失败:', result.error);
        // 失败时删除占位图
        const { CoreTransforms } = await import('@plait/core');
        CoreTransforms.removeElements(board, [placeholderElement]);
      }
      
    } catch (error) {
      console.error('文本生图出错:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
        background: 'rgba(0,0,0,0.2)',
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
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          minWidth: '400px',
          maxWidth: '500px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="描述想要生成的图片..."
          disabled={loading}
          style={{
            flex: 1,
            padding: '12px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        />
        
        <button
          onClick={handleSubmit}
          disabled={!prompt.trim() || loading}
          style={{
            background: !prompt.trim() || loading ? '#e5e7eb' : '#8B5CF6',
            color: !prompt.trim() || loading ? '#9ca3af' : 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '12px',
            cursor: !prompt.trim() || loading ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '48px'
          }}
        >
          <div style={{ width: '16px', height: '16px' }}>
            {WandIcon}
          </div>
        </button>
      </div>
    </div>
  );
};