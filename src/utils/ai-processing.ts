export const setImageProcessingState = (imageUrl: string, elementId: string, isProcessing: boolean) => {
  console.log('Setting processing state:', { elementId, isProcessing });
  
  // 尝试多种选择器找到DOM元素
  const selectors = [
    `[data-id="${elementId}"]`,
    `#${elementId}`,
    `[id="${elementId}"]`,
    `.plait-image-element[data-element-id="${elementId}"]`,
    `.plait-mind-element[data-element-id="${elementId}"]`
  ];
  
  let element = null;
  for (const selector of selectors) {
    element = document.querySelector(selector);
    if (element) {
      console.log('Found element with selector:', selector, element);
      break;
    }
  }
  
  if (!element) {
    console.log('Element not found, trying to find by attribute...');
    // 如果找不到，打印所有可能的元素
    const allImages = document.querySelectorAll('.plait-image-element, .plait-mind-element');
    console.log('All image elements:', allImages);
    return;
  }
  
  if (isProcessing) {
    element.setAttribute('data-processing', 'true');
    console.log('Added processing attribute to element');
  } else {
    element.removeAttribute('data-processing');
    console.log('Removed processing attribute from element');
  }
};

export const clearAllProcessingStates = () => {
  const elements = document.querySelectorAll('[data-processing="true"]');
  elements.forEach(el => el.removeAttribute('data-processing'));
};
