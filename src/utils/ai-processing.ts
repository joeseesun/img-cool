// 这个文件的DOM操作方法已被占位图片法替代
// 如果其他组件还在使用这些方法，应该迁移到占位图片法

export const setImageProcessingState = (imageUrl: string, elementId: string, isProcessing: boolean) => {
  console.warn('setImageProcessingState已废弃，请使用占位图片法');
};

export const clearAllProcessingStates = () => {
  console.warn('clearAllProcessingStates已废弃，请使用占位图片法');
};
