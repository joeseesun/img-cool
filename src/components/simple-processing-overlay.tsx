import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface SimpleProcessingOverlayProps {
  elementId: string;
}

export const SimpleProcessingOverlay: React.FC<SimpleProcessingOverlayProps> = ({ elementId }) => {
  const [elementBounds, setElementBounds] = useState<DOMRect | null>(null);

  useEffect(() => {
    const findElement = () => {
      // 直接查找选中的图片元素
      const focusedImages = document.querySelectorAll('img.image-origin.image-origin--focus');
      
      if (focusedImages.length > 0) {
        // 使用第一个选中的图片
        const targetElement = focusedImages[0] as HTMLElement;
        const rect = targetElement.getBoundingClientRect();
        setElementBounds(rect);
        console.log('Found focused image:', rect);
      } else {
        // 如果没有选中的图片，查找最近的图片
        const allImages = document.querySelectorAll('img.image-origin');
        if (allImages.length > 0) {
          const targetElement = allImages[allImages.length - 1] as HTMLElement;
          const rect = targetElement.getBoundingClientRect();
          setElementBounds(rect);
          console.log('Using last image:', rect);
        }
      }
    };

    findElement();
    
    // 监听变化
    const interval = setInterval(findElement, 500);
    
    return () => clearInterval(interval);
  }, [elementId]);

  if (!elementBounds) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: elementBounds.left - 4,
        top: elementBounds.top - 4,
        width: elementBounds.width + 8,
        height: elementBounds.height + 8,
        border: '4px solid',
        borderImage: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff6b6b) 1',
        borderRadius: '8px',
        animation: 'gradientBorderShift 2s ease infinite',
        pointerEvents: 'none',
        zIndex: 1000,
        background: 'transparent',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @keyframes gradientBorderShift {
          0% { 
            border-image: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57) 1;
          }
          50% { 
            border-image: linear-gradient(45deg, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff6b6b) 1;
          }
          100% { 
            border-image: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57) 1;
          }
        }
      `}</style>
    </div>,
    document.body
  );
};
