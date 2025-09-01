# 🎨 img-cool - AI智能绘图工具

<p align="center">
  <picture style="width: 320px">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/joeseesun/img-cool/blob/main/apps/web/public/logo/logo_drawnix_h.svg?raw=true" />
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/joeseesun/img-cool/blob/main/apps/web/public/logo/logo_drawnix_h_dark.svg?raw=true" />
    <img src="https://github.com/joeseesun/img-cool/blob/main/apps/web/public/logo/logo_drawnix_h.svg?raw=true" width="360" alt="img-cool logo" />
  </picture>
</p>

<div align="center">
  <h2>
    🤖 AI智能绘图工具，支持文本生图、几何图形AI处理、快捷提示词等功能
  <br />
  </h2>
</div>

<div align="center">
  <figure>
    <a target="_blank" rel="noopener">
      <img src="https://github.com/joeseesun/img-cool/blob/main/apps/web/public/product_showcase/case-2.png?raw=true" alt="Product showcase" width="80%" />
    </a>
    <figcaption>
      <p align="center">
        AI智能绘图工具，集文本生图、几何AI处理、思维导图于一体
      </p>
    </figcaption>
  </figure>
</div>

## ✨ 核心特性

### 🤖 AI智能功能 (NEW! 🔥🔥🔥)
- **文本生图**: 基于自然语言描述生成高质量图像
- **几何图形AI处理**: 智能转换基础几何图形为AI生成的精美图像
- **快捷提示词**: 预设模板快速生成内容，支持自定义管理
- **批量处理**: 同时处理多个选中的几何图形

### 🎨 绘图功能
- 💯 免费 + 开源
- ⚒️ 思维导图、流程图
- 🖌 画笔和自由绘制
- 🔷 几何图形：矩形、圆形、三角形等
- 😀 插入图片
- 🚀 基于插件机制
- 🖼️ 📃 导出为 PNG, JSON(`.drawnix`)
- 💾 自动保存（浏览器缓存）
- ⚡ 编辑特性：撤销、重做、复制、粘贴等
- 🌌 无限画布：缩放、滚动
- 🎨 主题模式
- 📱 移动设备适配
- 📈 支持 mermaid 语法转流程图
- ✨ 支持 markdown 文本转思维导图

## 🚀 快速开始

### 在线体验

立即访问在线版本开始创作：

**🌐 [在线演示 - img-cool](https://nano.qiaomu.ai/)**

### 一键部署到Vercel

点击下方按钮，一键部署你自己的img-cool实例：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/joeseesun/img-cool)

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/joeseesun/img-cool.git
cd img-cool

# 安装依赖
npm install

# 启动开发服务器
npm start

# 访问 http://localhost:7200
```

## 🎯 使用指南

### AI图像生成
1. **文本生图**: 
   - 点击魔法棒图标
   - 输入图像描述（支持快捷提示词）
   - 等待AI生成
   
2. **几何图形AI处理**:
   - 绘制或选中几何图形
   - 按Tab键或点击AI处理按钮
   - 输入转换提示词
   - 查看AI生成结果

### 快捷提示词
1. 点击⚡图标查看预设提示词
2. 在设置中管理自定义提示词模板
3. 一键应用提示词到输入框

### API配置
1. 点击右上角设置按钮
2. 在"API配置"中输入你的AI服务API Key
3. 保存后即可使用所有AI功能

**🐰 推荐AI服务**: [兔子API - 注册获取免费额度](https://api.tu-zi.com/register?aff=yyaz)

## 🛠 技术架构

### 技术栈
- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite + Nx Monorepo
- **编辑器核心**: Plait编辑器框架
- **样式方案**: Sass + CSS Modules
- **AI集成**: 支持多种AI模型接口

### 项目结构
```
img-cool/
├── apps/
│   └── web/                 # 主Web应用
├── packages/
│   ├── drawnix/            # 核心绘图引擎
│   ├── react-board/        # 画板组件
│   └── react-text/         # 文本组件
├── dist/                   # 构建输出
└── vercel.json            # Vercel部署配置
```

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 开发流程
1. Fork本仓库
2. 创建功能分支: `git checkout -b feature/amazing-feature`
3. 提交变更: `git commit -m 'feat: add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 创建Pull Request

## 📝 更新日志

### v1.0.0 (2025-09-01)
- 🎉 首次发布
- ✨ AI图像生成功能
- ⚡ 快捷提示词系统
- 🎨 多样化绘图工具
- 🚀 Vercel部署支持

## 🙏 致谢

- [Plait](https://github.com/plait-board/plait) - 强大的编辑器框架
- [Nx](https://nx.dev/) - 优秀的Monorepo工具
- [Vercel](https://vercel.com/) - 便捷的部署平台

## 📄 许可证

MIT License

---

**🌟 如果你觉得这个项目有用，请给个Star支持一下！**

[⭐ Star on GitHub](https://github.com/joeseesun/img-cool) | [🚀 在线体验](https://nano.qiaomu.ai/) | [📝 反馈建议](https://github.com/joeseesun/img-cool/issues)