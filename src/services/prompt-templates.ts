export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
}

let promptTemplatesCache: PromptTemplate[] | null = null;

// 读取提示词模板
export async function loadPromptTemplates(): Promise<PromptTemplate[]> {
  if (promptTemplatesCache) {
    return promptTemplatesCache;
  }

  try {
    const saved = localStorage.getItem('drawnix-prompt-templates');
    if (saved) {
      const templates = JSON.parse(saved);
      promptTemplatesCache = templates;
      return templates;
    } else {
      const defaultTemplates = getDefaultPromptTemplates();
      await savePromptTemplates(defaultTemplates);
      return defaultTemplates;
    }
  } catch (error) {
    console.error('加载提示词模板失败:', error);
    return getDefaultPromptTemplates();
  }
}

// 保存提示词模板
export async function savePromptTemplates(templates: PromptTemplate[]): Promise<void> {
  try {
    // 更新缓存
    promptTemplatesCache = templates;
    
    // 保存到localStorage作为备份
    localStorage.setItem('drawnix-prompt-templates', JSON.stringify(templates));
    
    console.log('提示词模板已保存');
  } catch (error) {
    console.error('保存提示词模板失败:', error);
    throw error;
  }
}

// 获取默认提示词模板
function getDefaultPromptTemplates(): PromptTemplate[] {
  return [
    { id: '1', name: '生成可爱动物', content: '生成一个可爱的小动物图片' },
    { id: '2', name: '转换为卡通风格', content: '将图片转换为卡通动画风格' },
    { id: '3', name: '添加艺术效果', content: '为图片添加艺术滤镜效果，让它更有创意' },
    { id: '4', name: '生成风景画', content: '生成一幅美丽的自然风景画' },
    { id: '5', name: '科幻风格', content: '将图片转换为未来科幻风格' }
  ];
}

// 添加新提示词模板
export async function addPromptTemplate(name: string, content: string): Promise<PromptTemplate[]> {
  const templates = await loadPromptTemplates();
  const newTemplate: PromptTemplate = {
    id: Date.now().toString(),
    name: name.trim(),
    content: content.trim()
  };
  
  const updatedTemplates = [...templates, newTemplate];
  await savePromptTemplates(updatedTemplates);
  return updatedTemplates;
}

// 删除提示词模板
export async function deletePromptTemplate(id: string): Promise<PromptTemplate[]> {
  const templates = await loadPromptTemplates();
  const updatedTemplates = templates.filter(t => t.id !== id);
  await savePromptTemplates(updatedTemplates);
  return updatedTemplates;
}

// 更新提示词模板
export async function updatePromptTemplate(id: string, name: string, content: string): Promise<PromptTemplate[]> {
  const templates = await loadPromptTemplates();
  const updatedTemplates = templates.map(t => 
    t.id === id ? { ...t, name: name.trim(), content: content.trim() } : t
  );
  await savePromptTemplates(updatedTemplates);
  return updatedTemplates;
}