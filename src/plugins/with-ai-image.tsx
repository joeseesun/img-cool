import { PlaitBoard, getSelectedElements } from '@plait/core';
import { PlaitDrawElement } from '@plait/draw';
import { MindElement, ImageData } from '@plait/mind';
import { processImagesWithAI } from '../services/ai-image';
import { insertImage } from '../data/image';

declare global {
  interface Window {
    __drawnix_ai_image_handler?: {
      showMenu: (board: PlaitBoard, position: { x: number; y: number }) => void;
    };
  }
}

export const withAIImagePlugin = (board: PlaitBoard) => {
  const newBoard = { ...board };
  const { pointerDown } = board;

  newBoard.pointerDown = (event: PointerEvent) => {
    if (event.button === 2) { // 右键
      const selected = getSelectedElements(board);
      const hasImages = selected.some(element => {
        return (element.type === 'image') || 
               (MindElement.isMindElement(board, element) && MindElement.hasImage(element));
      });

      if (hasImages && window.__drawnix_ai_image_handler) {
        event.preventDefault();
        window.__drawnix_ai_image_handler.showMenu(board, { 
          x: event.clientX, 
          y: event.clientY 
        });
        return;
      }
    }
    
    pointerDown(event);
  };

  return newBoard;
};

export async function processSelectedImagesWithAI(board: PlaitBoard, prompt: string): Promise<boolean> {
  const selected = getSelectedElements(board);
  const imageUrls: string[] = [];
  
  selected.forEach(element => {
    if (element.type === 'image') {
      const imageElement = element as any;
      imageUrls.push(imageElement.url);
    } else if (MindElement.isMindElement(board, element) && MindElement.hasImage(element)) {
      const mindElement = element as MindElement<ImageData>;
      imageUrls.push(mindElement.data.image.url);
    }
  });

  if (imageUrls.length === 0) {
    alert('请先选择图片');
    return false;
  }

  try {
    const result = await processImagesWithAI(imageUrls, prompt);
    
    if (result.success && result.imageUrl) {
      const response = await fetch(result.imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'ai-processed.png', { type: 'image/png' });
      
      await insertImage(board, file);
      return true;
    } else {
      alert(`处理失败: ${result.error}`);
      return false;
    }
  } catch (error) {
    alert(`处理失败: ${error}`);
    return false;
  }
}