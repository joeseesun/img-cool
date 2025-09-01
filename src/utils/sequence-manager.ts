import { PlaitBoard, PlaitElement, BOARD_TO_ON_CHANGE } from '@plait/core';

interface SequencedElement {
  elementId: string;
  sequenceNumber: number;
}

/**
 * 图片序号管理器
 * 管理选中图片的序号标记状态，避免DOM直接操作
 */
class SequenceManager {
  private sequences: Map<string, SequencedElement[]> = new Map();
  
  /**
   * 为指定板子的元素设置序号
   */
  setSequence(boardId: string, elements: string[]): void {
    const sequenced = elements.map((elementId, index) => ({
      elementId,
      sequenceNumber: index + 1
    }));
    this.sequences.set(boardId, sequenced);
    console.log(`🏷️ 设置序号: ${sequenced.map(s => `${s.elementId.slice(0,5)}=${s.sequenceNumber}`).join(', ')}`);
  }
  
  /**
   * 获取元素的序号
   */
  getSequenceNumber(boardId: string, elementId: string): number | undefined {
    const boardSequences = this.sequences.get(boardId);
    return boardSequences?.find(s => s.elementId === elementId)?.sequenceNumber;
  }
  
  /**
   * 清除指定板子的所有序号
   */
  clearSequence(boardId: string): void {
    this.sequences.delete(boardId);
    console.log(`🧹 清除序号: ${boardId}`);
  }
  
  /**
   * 检查元素是否有序号
   */
  hasSequence(boardId: string, elementId: string): boolean {
    return this.getSequenceNumber(boardId, elementId) !== undefined;
  }
}

export const sequenceManager = new SequenceManager();

/**
 * 为选中的图片添加序号标记
 */
export const addSequenceToImages = (board: PlaitBoard, imageElements: PlaitElement[]): void => {
  const elementIds = imageElements.map(el => el.id);
  sequenceManager.setSequence(board.id!, elementIds);
  
  // 使用正确的PlaitBoard重渲染方法
  const onChangeCallback = BOARD_TO_ON_CHANGE.get(board);
  if (onChangeCallback) {
    board.operations = [];
    onChangeCallback();
  }
};

/**
 * 清除所有序号标记
 */
export const clearAllSequences = (board: PlaitBoard): void => {
  sequenceManager.clearSequence(board.id!);
  
  // 使用正确的PlaitBoard重渲染方法
  const onChangeCallback = BOARD_TO_ON_CHANGE.get(board);
  if (onChangeCallback) {
    board.operations = [];
    onChangeCallback();
  }
};