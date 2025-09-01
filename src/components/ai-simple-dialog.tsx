import React, { useState, useRef, useEffect } from 'react';
import { PlaitBoard, getSelectedElements } from '@plait/core';
import { processImagesWithAI } from '../services/ai-image';
import { insertPlaceholderImage, replaceImageById, insertImageAtPosition } from '../data/image';
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
    
    // 关闭对话框
    updateAppState({ 
      openDialogType: null, 
      selectedImageUrls: [], 
      imageElementMap: {}
    });
    setPrompt('');

    // 插入占位图片（使用已排序的图片数据）
    const placeholderId = insertPlaceholderImage(board, currentImageUrls, currentElementMap);
    console.log('📝 插入占位图片，元素ID:', placeholderId);
    
    try {
      // 批量处理所有图片
      const result = await processImagesWithAI(currentImageUrls, currentPrompt);
      
      if (result.success) {
        // 获取所有结果图片URL
        const resultUrls = result.imageUrls || (result.imageUrl ? [result.imageUrl] : []);
        
        if (resultUrls.length > 0) {
          console.log('🎯 按API返回顺序处理图片:', resultUrls.length, '张');
          
          // 使用第一张结果图片（API返回的第1张）替换占位图片
          console.log('📍 处理第1张结果图片，替换占位图');
          const response = await fetch(resultUrls[0]);
          const blob = await response.blob();
          const file = new File([blob], 'ai-result-1.png', { type: 'image/png' });
          
          const replaceResult = await replaceImageById(board, placeholderId, file);
          if (replaceResult) {
            console.log('✅ 第1张结果图片已替换占位图');
            
            // 从第2张开始，在第1张右侧依次插入
            for (let i = 1; i < resultUrls.length; i++) {
              console.log(`📍 处理第${i + 1}张结果图片，插入右侧位置${i}`);
              const response = await fetch(resultUrls[i]);
              const blob = await response.blob();
              const file = new File([blob], `ai-result-${i + 1}.png`, { type: 'image/png' });
              
              // 计算右侧位置：第一张图右边缘 + 10px间距 + (图片宽度+10px间距) * (索引-1)
              const rightPosition: Point = [
                replaceResult.position[0] + replaceResult.width + 10 + (replaceResult.width + 10) * (i - 1), 
                replaceResult.position[1]
              ];
              await insertImageAtPosition(board, file, rightPosition, replaceResult.width, i);
              console.log(`✅ 第${i + 1}张结果图片已插入位置:`, rightPosition);
            }
          } else {
            console.log('❌ 未找到占位图片');
          }
        } else {
          console.error('API没有返回图片URL');
        }
      } else {
        console.error('AI处理失败:', result.error);
      }
    } catch (error) {
      console.error('AI处理出错:', error);
      // 失败时可以考虑删除占位图片，但为了调试保留
    }
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
