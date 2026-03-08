# FC封神榜 - 前端项目

## 项目结构

```
frontend/
├── assets/                    # 资源文件
│   ├── textures/             # 图片素材
│   ├── audio/                # 音效音乐
│   └── fonts/                # 字体
├── scripts/                   # TypeScript脚本
│   ├── network/              # 网络通信
│   ├── data/                 # 数据管理
│   └── game/                 # 游戏逻辑
│       ├── battle/           # 战斗系统
│       ├── character/        # 角色控制
│       ├── ui/               # 界面UI
│       └── map/              # 地图系统
└── scenes/                    # Cocos场景
```

## 技术栈

- Cocos Creator 3.8+
- TypeScript 5.x
- WebSocket
- IndexedDB / wx.setStorageSync

## 快速开始

### 1. 安装Cocos Creator

下载地址: https://www.cocos.com/creator-download

### 2. 创建项目

1. 打开Cocos Dashboard
2. 新建项目 -> Empty (TypeScript)
3. 项目名称: fengshen-frontend
4. 保存到: /Users/gouqiang/fengshen/frontend

### 3. 导入脚本

将 `scripts/` 目录复制到项目 `assets/` 目录下

### 4. 配置项目

参考 `docs/frontend-setup.md` 配置网络和存储

## 开发进度

- [x] 项目结构设计
- [x] 网络通信模块
- [ ] 数据存储管理
- [ ] UI组件框架
- [ ] 战斗系统
- [ ] 角色系统
- [ ] 地图系统

## 下一步

1. 安装Cocos Creator 3.8+
2. 创建新项目
3. 导入脚本文件
4. 配置后端API地址
5. 开始开发

## 许可证

MIT
