# PlaitBoard图片处理经验总结

## 核心问题解决方案

### 问题背景
选中多张图片进行AI处理时，缺乏视觉反馈，用户不知道处理状态。

### 解决方案：占位图片法
从DOM操作彻底转向占位图片替换策略。

## 关键技术发现

### 1. PlaitBoard元素结构
```typescript
// 正确的图片元素结构
const imageElement = {
  id: idCreator(),                    // 使用框架ID生成器
  type: 'image',                      // 元素类型
  points: [startPoint, [endX, endY]], // 矩形边界点（必须！）
  url: dataURL,                       // 图片数据URL
  width: number,                      // 显示宽度
  height: number                      // 显示高度
};
```

### 2. API选择经验
- ❌ `DrawTransforms.insertImage()` - 返回void，无法获取元素ID
- ✅ `Transforms.insertNode()` - 直接插入，保留元素引用

### 3. 占位图片实现
```typescript
// SVG占位图片，内置呼吸动画
const createPlaceholderImage = (width: number, height: number): string => {
  const svg = `<svg>...</svg>`;  // 包含animate元素的SVG
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
```

### 4. 定位算法（优化版）
```typescript
// 计算选中图片的整体矩形区域
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

selectedImages.forEach(img => {
  if (img.points && img.points.length >= 2) {
    const [startPoint, endPoint] = img.points;
    minX = Math.min(minX, startPoint[0]);
    minY = Math.min(minY, startPoint[1]);
    maxX = Math.max(maxX, endPoint[0]);
    maxY = Math.max(maxY, endPoint[1]);
  }
});

// 在选中区域右侧20px插入占位图片
if (minX !== Infinity) {
  startPoint = [maxX + 20, minY];
}
```

## 常见错误与修复

### 1. "points is not iterable"
- **原因**：PlaitBoard几何系统需要points数组
- **修复**：`points: [startPoint, [startPoint[0] + width, startPoint[1] + height]]`

### 2. "InvalidCharacterError" (btoa编码)
- **原因**：中文字符无法直接base64编码
- **修复**：SVG文本使用英文 "Processing..." 替代 "AI处理中..."

### 3. DOM选择器失效
- **原因**：动态生成的元素ID无法预测
- **修复**：完全放弃DOM操作，使用占位图片法

### 4. "DrawTransforms.removeElements is not a function"
- **原因**：错误的删除API调用
- **修复**：使用 `CoreTransforms.removeElements(board, [element])` 替代

### 5. 移动占位图片后替换位置错误
- **原因**：错误从 `element.x, element.y` 获取位置
- **修复**：从 `element.points[0]` 获取正确位置

## 调用方法

### 基础工作流
```typescript
// 1. 插入占位图片
const placeholderId = await insertPlaceholderImage(board, selectedImages);

// 2. 处理AI请求
const result = await processAIRequest(...);

// 3. 替换为真实结果
await replaceImageById(board, placeholderId, resultFile);
```

### 完整示例（ai-simple-dialog.tsx）
```typescript
const handleSubmit = async () => {
  // 插入占位图片
  const placeholderId = await insertPlaceholderImage(board, selectedElements);
  
  try {
    // AI处理
    const result = await fetch('/api/ai-process', {...});
    const blob = await result.blob();
    const file = new File([blob], 'result.png', { type: 'image/png' });
    
    // 替换占位图片
    await replaceImageById(board, placeholderId, file);
  } catch (error) {
    // 错误时删除占位图片
    console.error('AI处理失败:', error);
  }
};
```

## Linus式经验原则

### 1. 数据结构优先
"Bad programmers worry about the code. Good programmers worry about data structures."
- PlaitBoard的points数组是核心，理解它比了解API更重要

### 2. 消除特殊情况
"好代码没有特殊情况"
- DOM操作有太多边界情况，占位图片法统一了所有场景

### 3. 简洁性检验
"如果需要超过3层缩进，重新设计它"
- 原方案：选择器查找→状态管理→DOM操作→错误处理
- 新方案：插入占位→处理→替换，3步完成

### 4. 零破坏性
"Never break userspace"
- 占位图片不影响现有任何功能
- 失败时优雅降级，不留垃圾元素

## 调试建议

### 控制台输出要点
```typescript
console.log('📝 插入占位图片，尺寸:', width, 'x', height, '元素ID:', placeholderId);
console.log('🔍 查找占位图片:', elementId, '当前所有元素:', board.children.map(el => ({id: el.id, type: el.type})));
console.log('✅ 替换成功' / '❌ 未找到占位图片');
```

### 关键检查点
1. `idCreator()` 是否生成有效ID
2. `points` 数组格式是否正确
3. `board.children` 是否包含插入的元素
4. 替换时ID匹配是否成功

这个方案的优雅之处：用最简单的"插入-替换"模式，彻底避开了DOM状态管理的复杂性。