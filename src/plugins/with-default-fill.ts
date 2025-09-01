import { PlaitBoard } from '@plait/core';
import { BasicShapes } from '@plait/draw';

export const withDefaultFill = (board: PlaitBoard) => {
  const { apply } = board;

  board.apply = (operation) => {
    if (operation.type === 'insert_node' && operation.node) {
      const element = operation.node as any;
      
      if (element.type === 'geometry' && 
          (element.shape === BasicShapes.rectangle || element.shape === BasicShapes.ellipse)) {
        if (!element.fill) {
          element.fill = '#FFFFFF';
        }
      }
    }
    
    return apply(operation);
  };

  return board;
};