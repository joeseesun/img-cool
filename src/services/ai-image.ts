export interface AIImageResponse {
  success: boolean;
  imageUrl?: string;
  imageUrls?: string[];
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

    const optimizedPrompt = images.length > 1 
      ? `图片1、图片2、图片3...（按顺序上传了${images.length}张图片）

${prompt}`
      : prompt;

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
              { type: 'text', text: optimizedPrompt },
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

    console.log('📝 发送的提示词:', optimizedPrompt);
    console.log('📤 发送图片数量:', images.length);
    console.log('Full API response content:', fullContent);

    // 按优先级顺序匹配图片URL，避免重复
    const allImageUrls: string[] = [];
    
    // 1. 优先匹配base64格式图片
    const base64Matches = fullContent.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/g);
    if (base64Matches) {
      allImageUrls.push(...base64Matches);
    }
    
    // 2. 如果没有base64，匹配markdown图片链接格式
    if (allImageUrls.length === 0) {
      const urlMatches = fullContent.match(/!\[.*?\]\((https?:\/\/[^\)]+)\)/g);
      if (urlMatches) {
        allImageUrls.push(...urlMatches.map(match => {
          const url = match.match(/!\[.*?\]\((https?:\/\/[^\)]+)\)/);
          return url ? url[1] : '';
        }).filter(Boolean));
      }
    }
    
    // 3. 如果还没有，尝试直接URL格式（避免重复）
    if (allImageUrls.length === 0) {
      const directUrls = fullContent.match(/(https?:\/\/[^\s]+\.(png|jpg|jpeg|gif|webp))/gi);
      if (directUrls) {
        allImageUrls.push(...directUrls);
      }
    }

    if (allImageUrls.length > 0) {
      console.log('提取到图片URLs:', allImageUrls.length, '张');
      return {
        success: true,
        imageUrl: allImageUrls[0], // 向后兼容
        imageUrls: allImageUrls
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