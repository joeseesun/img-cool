import React, { useState, useEffect } from 'react';
import { DrawnixState, DialogType } from '../hooks/use-drawnix';

interface SettingsDialogProps {
  isOpen: boolean;
  updateAppState: (state: Partial<DrawnixState>) => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ 
  isOpen, 
  updateAppState 
}) => {
  const [apiKey, setApiKey] = useState('');

  // 从本地存储加载API key
  useEffect(() => {
    if (isOpen) {
      const savedApiKey = localStorage.getItem('drawnix-gemini-api-key') || '';
      setApiKey(savedApiKey);
    }
  }, [isOpen]);

  const handleClose = () => {
    updateAppState({ 
      openDialogType: null
    });
  };

  const handleSave = () => {
    // 保存API key到本地存储
    localStorage.setItem('drawnix-gemini-api-key', apiKey);
    console.log('API key已保存到本地存储');
    handleClose();
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
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          minWidth: '400px',
          maxWidth: '500px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{
          margin: '0 0 20px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#1f2937'
        }}>
          设置
        </h2>
        
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
            placeholder="请输入API Key"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button
            onClick={handleClose}
            style={{
              background: 'transparent',
              color: '#6b7280',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            取消
          </button>
          <button
            onClick={handleSave}
            style={{
              background: '#1f2937',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};