import React, { useState, useEffect } from 'react';
import { DrawnixState, DialogType } from '../hooks/use-drawnix';
import { Trash2Icon, PlusIcon, Edit2Icon } from './icons';
import { 
  PromptTemplate, 
  loadPromptTemplates, 
  addPromptTemplate, 
  deletePromptTemplate, 
  updatePromptTemplate 
} from '../services/prompt-templates';

interface SettingsDialogProps {
  isOpen: boolean;
  updateAppState: (state: Partial<DrawnixState>) => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ 
  isOpen, 
  updateAppState 
}) => {
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState<'api' | 'prompts'>('api');
  const [promptTemplates, setPromptTemplates] = useState<PromptTemplate[]>([]);
  const [newPromptName, setNewPromptName] = useState('');
  const [newPromptContent, setNewPromptContent] = useState('');
  const [editingPrompt, setEditingPrompt] = useState<PromptTemplate | null>(null);

  // 从本地存储和JSON文件加载数据
  useEffect(() => {
    if (isOpen) {
      const savedApiKey = localStorage.getItem('drawnix-gemini-api-key') || '';
      setApiKey(savedApiKey);
      
      loadPromptTemplates().then(templates => {
        setPromptTemplates(templates);
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    updateAppState({ 
      openDialogType: null
    });
    setEditingPrompt(null);
    setNewPromptName('');
    setNewPromptContent('');
  };

  const handleSaveApiKey = () => {
    localStorage.setItem('drawnix-gemini-api-key', apiKey);
    console.log('API key已保存到本地存储');
    handleClose();
  };

  const handleAddPrompt = async () => {
    if (!newPromptName.trim() || !newPromptContent.trim()) return;
    
    try {
      const updatedTemplates = await addPromptTemplate(newPromptName, newPromptContent);
      setPromptTemplates(updatedTemplates);
      setNewPromptName('');
      setNewPromptContent('');
    } catch (error) {
      console.error('添加提示词失败:', error);
    }
  };

  const handleDeletePrompt = async (id: string) => {
    try {
      const updatedTemplates = await deletePromptTemplate(id);
      setPromptTemplates(updatedTemplates);
    } catch (error) {
      console.error('删除提示词失败:', error);
    }
  };

  const handleEditPrompt = (template: PromptTemplate) => {
    setEditingPrompt(template);
    setNewPromptName(template.name);
    setNewPromptContent(template.content);
  };

  const handleSaveEdit = async () => {
    if (!editingPrompt || !newPromptName.trim() || !newPromptContent.trim()) return;
    
    try {
      const updatedTemplates = await updatePromptTemplate(editingPrompt.id, newPromptName, newPromptContent);
      setPromptTemplates(updatedTemplates);
      setEditingPrompt(null);
      setNewPromptName('');
      setNewPromptContent('');
    } catch (error) {
      console.error('更新提示词失败:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingPrompt(null);
    setNewPromptName('');
    setNewPromptContent('');
  };

  if (!isOpen) return null;

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
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          minWidth: '600px',
          maxWidth: '700px',
          maxHeight: '80vh',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '24px 24px 0 24px' }}>
          <h2 style={{
            margin: '0 0 20px 0',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1f2937'
          }}>设置</h2>
          
          {/* Tab 导航 */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '20px'
          }}>
            <button
              onClick={() => setActiveTab('api')}
              style={{
                padding: '12px 20px',
                border: 'none',
                background: 'none',
                borderBottom: activeTab === 'api' ? '2px solid #1f2937' : '2px solid transparent',
                color: activeTab === 'api' ? '#1f2937' : '#6b7280',
                fontWeight: activeTab === 'api' ? '600' : '400',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              API 配置
            </button>
            <button
              onClick={() => setActiveTab('prompts')}
              style={{
                padding: '12px 20px',
                border: 'none',
                background: 'none',
                borderBottom: activeTab === 'prompts' ? '2px solid #1f2937' : '2px solid transparent',
                color: activeTab === 'prompts' ? '#1f2937' : '#6b7280',
                fontWeight: activeTab === 'prompts' ? '600' : '400',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              提示词模板
            </button>
          </div>
        </div>
        
        <div style={{ 
          padding: '0 24px 24px 24px',
          maxHeight: 'calc(80vh - 120px)',
          overflowY: 'auto'
        }}>
          {/* API 配置 Tab */}
          {activeTab === 'api' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  兔子的Gemini Nano Banana API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="请输入您的API Key"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                />
                <p style={{
                  margin: '8px 0 0 0',
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  API Key将安全保存在本地浏览器中
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={handleClose}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    background: 'white',
                    color: '#374151',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  取消
                </button>
                <button
                  onClick={handleSaveApiKey}
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '8px',
                    background: '#1f2937',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  保存
                </button>
              </div>
            </div>
          )}
          
          {/* 提示词模板 Tab */}
          {activeTab === 'prompts' && (
            <div>
              {/* 添加/编辑提示词表单 */}
              <div style={{
                padding: '16px',
                background: '#f9fafb',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <input
                    type="text"
                    value={newPromptName}
                    onChange={(e) => setNewPromptName(e.target.value)}
                    placeholder="提示词名称"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <textarea
                    value={newPromptContent}
                    onChange={(e) => setNewPromptContent(e.target.value)}
                    placeholder="提示词内容"
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {editingPrompt ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        disabled={!newPromptName.trim() || !newPromptContent.trim()}
                        style={{
                          padding: '8px 16px',
                          border: 'none',
                          borderRadius: '6px',
                          background: !newPromptName.trim() || !newPromptContent.trim() ? '#e5e7eb' : '#10b981',
                          color: 'white',
                          cursor: !newPromptName.trim() || !newPromptContent.trim() ? 'not-allowed' : 'pointer',
                          fontSize: '13px'
                        }}
                      >
                        保存修改
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={{
                          padding: '8px 16px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          background: 'white',
                          color: '#374151',
                          cursor: 'pointer',
                          fontSize: '13px'
                        }}
                      >
                        取消
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleAddPrompt}
                      disabled={!newPromptName.trim() || !newPromptContent.trim()}
                      style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '6px',
                        background: !newPromptName.trim() || !newPromptContent.trim() ? '#e5e7eb' : '#1f2937',
                        color: 'white',
                        cursor: !newPromptName.trim() || !newPromptContent.trim() ? 'not-allowed' : 'pointer',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <PlusIcon size={14} />
                      添加提示词
                    </button>
                  )}
                </div>
              </div>
              
              {/* 提示词列表 */}
              <div>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#374151' }}>
                  已保存的提示词 ({promptTemplates.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {promptTemplates.map(template => (
                    <div
                      key={template.id}
                      style={{
                        padding: '12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        background: 'white'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '8px'
                      }}>
                        <h4 style={{
                          margin: 0,
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          {template.name}
                        </h4>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            onClick={() => handleEditPrompt(template)}
                            style={{
                              padding: '4px',
                              border: 'none',
                              background: 'none',
                              color: '#6b7280',
                              cursor: 'pointer',
                              borderRadius: '4px'
                            }}
                            title="编辑"
                          >
                            <Edit2Icon size={14} />
                          </button>
                          <button
                            onClick={() => handleDeletePrompt(template.id)}
                            style={{
                              padding: '4px',
                              border: 'none',
                              background: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              borderRadius: '4px'
                            }}
                            title="删除"
                          >
                            <Trash2Icon size={14} />
                          </button>
                        </div>
                      </div>
                      <p style={{
                        margin: 0,
                        fontSize: '13px',
                        color: '#6b7280',
                        lineHeight: '1.4'
                      }}>
                        {template.content}
                      </p>
                    </div>
                  ))}
                  {promptTemplates.length === 0 && (
                    <div style={{
                      padding: '20px',
                      textAlign: 'center',
                      color: '#6b7280',
                      fontSize: '14px'
                    }}>
                      暂无提示词模板，添加第一个吧！
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