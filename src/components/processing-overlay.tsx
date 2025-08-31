import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ProcessingOverlayProps {
  elementId: string;
}

export const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ elementId }) => {
  const [elementBounds, setElementBounds] = useState<DOMRect | null>(null);

  useEffect(() => {
    const findAndTrackElement = () => {
      // 尝试多种选择器查找元素
      const selectors = [
        `[data-id="${elementId}"]`,
        `#${elementId}`,
        `[id="${elementId}"]`,
        `.plait-image-element`,
        `.plait-mind-element`
      ];
      
      let targetElement = null;
      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        // 如果有多个元素，需要更精确的匹配逻辑
        if (elements.length > 0) {
          targetElement = elements[0]; // 临时用第一个
          break;
        }
      }
      
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setElementBounds(rect);
        console.log('Found element for overlay:', elementId, rect);
      } else {
        console.log('Element not found for overlay:', elementId);
        
        // 打印所有可能的元素来调试
        const allElements = document.querySelectorAll('[class*="plait"], [class*="image"], [class*="element"]');
        console.log('All plait-related elements:', allElements);
        
        const allWithIds = document.querySelectorAll('[id], [data-id]');
        console.log('All elements with IDs:', Array.from(allWithIds).map(el => ({
          tagName: el.tagName,
          id: el.id,
          dataId: el.getAttribute('data-id'),
          className: el.className
        })));
        
        // 重试
        setTimeout(findAndTrackElement, 100);
      }
    };

    findAndTrackElement();
    
    // 监听窗口尺寸变化和滚动
    const handleResize = () => findAndTrackElement();
    const handleScroll = () => findAndTrackElement();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
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
        border: '3px solid',
        borderImage: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff6b6b) 1',
        borderRadius: '8px',
        animation: 'gradientBorderShift 2s ease infinite',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    />,
    document.body
  );
};
