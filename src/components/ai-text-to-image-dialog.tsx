import React, { useState, useRef, useEffect } from 'react';
import { PlaitBoard } from '@plait/core';
import { insertImage } from '../data/image';
import { DrawnixState, DialogType } from '../hooks/use-drawnix';
import { generateImageFromText } from '../services/text-to-image';
import { WandIcon, ZapIcon } from './icons';
import { PromptTemplate, loadPromptTemplates } from '../services/prompt-templates';

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
        points: [[centerX, centerY], [centerX + width, centerY + height]] as Point[],
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
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="描述想要生成的图片..."
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 45px 12px 45px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              boxSizing: 'border-box'
            }}
          />
          
          {/* 提示词模板下拉框 */}
          {showTemplates && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
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