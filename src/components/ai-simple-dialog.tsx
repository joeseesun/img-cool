import React, { useState, useRef, useEffect } from 'react';
import { PlaitBoard, getSelectedElements, Point, Transforms } from '@plait/core';
import { processImagesWithAI } from '../services/ai-image';
import { insertPlaceholderImage, replaceImageById, insertImageAtPosition, replaceGeometryWithImage } from '../data/image';
import { DrawnixState } from '../hooks/use-drawnix';
import { Send } from 'lucide-react';

interface AISimpleDialogProps {
  board: PlaitBoard | null;
  isOpen: boolean;
  imageUrls: string[];
  imageElementMap: Record<string, string>;
  updateAppState: (state: Partial<DrawnixState>) => void;
}

// 彩虹色循环
const rainbowColors = ['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#8800ff'];
let loadingIntervals: Map<string, NodeJS.Timeout> = new Map();

// 辅助函数：为几何图形添加loading动画
const addLoadingAnimationToGeometry = (board: PlaitBoard, elementId: string) => {
  const elementPath = board.children.findIndex(el => el.id === elementId);
  if (elementPath >= 0) {
    const element = board.children[elementPath] as any;
    const originalStrokeColor = element.strokeColor || '#000000';
    
    // 保存原始颜色
    Transforms.setNode(board, { 
      originalStrokeColor: originalStrokeColor,
      isProcessing: true 
    }, [elementPath]);
    
    // 启动颜色循环动画
    let colorIndex = 0;
    const interval = setInterval(() => {
      const currentElementPath = board.children.findIndex(el => el.id === elementId);
      if (currentElementPath >= 0) {
        Transforms.setNode(board, { 
          strokeColor: rainbowColors[colorIndex]
        }, [currentElementPath]);
        colorIndex = (colorIndex + 1) % rainbowColors.length;
      } else {
        // 元素已被删除，清理动画
        clearInterval(interval);
        loadingIntervals.delete(elementId);
      }
    }, 300); // 每300ms换一种颜色
    
    loadingIntervals.set(elementId, interval);
    console.log('✨ 为几何图形添加loading动画:', elementId);
  }
};

// 辅助函数：移除几何图形的loading动画
const removeLoadingAnimationFromGeometry = (board: PlaitBoard, elementId: string) => {
  // 停止颜色循环
  const interval = loadingIntervals.get(elementId);
  if (interval) {
    clearInterval(interval);
    loadingIntervals.delete(elementId);
  }
  
  const elementPath = board.children.findIndex(el => el.id === elementId);
  if (elementPath >= 0) {
    const element = board.children[elementPath] as any;
    // 恢复原始颜色
    const originalColor = element.originalStrokeColor || '#000000';
    Transforms.setNode(board, { 
      strokeColor: originalColor,
      isProcessing: false,
      originalStrokeColor: undefined 
    }, [elementPath]);
    console.log('🎯 移除几何图形loading动画:', elementId);
  }
};

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
    
    // 检查是否有几何图形（通过imageElementMap中的元素ID）
    const geometryElementIds: string[] = [];
    const imageElementIds: string[] = [];
    
    Object.values(currentElementMap).forEach(elementId => {
      const element = board.children.find(el => el.id === elementId);
      if (element?.type === 'geometry') {
        geometryElementIds.push(elementId);
      } else if (element?.type === 'image') {
        imageElementIds.push(elementId);
      }
    });
    
    // 关闭对话框
    updateAppState({ 
      openDialogType: null, 
      selectedImageUrls: [], 
      imageElementMap: {}
    });
    setPrompt('');

    let placeholderId = '';
    
    // 对于几何图形，不插入占位图片，直接处理
    if (geometryElementIds.length === 0) {
      // 只有普通图片时，才插入占位图片
      placeholderId = insertPlaceholderImage(board, currentImageUrls, currentElementMap);
      console.log('📝 插入占位图片，元素ID:', placeholderId);
    } else {
      console.log('🎨 几何图形处理，无需占位图片');
      // 为所有几何图形添加loading动画
      geometryElementIds.forEach(elementId => {
        addLoadingAnimationToGeometry(board, elementId);
      });
    }
    
    try {
      // 批量处理所有图片
      const result = await processImagesWithAI(currentImageUrls, currentPrompt);
      
      if (result.success) {
        // 获取所有结果图片URL
        const resultUrls = result.imageUrls || (result.imageUrl ? [result.imageUrl] : []);
        
        if (resultUrls.length > 0) {
          console.log('🎯 按API返回顺序处理图片:', resultUrls.length, '张');
          console.log('🔍 几何图形元素:', geometryElementIds.length, '个');
          console.log('📷 图片元素:', imageElementIds.length, '个');
          
          // 使用第一张结果图片替换第一个元素
          console.log('📍 处理第1张结果图片');
          const response = await fetch(resultUrls[0]);
          const blob = await response.blob();
          const file = new File([blob], 'ai-result-1.png', { type: 'image/png' });
          
          let replaceResult;
          
          // 如果第一个元素是几何图形，直接替换几何图形
          if (geometryElementIds.length > 0) {
            console.log('🎨 替换几何图形为AI生成的图片');
            // 移除loading动画
            removeLoadingAnimationFromGeometry(board, geometryElementIds[0]);
            replaceResult = await replaceGeometryWithImage(board, geometryElementIds[0], file);
          } else {
            // 否则替换占位图片
            console.log('📷 替换占位图片');
            replaceResult = await replaceImageById(board, placeholderId, file);
          }
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
        // 失败时移除所有几何图形的loading动画
        geometryElementIds.forEach(elementId => {
          removeLoadingAnimationFromGeometry(board, elementId);
        });
      }
    } catch (error) {
      console.error('AI处理出错:', error);
      // 失败时移除所有几何图形的loading动画
      geometryElementIds.forEach(elementId => {
        removeLoadingAnimationFromGeometry(board, elementId);
      });
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
    // 清理所有loading动画
    if (board) {
      for (const [elementId, interval] of loadingIntervals) {
        clearInterval(interval);
        removeLoadingAnimationFromGeometry(board, elementId);
      }
      loadingIntervals.clear();
    }
    
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
