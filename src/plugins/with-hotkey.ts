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
        // 如果当前有图片正在处理，忽略Tab键
        if (board.appState?.processingImages && board.appState.processingImages.size > 0) {
          event.preventDefault();
          return;
        }
        
        const selected = getSelectedElements(board);
        console.log('Tab pressed - Selected elements:', selected);
        
        const imageUrls: string[] = [];
        const imageElementMap: Record<string, string> = {};
        selected.forEach(element => {
          console.log('Checking element:', element.type, element);
          if (element.type === 'image') {
            const imageElement = element as any;
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
