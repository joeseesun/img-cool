export interface TextToImageResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

const API_KEY = 'sk-o2VwufJTd4Un6aUgTfSwON547FA1Ztz3upNEmepySuPPRgI2';
const BASE_URL = 'https://api.tu-zi.com/v1';

export async function generateImageFromText(prompt: string): Promise<TextToImageResponse> {
  try {
    console.log('🎨 文本生图API调用:', prompt);
    
    const response = await fetch(`${BASE_URL}/images/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gemini-2.5-flash-image',
        prompt: prompt,
        n: 1,
        size: '1024x1024'
      })
    });

    if (!response.ok) {
      throw new Error(`API调用失败: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('🎨 文本生图API响应:', result);

    if (result.data && result.data.length > 0) {
      const imageData = result.data[0];
      
      if (imageData.b64_json) {
        return {
          success: true,
          imageUrl: `data:image/png;base64,${imageData.b64_json}`
        };
      } else if (imageData.url) {
        return {
          success: true,
          imageUrl: imageData.url
        };
      }
    }

    return {
      success: false,
      error: '未找到生成的图片数据'
    };

  } catch (error) {
    console.error('文本生图API错误:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
}