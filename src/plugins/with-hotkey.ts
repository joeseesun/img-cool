import {
  BoardTransforms,
  getSelectedElements,
  PlaitBoard,
  PlaitPointerType,
} from '@plait/core';
import { isHotkey } from 'is-hotkey';
import { addImage, saveAsImage } from '../utils/image';
import { saveAsJSON } from '../data/json';
import { DrawnixState, DialogType } from '../hooks/use-drawnix';
import { BoardCreationMode, setCreationMode } from '@plait/common';
import { MindPointerType, MindElement } from '@plait/mind';
import { FreehandShape } from './freehand/type';
import { ArrowLineShape, BasicShapes } from '@plait/draw';
import { geometryToImage } from '../utils/geometry-to-image';

export const buildDrawnixHotkeyPlugin = (
  updateAppState: (appState: Partial<DrawnixState>) => void
) => {
  const withDrawnixHotkey = (board: PlaitBoard) => {
    const { globalKeyDown, keyDown } = board;
    board.globalKeyDown = (event: KeyboardEvent) => {
      const isTypingNormal =
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement;
      
      if (!isTypingNormal && event.key === 'Tab') {
        const selected = getSelectedElements(board);
        console.log('Tab pressed - Selected elements:', selected);
        
        // 按X坐标从左到右排序选中的图片元素
        const imageElements = selected.filter(element => {
          return element.type === 'image' || 
                 (MindElement.isMindElement(board, element) && MindElement.hasImage(element));
        });
        
        // 获取几何图形元素
        const geometryElements = selected.filter(element => {
          return element.type === 'geometry';
        });
        
        console.log('🔍 排序前图片元素:', imageElements.map(el => ({
          id: el.id,
          type: el.type, 
          x: el.points?.[0]?.[0],
          width: el.points ? Math.abs(el.points[1][0] - el.points[0][0]) : 0
        })));
        
        const sortedSelected = imageElements.sort((a, b) => {
          const aX = a.points?.[0]?.[0] || 0;
          const bX = b.points?.[0]?.[0] || 0;
          return aX - bX; // 从左到右排序
        });
        
        console.log('🎯 排序后图片元素:', sortedSelected.map(el => ({
          id: el.id,
          type: el.type,
          x: el.points?.[0]?.[0],
          width: el.points ? Math.abs(el.points[1][0] - el.points[0][0]) : 0
        })));

        const imageUrls: string[] = [];
        const imageElementMap: Record<string, string> = {};
        
        sortedSelected.forEach(element => {
          console.log('Checking element:', element.type, element);
          if (element.type === 'image') {
            const imageElement = element as any;
            console.log('Image element URL:', imageElement.url);
            if (imageElement.url) {
              imageUrls.push(imageElement.url);
              imageElementMap[imageElement.url] = imageElement.id;
            }
          } else if (MindElement.isMindElement(board, element) && MindElement.hasImage(element)) {
            const mindElement = element as any;
            if (mindElement.data?.image?.url) {
              imageUrls.push(mindElement.data.image.url);
              imageElementMap[mindElement.data.image.url] = mindElement.id;
            }
          }
        });
        
        console.log('Image URLs found:', imageUrls);
        
        // 处理几何图形转图片
        if (geometryElements.length > 0) {
          console.log('🎨 Converting geometry elements to images:', geometryElements.length);
          console.log('🔍 几何图形详情:', geometryElements.map(el => ({
            id: el.id,
            type: el.type,
            shape: (el as any).shape,
            points: el.points
          })));
          event.preventDefault();
          
          geometryToImage(board, geometryElements).then(geometryImageUrls => {
            console.log('几何图形转换完成:', geometryImageUrls.length, '张图片');
            console.log('🖼️ 转换的图片URLs长度:', geometryImageUrls.map(url => url.length));
            
            const allImageUrls = [...imageUrls, ...geometryImageUrls];
            const allElementMap = { ...imageElementMap };
            
            // 为几何图形创建映射关系
            geometryElements.forEach((element, index) => {
              if (geometryImageUrls[index]) {
                allElementMap[geometryImageUrls[index]] = element.id;
                console.log(`📍 映射: 图片${index} -> 元素${element.id}`);
              }
            });
            
            console.log('📋 最终图片列表:', allImageUrls.length, '张');
            console.log('🗺️ 元素映射:', allElementMap);
            
            if (allImageUrls.length > 0) {
              updateAppState({
                openDialogType: DialogType.aiImage,
                selectedImageUrls: allImageUrls,
                imageElementMap: allElementMap
              });
            }
          }).catch(error => {
            console.error('几何图形转图片失败:', error);
          });
          
          return;
        }
        
        if (imageUrls.length > 0) {
          updateAppState({ 
            openDialogType: DialogType.aiImage,
            selectedImageUrls: imageUrls,
            imageElementMap: imageElementMap
          });
          event.preventDefault();
          return;
        }
      }
      
      // Command+G 快捷键：文本生成图片
      if (!isTypingNormal && event.key === 'g' && (event.metaKey || event.ctrlKey)) {
        updateAppState({ openDialogType: DialogType.textToImage });
        event.preventDefault();
        return;
      }
      
      if (
        !isTypingNormal &&
        (PlaitBoard.getMovingPointInBoard(board) ||
          PlaitBoard.isMovingPointInBoard(board)) &&
        !PlaitBoard.hasBeenTextEditing(board)
      ) {
        if (isHotkey(['mod+shift+e'], { byKey: true })(event)) {
          saveAsImage(board, true);
          event.preventDefault();
          return;
        }
        if (isHotkey(['mod+s'], { byKey: true })(event)) {
          saveAsJSON(board);
          event.preventDefault();
          return;
        }
        if (
          isHotkey(['mod+backspace'])(event) ||
          isHotkey(['mod+delete'])(event)
        ) {
          updateAppState({
            openCleanConfirm: true,
          });
          event.preventDefault();
          return;
        }
        if (isHotkey(['mod+u'])(event)) {
          addImage(board);
        }
        if (!event.altKey && !event.metaKey && !event.ctrlKey) {
          if (event.key === 'h') {
            BoardTransforms.updatePointerType(board, PlaitPointerType.hand);
            updateAppState({ pointer: PlaitPointerType.hand });
          }
          if (event.key === 'v') {
            BoardTransforms.updatePointerType(
              board,
              PlaitPointerType.selection
            );
            updateAppState({ pointer: PlaitPointerType.selection });
          }
          if (event.key === 'm') {
            setCreationMode(board, BoardCreationMode.dnd);
            BoardTransforms.updatePointerType(board, MindPointerType.mind);
            updateAppState({ pointer: MindPointerType.mind });
          }
          if (event.key === 'e') {
            setCreationMode(board, BoardCreationMode.drawing);
            BoardTransforms.updatePointerType(board, FreehandShape.eraser);
            updateAppState({ pointer: FreehandShape.eraser });
          }
          if (event.key === 'p') {
            setCreationMode(board, BoardCreationMode.drawing);
            BoardTransforms.updatePointerType(board, FreehandShape.feltTipPen);
            updateAppState({ pointer: FreehandShape.feltTipPen });
          }
          if (event.key === 'a' && !isHotkey(['mod+a'])(event)) {
            // will trigger editing text
            if (getSelectedElements(board).length === 0) {
              setCreationMode(board, BoardCreationMode.drawing);
              BoardTransforms.updatePointerType(board, ArrowLineShape.straight);
              updateAppState({ pointer: ArrowLineShape.straight });
            }
          }
          if (event.key === 'r' || event.key === 'o' || event.key === 't') {
            const keyToPointer = {
              r: BasicShapes.rectangle,
              o: BasicShapes.ellipse,
              t: BasicShapes.text,
            };
            if (keyToPointer[event.key] === BasicShapes.text) {
              setCreationMode(board, BoardCreationMode.dnd);
            } else {
              setCreationMode(board, BoardCreationMode.drawing);
            }
            BoardTransforms.updatePointerType(board, keyToPointer[event.key]);
            updateAppState({ pointer: keyToPointer[event.key] });
          }
          event.preventDefault();
          return;
        }
      }
      globalKeyDown(event);
    };

    board.keyDown = (event: KeyboardEvent) => {
      if (isHotkey(['mod+z'], { byKey: true })(event)) {
        board.undo();
        event.preventDefault();
        return;
      }

      if (isHotkey(['mod+shift+z'], { byKey: true })(event)) {
        board.redo();
        event.preventDefault();
        return;
      }

      keyDown(event);
    };

    return board;
  };
  return withDrawnixHotkey;
};
