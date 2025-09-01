import React, { useState, useRef, useEffect } from 'react';
import { PlaitBoard, getSelectedElements, Point, Transforms } from '@plait/core';
import { processImagesWithAI } from '../services/ai-image';
import { insertPlaceholderImage, replaceImageById, insertImageAtPosition, replaceGeometryWithImage } from '../data/image';
import { DrawnixState } from '../hooks/use-drawnix';
import { ZapIcon, SendIcon } from './icons';
import { PromptTemplate, loadPromptTemplates } from '../services/prompt-templates';

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
  const [promptTemplates, setPromptTemplates] = useState<PromptTemplate[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      // 加载提示词模板
      loadPromptTemplates().then(templates => {
        setPromptTemplates(templates);
      });
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
    setShowTemplates(false);
  };

  const handleTemplateSelect = (template: PromptTemplate) => {
    setPrompt(template.content);
    setShowTemplates(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
        <div style={{ position: 'relative' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ position: 'relative', flex: 1 }}>
              {/* 闪电图标按钮 */}
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#6b7280',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
                title="快捷提示词 (点击查看预设模板)"
              >
                <ZapIcon size={16} />
              </button>
              
              <input
                ref={inputRef}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入AI处理指令..."
                style={{
                  width: '100%',
                  padding: '12px 45px 12px 45px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
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
                transition: 'all 0.2s',
                minWidth: '48px'
              }}
            >
              <SendIcon size={16} />
            </button>
          </div>
          
          {/* 提示词模板下拉框 */}
          {showTemplates && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: '70px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              zIndex: 1001,
              marginTop: '8px',
              minWidth: '400px',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '20px' }}>
                <h3 style={{
                  margin: '0 0 16px 0',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  快捷提示词
                </h3>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {promptTemplates.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {promptTemplates.map(template => (
                        <button
                          key={template.id}
                          onClick={() => handleTemplateSelect(template)}
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            background: 'white',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f9fafb';
                            e.currentTarget.style.borderColor = '#1f2937';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'white';
                            e.currentTarget.style.borderColor = '#e5e7eb';
                          }}
                        >
                          <div style={{ 
                            fontWeight: '600', 
                            color: '#1f2937', 
                            marginBottom: '4px',
                            fontSize: '14px'
                          }}>
                            {template.name}
                          </div>
                          <div style={{ 
                            fontSize: '12px', 
                            color: '#6b7280',
                            lineHeight: '1.4'
                          }}>
                            {template.content}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      padding: '20px',
                      textAlign: 'center',
                      color: '#6b7280',
                      fontSize: '14px'
                    }}>
                      暂无提示词模板<br />
                      <button
                        onClick={() => {
                          setShowTemplates(false);
                          updateAppState({ openDialogType: DialogType.settings });
                        }}
                        style={{
                          marginTop: '8px',
                          padding: '6px 12px',
                          border: 'none',
                          borderRadius: '6px',
                          background: '#1f2937',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        前往设置添加
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};
