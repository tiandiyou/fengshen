# FC封神榜 - 在线游戏复刻项目

> **基于经典FC游戏《封神榜:伏魔三太子》的在线复刻版本**
> 技术栈: Java 17 + Spring Boot + Cocos Creator + 微信小游戏

---

## 📖 项目简介

本项目旨在使用现代技术复刻经典FC游戏《封神榜:伏魔三太子》,支持Web浏览器和微信小游戏双平台运行。

### 核心特色
- ✅ **完整复刻**: 20章节完整剧情流程
- ✅ **回合制战斗**: 经典RPG战斗系统
- ✅ **四大主角**: 哪吒、小龙女、杨戬、姜子牙
- ✅ **多平台支持**: Web + 微信小游戏
- ✅ **云存档**: 跨设备存档同步

---

## 🎮 游戏特色

### 四大主角
| 角色 | 类型 | 特点 | 加入章节 |
|------|------|------|---------|
| **哪吒** | 物理/力量型 | 最高物理攻击 | 第一章 |
| **小龙女** | 法术/治疗型 | 唯一复活技能 | 第一章 |
| **杨戬** | 混合型战士 | 幻术AOE伤害 | 第三章 |
| **姜子牙** | 辅助型军师 | 强力BUFF技能 | 第六章 |

### 核心系统
- ⚔️ **回合制战斗系统** - 基于敏捷的行动顺序
- 🛡️ **装备强化系统** - 武器、防具、饰品
- ✨ **法术技能系统** - 治疗系、幻术系、辅助系
- 📈 **角色成长系统** - 经验值、等级、属性提升
- 📚 **章节剧情系统** - 20章节完整故事

---

## 🛠️ 技术栈

### 后端技术
```
Java 17 LTS
Spring Boot 3.2.x
Spring WebSocket (实时通信)
Spring Security + JWT (认证)
MyBatis-Plus 3.5.x (ORM)
MySQL 8.0 (主数据库)
Redis 7.x (缓存/会话)
MongoDB (日志)
RabbitMQ (消息队列)
```

### 前端技术
```
Cocos Creator 3.x (游戏引擎)
TypeScript (开发语言)
wx API (微信小游戏适配)
WebSocket (网络通信)
IndexedDB / wx.setStorageSync (存档)
```

---

## 📚 文档结构

```
fengshen-game/
├── docs/
│   ├── game-design/                    # 游戏设计
│   │   ├── story-chapters.md              # 章节流程
│   │   └── game-mechanics.md              # 游戏机制
│   ├── technical/                      # 技术文档
│   │   ├── tech-stack.md                  # 技术选型
│   │   └── development-roadmap.md         # 开发路线图
│   └── research/                       # 研究资料
│       └── research-summary.md             # 研究汇总
└── README.md
```

### 核心文档
- 📖 [章节流程文档](docs/game-design/story-chapters.md) - 20章节完整流程
- ⚙️ [游戏机制文档](docs/game-design/game-mechanics.md) - 战斗/法术/装备系统
- 🔧 [技术选型文档](docs/technical/tech-stack.md) - 技术栈详解
- 🗺️ [开发路线图](docs/technical/development-roadmap.md) - 20周开发计划
- 📊 [研究资料汇总](docs/research/research-summary.md) - NES/游戏引擎研究

---

## 🚀 快速开始

### 环境要求
- JDK 17+
- Maven 3.9+
- MySQL 8.0+
- Redis 7.x
- Node.js 18+
- Cocos Creator 3.8+
- 微信开发者工具

### 后端启动
```bash
# 克隆项目
git clone https://github.com/yourname/fengshen-backend.git
cd fengshen-backend

# 导入数据库
mysql -u root -p < docs/sql/init.sql

# 启动服务
mvn spring-boot:run
```

### 前端启动
```bash
# 克隆项目
git clone https://github.com/yourname/fengshen-client.git
cd fengshen-client

# 安装依赖
npm install

# 启动开发服务器
# 使用Cocos Creator打开项目,点击运行
```

---

## 📅 开发计划

### 开发时间线 (20周)

| 阶段 | 时间 | 主要内容 |
|------|------|---------|
| **Phase 0** | Week 1 | 项目初始化 |
| **Phase 1** | Week 2-3 | 后端基础架构 |
| **Phase 2** | Week 4-5 | 前端基础架构 |
| **Phase 3** | Week 6-9 | 核心游戏系统 |
| **Phase 4** | Week 10-15 | 游戏内容开发 |
| **Phase 5** | Week 16-17 | 小程序适配 |
| **Phase 6** | Week 18-19 | 测试与优化 |
| **Phase 7** | Week 20 | 部署上线 |

详见 [开发路线图](docs/technical/development-roadmap.md)

---

## 🎯 里程碑

- [x] 项目文档完成
- [ ] 后端架构搭建
- [ ] 前端架构搭建
- [ ] 战斗系统完成
- [ ] 第一章完成
- [ ] 小程序发布

---

## 🤝 贡献指南

本项目仅用于学习和研究目的,暂不接受外部贡献。

---

## ⚠️ 版权声明

**重要提示:**
- 本项目**不使用**原版ROM或素材
- 所有游戏资源**自行设计创作**
- 代码采用 MIT 协议开源
- **仅供学习研究,禁止商业使用**

---

## 📞 联系方式

- 项目主页: 待补充
- 问题反馈: GitHub Issues
- 作者: 待补充

---

## 🙏 致谢

- 原版游戏: FC封神榜(伏魔三太子)
- 参考资源: NESdev Wiki, B站攻略, 乐游网
- 游戏引擎: Cocos Creator
- 后端框架: Spring Boot

---

**最后更新:** 2026-03-08
**项目状态:** 🟡 研究阶段 → 准备开发
