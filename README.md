# NeoDB

<img src="public/app-icon.svg" width="128" align="right" />

NeoDB 是一个现代化、轻量级、跨平台的数据库管理工具。基于 Tauri v2 和 React 构建，旨在为开发者提供流畅、高效的数据库管理体验。

## ✨ 功能特性

- **🚀 多数据库支持**
  - 🐬 **MySQL**: 完整的 CRUD 支持、结果集直接编辑、DDL 查看、事务管理。
  - 💾 **SQLite**: 支持本地文件数据库连接、查询与结果展示。
  - 🔑 **Redis**: 键值对管理、多数据库切换、TTL 修改、数据类型自动识别与格式化。
  - 🗄️ **Memcached**: 缓存服务连接与基本操作。
- **📋 统一文本格式化器**
  - 内置强大的文本查看与格式化工具。
  - 支持 JSON, XML, PHP Serialize, HTML, Base64 等多种格式的自动识别与转换。
- **📟 命令控制台**
  - 实时监控应用发出的每一条数据库指令及其执行时长。
  - 方便调试与性能分析，支持一键复制代码。
- **🌐 国际化支持**
  - 全面适配中英文双语切换，默认为中文环境。
- **🎨 现代化 UI/UX**
  - 基于 shadcn/ui 的高颜值界面。
  - 完善的暗色模式支持。
  - 多标签页管理，支持右键快捷操作。
- **⚙️ 跨平台**
  - 支持 Windows, macOS 和 Linux。

## 🛠️ 技术栈

- **前端**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **后端**: [Rust](https://www.rust-lang.org/), [Tauri v2](https://tauri.app/)
- **状态管理**: [Zustand](https://github.com/pmndrs/zustand)
- **UI 框架**: [shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
- **国际化**: [i18next](https://www.i18next.com/)

## 🚀 开发指南

### 环境要求

- [Node.js](https://nodejs.org/) (建议 v18+)
- [Rust](https://www.rust-lang.org/tools/install) (用于 Tauri 后端)
- [pnpm](https://pnpm.io/) (推荐) 或 npm/yarn

### 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发环境
pnpm tauri dev

# 构建安装包
pnpm tauri build
```

## 📝 路线图 (Roadmap)

- [x] 多数据库连接管理
- [x] 多标签页系统
- [x] MySQL 数据结果集直接编辑
- [x] Redis 键值管理
- [x] SQLite 与 Memcached 支持
- [x] 统一文本格式化器 (JSON/PHP/Base64 等)
- [x] 实时命令控制台
- [x] 国际化 (i18n)
- [ ] PostgreSQL 深度集成
- [ ] 数据导入工具 (.sql, .csv)
- [ ] SSH 隧道连接支持
- [ ] 数据库设计可视化 (ER图预览)

## 📄 许可证

MIT
