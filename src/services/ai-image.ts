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

const BASE_URL = 'https://api.tu-zi.com/v1';

function getApiKey(): string {
  const apiKey = localStorage.getItem('drawnix-gemini-api-key');
  console.log('🔑 从本地存储读取API Key:', apiKey ? `sk-...${apiKey.slice(-6)}` : '未找到');
  if (!apiKey) {
    throw new Error('请先在设置中配置API Key');
  }
  return apiKey;
}

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

    const apiKey = getApiKey();
    
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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
      const errorText = await response.text();
      console.error('❌ API调用失败详情:', {
        status: response.status,
        statusText: response.statusText,
        errorBody: errorText
      });
      throw new Error(`API调用失败: ${response.status} ${response.statusText} - ${errorText}`);
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
    
    // 详细检查发送的图片数据
    images.forEach((imageUrl, index) => {
      const isBase64 = imageUrl.startsWith('data:image/');
      const sizeKB = isBase64 ? Math.round((imageUrl.length * 3) / 4 / 1024) : 0;
      console.log(`📷 图片${index + 1}:`, {
        isBase64,
        sizeKB: sizeKB + 'KB',
        urlPrefix: imageUrl.substring(0, 50) + '...'
      });
    });
    
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