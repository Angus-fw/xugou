# XUGOU - 基于CloudFlare搭建的轻量化监控平台

<div align="center">

![XUGOU Logo](frontend/public/logo.svg)

XUGOU 是一个基于 CloudFlare 的轻量化系统监控平台，提供系统监控和状态页面功能。

[English](./README_EN.md) | 简体中文

</div>

## ✨ 核心特性

- 🖥️ **系统监控**
  - 实时监控 CPU、内存、磁盘、网络等系统指标
  - 支持自定义监控间隔
  - 多平台支持（Windows、Linux、macOS）

- 🌐 **HTTP 监控**
  - 支持 HTTP/HTTPS 接口监控
  - 自定义请求方法、头部和请求体
  - 响应时间、状态码和内容检查

- 📊 **数据可视化**
  - 实时数据图表展示
  - 历史数据趋势分析
  - 自定义仪表盘

- 🌍 **状态页面**
  - 自定义状态页面
  - 支持多监控项展示
  - 响应式设计

## 🏗️ 系统架构

XUGOU 采用现代化的系统架构，包含以下组件：

- **Agent**: 轻量级系统监控客户端
- **Backend**: 基于 Cloudflare Workers 的后端服务
- **Frontend**: 基于 React + TypeScript 的现代化前端界面

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- Go >= 1.24

### 部署步骤

1. 克隆项目
```bash
git clone https://github.com/yourusername/xugou.git
cd xugou
```

2. 安装依赖
```bash
# 前端依赖安装
cd frontend
npm install

# 后端依赖安装
cd ../backend
npm install

```

3. 启动服务
```bash
# 启动后端服务
cd backend
npm run dev

# 启动前端服务
cd frontend
npm run dev

```

5. 访问系统
打开浏览器访问 `http://localhost:5173`

## 详细的视频部署教程

还没录

## ⭐ 支持我们

如果这个项目对您有帮助，请给我们一个 ⭐️ 支持！

## 🤝 贡献

欢迎所有形式的贡献，无论是新功能、bug 修复还是文档改进。

## 📄 开源协议

本项目采用 MIT 协议开源，详见 [LICENSE](./LICENSE) 文件。