import React, { useState } from 'react';
import { PlaitBoard, getSelectedElements, Point } from '@plait/core';
import { MindElement } from '@plait/mind';
import { processImagesWithAI } from '../services/ai-image';
import { insertImage } from '../data/image';
import { DialogType, DrawnixState } from '../hooks/use-drawnix';
import { insertPlaceholderImage, replaceImageById, insertImageAtPosition } from '../data/image';

interface AIImageDialogProps {
  board: PlaitBoard | null;
  isOpen: boolean;
  imageUrls: string[];
  imageElementMap: Record<string, string>;
  onClose: () => void;
  updateAppState: (state: Partial<DrawnixState>) => void;
}

export const AIImageDialog: React.FC<AIImageDialogProps> = ({ board, isOpen, imageUrls, imageElementMap, onClose, updateAppState }) => {
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
    const currentImageUrls = [...imageUrls];
    const currentElementMap = {...imageElementMap};
    
    // 先关闭对话框并清空相关状态
    updateAppState({ 
      openDialogType: null, 
      selectedImageUrls: [], 
      imageElementMap: {} 
    });

    // 使用占位图片法批量处理（使用已排序的图片数据）
    const placeholderId = insertPlaceholderImage(board, currentImageUrls, currentElementMap);
    
    try {
      const result = await processImagesWithAI(currentImageUrls, currentPrompt);
      
      if (result.success) {
        const resultUrls = result.imageUrls || (result.imageUrl ? [result.imageUrl] : []);
        
        if (resultUrls.length > 0) {
          // 使用第一张结果图片替换占位图片
          const response = await fetch(resultUrls[0]);
          const blob = await response.blob();
          const file = new File([blob], 'ai-processed.png', { type: 'image/png' });
          
          const replaceResult = await replaceImageById(board, placeholderId, file);
          if (replaceResult) {
            // 如果有多张结果，在第一张图右侧依次插入
            for (let i = 1; i < resultUrls.length; i++) {
              const response = await fetch(resultUrls[i]);
              const blob = await response.blob();
              const file = new File([blob], `ai-processed-${i}.png`, { type: 'image/png' });
              
              const rightPosition: Point = [
                replaceResult.position[0] + replaceResult.width + 10 + (replaceResult.width + 10) * (i - 1), 
                replaceResult.position[1]
              ];
              await insertImageAtPosition(board, file, rightPosition, replaceResult.width, i);
            }
          }
        }
      }
    } catch (error) {
      console.error('AI处理出错:', error);
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
