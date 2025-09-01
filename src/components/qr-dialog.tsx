import React from 'react';
import { DrawnixState } from '../hooks/use-drawnix';

interface QRDialogProps {
  isOpen: boolean;
  updateAppState: (state: Partial<DrawnixState>) => void;
  title: string;
  qrImageUrl: string;
  description: string;
}

export const QRDialog: React.FC<QRDialogProps> = ({ 
  isOpen, 
  updateAppState,
  title,
  qrImageUrl,
  description
}) => {
  const handleClose = () => {
    updateAppState({ openDialogType: null });
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
          padding: '24px',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{
          margin: '0 0 20px 0',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#1f2937'
        }}>{title}</h2>
        
        <img
          src={qrImageUrl}
          alt={title}
          style={{
            width: '100%',
            maxWidth: '240px',
            height: 'auto',
            borderRadius: '8px',
            marginBottom: '16px'
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        
        <p style={{
          margin: '0 0 20px 0',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          {description}
        </p>
        
        <button
          onClick={handleClose}
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
          关闭
        </button>
      </div>
    </div>
  );
};