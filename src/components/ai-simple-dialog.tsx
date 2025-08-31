import React, { useState, useRef, useEffect } from 'react';
import { PlaitBoard } from '@plait/core';
import { processImagesWithAI } from '../services/ai-image';
import { insertImage } from '../data/image';
import { DrawnixState } from '../hooks/use-drawnix';
import { Send } from 'lucide-react';

interface AISimpleDialogProps {
  board: PlaitBoard | null;
  isOpen: boolean;
  imageUrls: string[];
  imageElementMap: Record<string, string>;
  updateAppState: (state: Partial<DrawnixState>) => void;
}

export const AISimpleDialog: React.FC<AISimpleDialogProps> = ({ 
  board, 
  isOpen, 
  imageUrls, 
  imageElementMap, 
  updateAppState 
}) => {
  const [prompt, setPrompt] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!board || !prompt.trim() || imageUrls.length === 0) return;

    const currentPrompt = prompt;
    const currentImageUrls = [...imageUrls];
    const currentElementMap = {...imageElementMap};
    
    // 关闭对话框，开始处理
    const processingImageIds = Object.values(currentElementMap);
    updateAppState({ 
      openDialogType: null, 
      selectedImageUrls: [], 
      imageElementMap: {},
      processingImages: new Set(processingImageIds)
    });
    setPrompt('');

    // 对每张图片独立处理
    currentImageUrls.forEach(async (imageUrl, index) => {
      const elementId = currentElementMap[imageUrl];
      
      try {
        const result = await processImagesWithAI([imageUrl], currentPrompt);
        
        if (result.success && result.imageUrl) {
          const response = await fetch(result.imageUrl);
          const blob = await response.blob();
          const file = new File([blob], `ai-processed-${index}.png`, { type: 'image/png' });
          
          await insertImage(board, file);
        } else {
          console.error(`处理图片 ${index + 1} 失败:`, result.error);
        }
      } catch (error) {
        console.error(`处理图片 ${index + 1} 出错:`, error);
      } finally {
        // 移除这张图片的处理状态
        updateAppState(prevState => {
          const newProcessing = new Set(prevState.processingImages);
          newProcessing.delete(elementId);
          return { processingImages: newProcessing };
        });
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClose = () => {
    updateAppState({ 
      openDialogType: null, 
      selectedImageUrls: [], 
      imageElementMap: {} 
    });
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
          padding: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          minWidth: '400px',
          maxWidth: '500px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <input
            ref={inputRef}
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入AI处理指令..."
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          />
          
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            style={{
              background: !prompt.trim() ? '#e5e7eb' : '#1f2937',
              color: !prompt.trim() ? '#9ca3af' : 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              cursor: !prompt.trim() ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            <Send size={16} />
          </button>
        </div>
        
        <div style={{
          marginTop: '8px',
          fontSize: '12px',
          color: '#6b7280',
          textAlign: 'center'
        }}>
          已选择 {imageUrls.length} 张图片 • 回车或点击发送
        </div>
      </div>
    </div>
  );
};
