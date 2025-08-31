export interface AIImageResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export interface AIImageRequest {
  images: string[];
  prompt: string;
}

const API_KEY = 'sk-o2VwufJTd4Un6aUgTfSwON547FA1Ztz3upNEmepySuPPRgI2';
const BASE_URL = 'https://api.tu-zi.com/v1';

export async function processImagesWithAI(
  images: string[],
  prompt: string
): Promise<AIImageResponse> {
  try {
    const imageContents = images.map(url => ({
      type: 'image_url',
      image_url: { url }
    }));

    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gemini-2.5-flash-image',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              ...imageContents
            ]
          }
        ],
        stream: true
      })
    });

    if (!response.ok) {
      throw new Error(`API调用失败: ${response.statusText}`);
    }

    let fullContent = '';
    const reader = response.body?.getReader();
    
    if (reader) {
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6));
              const delta = data.choices?.[0]?.delta?.content;
              if (delta) {
                fullContent += delta;
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      }
    }

    console.log('Full API response content:', fullContent);

    // 先尝试匹配base64格式
    const base64Match = fullContent.match(/data:image\/[^;]+;base64,([A-Za-z0-9+/=]+)/);
    if (base64Match) {
      return {
        success: true,
        imageUrl: base64Match[0]
      };
    }

    // 然后尝试匹配markdown图片链接格式
    const urlMatch = fullContent.match(/!\[.*?\]\((https?:\/\/[^\)]+)\)/);
    if (urlMatch) {
      return {
        success: true,
        imageUrl: urlMatch[1]
      };
    }

    // 最后尝试直接URL格式
    const directUrlMatch = fullContent.match(/(https?:\/\/[^\s]+\.(png|jpg|jpeg|gif|webp))/i);
    if (directUrlMatch) {
      return {
        success: true,
        imageUrl: directUrlMatch[1]
      };
    }

    return {
      success: false,
      error: `未找到生成的图片。API返回: ${fullContent.substring(0, 200)}...`
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
}