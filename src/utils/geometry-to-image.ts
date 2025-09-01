import { PlaitBoard, PlaitElement } from '@plait/core';
import { boardToImage } from './common';

export async function geometryToImage(
  board: PlaitBoard, 
  geometryElements: PlaitElement[]
): Promise<string[]> {
  const imageUrls: string[] = [];
  
  for (const element of geometryElements) {
    try {
      console.log('🎨 开始转换几何图形:', element.id, element.type);
      
      const image = await boardToImage(board, {
        elements: [element],
        fillStyle: 'white',
        padding: 5,
        ratio: 1
      });
      
      if (image) {
        // 检查boardToImage返回的是否已经包含前缀
        let imageUrl: string;
        if (image.startsWith('data:image/')) {
          // 如果已经有前缀，直接使用
          imageUrl = image;
        } else {
          // 如果没有前缀，添加前缀
          imageUrl = `data:image/png;base64,${image}`;
        }
        
        // 检查base64图片的大小和格式
        const base64Data = imageUrl.includes(',') ? imageUrl.split(',')[1] : image;
        const base64Length = base64Data.length;
        const estimatedSizeKB = Math.round((base64Length * 3) / 4 / 1024);
        console.log('📏 几何图形转换结果:', {
          elementId: element.id,
          base64Length,
          estimatedSizeKB: estimatedSizeKB + 'KB',
          urlPrefix: imageUrl.substring(0, 50) + '...',
          hasPrefix: imageUrl.startsWith('data:image/')
        });
        
        // 检查图片是否过大（超过1MB可能导致API问题）
        if (estimatedSizeKB > 1024) {
          console.warn('⚠️ 几何图形转换的图片过大:', estimatedSizeKB + 'KB');
        }
        
        imageUrls.push(imageUrl);
      } else {
        console.error('❌ boardToImage返回空结果');
      }
    } catch (error) {
      console.error('几何图形转图片失败:', error);
    }
  }
  
  console.log('🎯 几何图形转换完成，共生成', imageUrls.length, '张图片');
  return imageUrls;
}