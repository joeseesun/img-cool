import {
  getHitElementByPoint,
  getSelectedElements,
  PlaitBoard,
  Point,
  Transforms,
  CoreTransforms,
  idCreator,
  PlaitElement,
} from '@plait/core';
import { DataURL } from '../types';
import { getDataURL } from './blob';
import { MindElement, MindTransforms } from '@plait/mind';
import { DrawTransforms } from '@plait/draw';
import { getElementOfFocusedImage } from '@plait/common';

export const loadHTMLImageElement = (dataURL: DataURL) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (error) => {
      reject(error);
    };
    image.src = dataURL;
  });
};

export const buildImage = (
  image: HTMLImageElement,
  dataURL: DataURL,
  maxWidth: number
) => {
  const width = image.width > maxWidth ? maxWidth : image.width;
  const height = (width / image.width) * image.height;
  return {
    url: dataURL,
    width,
    height,
  };
};

const createPlaceholderImage = (width: number, height: number): string => {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:0.3">
            <animate attributeName="stop-color" values="#4F46E5;#7C3AED;#EC4899;#4F46E5" dur="2s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:0.3">
            <animate attributeName="stop-color" values="#7C3AED;#EC4899;#4F46E5;#7C3AED" dur="2s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)" rx="8"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-size="16" font-weight="bold">
        Processing...
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const insertPlaceholderImage = (
  board: PlaitBoard, 
  imageUrls: string[],
  imageElementMap: Record<string, string>
): string => {
  // 根据imageUrls的顺序（已排序）重建选中图片元素
  const selectedImages = imageUrls.map(url => {
    const elementId = imageElementMap[url];
    return board.children.find(el => el.id === elementId);
  }).filter(Boolean) as PlaitElement[];
  
  if (selectedImages.length === 0) {
    console.error('未找到选中的图片元素');
    return '';
  }
  
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  let firstImageWidth = 200;
  let firstImageHeight = 150;
  
  selectedImages.forEach((img, index) => {
    if (img.points && img.points.length >= 2) {
      const [startPoint, endPoint] = img.points;
      minX = Math.min(minX, startPoint[0]);
      minY = Math.min(minY, startPoint[1]);
      maxX = Math.max(maxX, endPoint[0]);
      maxY = Math.max(maxY, endPoint[1]);
      
      // 使用第一张图片的尺寸（已排序，所以index=0就是最左侧图片）
      if (index === 0) {
        firstImageWidth = Math.abs(endPoint[0] - startPoint[0]);
        firstImageHeight = Math.abs(endPoint[1] - startPoint[1]);
        console.log('🎯 使用第一张图片尺寸:', firstImageWidth, 'x', firstImageHeight);
      }
    }
  });
  
  const width = firstImageWidth;
  const height = firstImageHeight;
  const startPoint: Point = minX !== Infinity 
    ? [maxX + 20, minY] 
    : [100, 100];
  
  console.log('🎯 占位图片位置:', startPoint, '尺寸:', width, 'x', height);
  
  const placeholderId = idCreator();
  const placeholderUrl = createPlaceholderImage(width, height);
  
  const imageElement = {
    id: placeholderId,
    type: 'image',
    points: [startPoint, [startPoint[0] + width, startPoint[1] + height]] as Point[],
    url: placeholderUrl,
    width,
    height
  };
  
  Transforms.insertNode(board, imageElement, [board.children.length]);
  return placeholderId;
};

export const replaceImageById = async (
  board: PlaitBoard, 
  elementId: string, 
  imageFile: File
) => {
  const placeholderElement = board.children.find(el => el.id === elementId);
  if (!placeholderElement || placeholderElement.type !== 'image') {
    console.error('未找到占位图片:', elementId);
    return null;
  }
  
  const dataURL = await getDataURL(imageFile);
  const image = await loadHTMLImageElement(dataURL);
  const imageItem = buildImage(image, dataURL, (placeholderElement as any).width);
  
  // 获取占位图片的位置
  const placeholderPosition = placeholderElement.points?.[0] || [0, 0];
  
  // 创建新图片元素在相同位置
  const newImageElement = {
    id: idCreator(),
    type: 'image',
    points: [
      placeholderPosition, 
      [placeholderPosition[0] + imageItem.width, placeholderPosition[1] + imageItem.height]
    ] as Point[],
    url: imageItem.url,
    width: imageItem.width,
    height: imageItem.height
  };
  
  // 删除占位图片
  CoreTransforms.removeElements(board, [placeholderElement]);
  
  // 在相同位置插入真实图片
  Transforms.insertNode(board, newImageElement, [board.children.length]);
  
  console.log('✅ 占位图片已删除，真实图片已插入相同位置');
  return {
    position: placeholderPosition,
    width: imageItem.width,
    height: imageItem.height
  };
};

export const insertImageAtPosition = async (
  board: PlaitBoard,
  imageFile: File,
  position: Point,
  targetWidth: number,
  index: number = 0
) => {
  const dataURL = await getDataURL(imageFile);
  const image = await loadHTMLImageElement(dataURL);
  const imageItem = buildImage(image, dataURL, targetWidth);
  
  // 在指定位置插入图片
  const startPoint: Point = position;
  
  const imageElement = {
    id: idCreator(),
    type: 'image',
    points: [startPoint, [startPoint[0] + imageItem.width, startPoint[1] + imageItem.height]] as Point[],
    url: imageItem.url,
    width: imageItem.width,
    height: imageItem.height
  };
  
  Transforms.insertNode(board, imageElement, [board.children.length]);
  console.log(`✅ 第${index + 1}张图片已插入位置:`, startPoint);
};

export const insertImage = async (
  board: PlaitBoard,
  imageFile: File,
  startPoint?: Point,
  isDrop?: boolean
) => {
  const selectedElement =
    getSelectedElements(board)[0] || getElementOfFocusedImage(board);
  const defaultImageWidth = selectedElement ? 240 : 400;
  const dataURL = await getDataURL(imageFile);
  const image = await loadHTMLImageElement(dataURL);
  const imageItem = buildImage(image, dataURL, defaultImageWidth);
  const element = startPoint && getHitElementByPoint(board, startPoint);
  if (isDrop && element && MindElement.isMindElement(board, element)) {
    MindTransforms.setImage(board, element as MindElement, imageItem);
    return;
  }
  if (
    selectedElement &&
    MindElement.isMindElement(board, selectedElement) &&
    !isDrop
  ) {
    MindTransforms.setImage(board, selectedElement as MindElement, imageItem);
  } else {
    DrawTransforms.insertImage(board, imageItem, startPoint);
  }
};

export const replaceGeometryWithImage = async (
  board: PlaitBoard,
  geometryElementId: string,
  imageFile: File
) => {
  const geometryElement = board.children.find(el => el.id === geometryElementId);
  if (!geometryElement || geometryElement.type !== 'geometry') {
    console.error('未找到几何图形元素:', geometryElementId);
    return null;
  }

  const dataURL = await getDataURL(imageFile);
  const image = await loadHTMLImageElement(dataURL);
  
  // 计算几何图形的位置和尺寸
  const points = geometryElement.points as Point[];
  const position: Point = [points[0][0], points[0][1]];
  const width = Math.abs(points[1][0] - points[0][0]);
  const height = Math.abs(points[1][1] - points[0][1]);
  
  // 保持宽高比，以几何图形的宽度为准
  const aspectRatio = image.height / image.width;
  const imageWidth = width;
  const imageHeight = imageWidth * aspectRatio;
  
  const imageItem = {
    url: dataURL,
    width: imageWidth,
    height: imageHeight,
  };

  // 删除原几何图形
  CoreTransforms.removeElements(board, [geometryElement]);

  // 在原位置插入图片
  DrawTransforms.insertImage(board, imageItem, position);

  return {
    position,
    width: imageWidth,
    height: imageHeight
  };
};
