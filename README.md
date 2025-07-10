# SoulSync - 心灵同步平台

一个基于现代 React 技术栈的情感交流与社交平台，旨在为用户提供一个温暖、安全的数字空间来分享心情、连接彼此。

## ✨ 特性

- 🎨 **精美设计** - 采用现代化设计语言，流畅的动画效果
- 💬 **留言墙** - 用户可以发布和浏览心情动态
- 📱 **响应式设计** - 完美适配各种设备和屏幕尺寸
- 🔐 **用户认证** - 安全的用户登录和注册系统
- 📞 **联系我们** - 便捷的用户反馈和联系方式
- 🌈 **动态背景** - 炫酷的视觉效果和交互体验

## 🚀 技术栈

- **前端框架**: React 19.1.0
- **构建工具**: Vite 7.0.0
- **路由**: React Router DOM 7.6.3
- **类型检查**: TypeScript 5.8.3
- **代码规范**: ESLint + Prettier
- **样式**: CSS3 + CSS Variables + Animations

## 📦 项目结构

```
src/
├── components/          # 组件库
│   ├── common/         # 通用组件 (Button, Navigation, DynamicBackground)
│   ├── features/       # 功能组件 (HeroSection, MessageCard, ContactForm)
│   └── layout/         # 布局组件 (PageLayout)
├── pages/              # 页面组件
│   ├── HomePage/       # 首页
│   ├── MessageWallPage/ # 留言墙
│   ├── ContactUsPage/  # 联系我们
│   └── LoginPage/      # 登录页
├── router/             # 路由配置
├── styles/             # 样式系统
│   ├── variables.css   # CSS 变量
│   ├── mixins.css      # CSS 混合器
│   ├── animations.css  # 动画定义
│   └── global.css      # 全局样式
└── main.jsx           # 应用入口
```

## 🛠️ 开发环境

### 前置要求

- Node.js >= 18.0.0
- npm >= 8.0.0

### 快速开始

```bash
# 克隆项目
git clone https://github.com/ShuaiFu29/soulSync.git
cd soulSync

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 常用命令

```bash
# 开发
npm run dev          # 启动开发服务器

# 构建
npm run build        # 构建生产版本
npm run preview      # 预览构建结果

# 代码检查
npm run lint         # 运行 ESLint
npm run lint:fix     # 自动修复 ESLint 错误
npm run type-check   # TypeScript 类型检查

# 代码格式化
npm run format       # 格式化代码
npm run format:check # 检查代码格式
```

## 🌟 核心功能

### 首页 (HomePage)
- 英雄区域展示
- 动态背景效果
- 导航菜单
- 统计信息展示

### 留言墙 (MessageWallPage)
- 发布心情动态
- 浏览其他用户留言
- 留言卡片展示
- 实时更新

### 联系我们 (ContactUsPage)
- 用户反馈表单
- 联系方式展示
- 社交媒体链接

### 登录页 (LoginPage)
- 用户登录界面
- 表单验证
- 响应式设计

## 🎨 设计系统

项目采用统一的设计系统，包括：

- **颜色主题**: 基于 CSS 变量的主题色彩
- **字体系统**: 层次化的字体大小和行高
- **动画效果**: 流畅的过渡和交互动画
- **组件规范**: 统一的组件 API 和样式规范

## 🚀 部署

### 生产构建

```bash
npm run build
```

### 使用 Nginx 部署

项目包含 `nginx.conf` 配置文件，可直接用于生产环境部署。

### 环境变量

根据需要创建 `.env` 文件：

```env
VITE_API_BASE_URL=https://api.soulsync.com
VITE_APP_TITLE=SoulSync
```

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 开发规范

- 遵循 ESLint 和 Prettier 配置
- 使用 TypeScript 进行类型检查
- 组件命名采用 PascalCase
- 文件夹结构保持清晰和一致性
- 编写清晰的注释和文档

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 👥 团队

- **开发者**: ShuaiFu29
- **项目地址**: https://github.com/ShuaiFu29/soulSync

---

**SoulSync** - 连接心灵，同步情感 💝