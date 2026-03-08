# FC封神榜 - 技术选型文档

## 一、总体架构

```
┌─────────────────────────────────────────────────────────┐
│                   客户端层 (Client)                       │
├──────────────────────┬──────────────────────────────────┤
│   微信小程序端         │        Web浏览器端               │
│  (LayaBox/Cocos)     │     (同一套代码编译)              │
└──────────────────────┴──────────────────────────────────┘
                          ↕ WebSocket / HTTP
┌─────────────────────────────────────────────────────────┐
│                  网关层 (Gateway)                         │
│           Spring Cloud Gateway / Nginx                  │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                  后端服务层 (Backend)                     │
├──────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │ 用户服务    │  │ 游戏服务    │  │ 存档服务    │       │
│  │User Service│  │Game Service│  │Save Service│       │
│  └────────────┘  └────────────┘  └────────────┘       │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │ 战斗服务    │  │ 背包服务    │  │ 社交服务    │       │
│  │Battle Svc  │  │InventorySvc│  │Social Svc  │       │
│  └────────────┘  └────────────┘  └────────────┘       │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                  数据层 (Data)                            │
├──────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │   MySQL    │  │   Redis    │  │  MongoDB   │       │
│  │  (用户数据) │  │ (缓存/会话) │  │  (游戏日志) │       │
│  └────────────┘  └────────────┘  └────────────┘       │
└─────────────────────────────────────────────────────────┘
```

---

## 二、后端技术栈

### 2.1 核心框架
| 技术 | 版本 | 用途 |
|------|------|------|
| **Java** | 17 LTS | 开发语言 |
| **Spring Boot** | 3.2.x | 核心框架 |
| **Spring WebSocket** | - | 实时通信 |
| **Spring Security** | - | 安全认证 |
| **MyBatis-Plus** | 3.5.x | ORM框架 |
| **JWT** | - | 无状态认证 |

### 2.2 数据存储
| 技术 | 用途 |
|------|------|
| **MySQL 8.0** | 用户数据、角色数据、存档数据 |
| **Redis 7.x** | 会话管理、实时状态、排行榜缓存 |
| **MongoDB** | 游戏日志、操作记录 |

### 2.3 中间件
| 技术 | 用途 |
|------|------|
| **RabbitMQ** | 异步消息队列(战斗结算、奖励发放) |
| **Nginx** | 反向代理、负载均衡 |

---

## 三、前端技术栈

### 3.1 游戏引擎对比

| 引擎 | 语言 | 小程序支持 | 性能 | 学习曲线 | 推荐度 |
|------|------|-----------|------|----------|--------|
| **Cocos Creator** | TypeScript/JS | ✅ 官方支持 | ⭐⭐⭐⭐⭐ | 中等 | ⭐⭐⭐⭐⭐ |
| **LayaBox** | TypeScript/JS | ✅ 官方支持 | ⭐⭐⭐⭐⭐ | 中等 | ⭐⭐⭐⭐ |
| **Egret** | TypeScript | ✅ 支持 | ⭐⭐⭐⭐ | 较低 | ⭐⭐⭐ |
| **Phaser** | JavaScript | ❌ 需适配 | ⭐⭐⭐⭐ | 较低 | ⭐⭐ |

### 3.2 最终选择: **Cocos Creator 3.x**

**理由:**
1. ✅ 官方原生支持微信小游戏发布
2. ✅ 2D游戏开发成熟(回合制RPG非常适合)
3. ✅ 完善的UI系统(对话框、菜单、背包界面)
4. ✅ TypeScript开发,类型安全
5. ✅ 丰富的社区资源和插件
6. ✅ 支持发布到Web/H5/多平台

### 3.3 微信小程序适配
```javascript
// Cocos Creator 发布到微信小游戏
// 构建设置选择 "微信小游戏" 平台
// 自动适配:
// - Canvas 渲染
// - 音频系统
// - 存储系统 (wx.setStorageSync)
// - 分享功能
```

---

## 四、通信协议设计

### 4.1 HTTP API (RESTful)
用于非实时操作:
- 用户注册/登录
- 获取游戏配置
- 存档上传/下载
- 排行榜查询

### 4.2 WebSocket (实时通信)
用于实时游戏操作:
- 战斗指令同步
- 多人协作
- 实时通知

**消息格式:**
```json
{
  "type": "BATTLE_ACTION",
  "timestamp": 1234567890,
  "data": {
    "characterId": "nezha",
    "action": "ATTACK",
    "targetId": "enemy_001",
    "skillId": null
  }
}
```

---

## 五、数据库设计

### 5.1 用户表 (user)
```sql
CREATE TABLE user (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  openid VARCHAR(64) UNIQUE COMMENT '微信openid',
  username VARCHAR(32),
  avatar_url VARCHAR(255),
  created_at DATETIME,
  last_login DATETIME
);
```

### 5.2 角色存档表 (game_save)
```sql
CREATE TABLE game_save (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  current_chapter INT DEFAULT 1 COMMENT '当前章节',
  current_location VARCHAR(64) COMMENT '当前位置',
  gold INT DEFAULT 0 COMMENT '金币',
  play_time INT DEFAULT 0 COMMENT '游戏时长(秒)',
  created_at DATETIME,
  updated_at DATETIME,
  INDEX idx_user_id (user_id)
);
```

### 5.3 角色数据表 (character_data)
```sql
CREATE TABLE character_data (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  save_id BIGINT,
  character_type ENUM('NEZHA', 'XIAO_LONG_NV', 'YANG_JIAN', 'JIANG_ZI_YA'),
  level INT DEFAULT 1,
  exp INT DEFAULT 0,
  hp INT,
  mp INT,
  attack INT,
  defense INT,
  agility INT,
  stamina INT,
  equipment JSON COMMENT '装备信息',
  skills JSON COMMENT '已学技能',
  INDEX idx_save_id (save_id)
);
```

### 5.4 背包表 (inventory)
```sql
CREATE TABLE inventory (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  save_id BIGINT,
  item_id VARCHAR(32),
  item_type ENUM('WEAPON', 'ARMOR', 'ACCESSORY', 'CONSUMABLE'),
  quantity INT DEFAULT 1,
  equipped BOOLEAN DEFAULT FALSE,
  INDEX idx_save_id (save_id)
);
```

---

## 六、项目模块划分

### 6.1 后端模块
```
fengshen-backend/
├── fengshen-common/          # 公共模块
│   ├── common-utils/         # 工具类
│   └── common-domain/        # 公共实体
├── fengshen-gateway/         # 网关服务
├── fengshen-user/            # 用户服务
│   ├── controller/
│   ├── service/
│   ├── mapper/
│   └── entity/
├── fengshen-game/            # 游戏核心服务
│   ├── controller/
│   ├── service/
│   │   ├── BattleService     # 战斗逻辑
│   │   ├── ChapterService    # 章节管理
│   │   ├── ItemService       # 物品系统
│   │   └── SkillService      # 技能系统
│   ├── websocket/            # WebSocket处理
│   └── game-engine/          # 游戏引擎核心
├── fengshen-save/            # 存档服务
└── fengshen-social/          # 社交服务
```

### 6.2 前端模块
```
fengshen-client/
├── assets/                   # 资源文件
│   ├── textures/            # 图片素材
│   ├── audio/               # 音效音乐
│   └── fonts/               # 字体
├── scripts/                  # 脚本
│   ├── game/                # 游戏逻辑
│   │   ├── battle/          # 战斗系统
│   │   ├── map/             # 地图系统
│   │   ├── character/       # 角色控制
│   │   └── ui/              # 界面UI
│   ├── network/             # 网络通信
│   │   ├── http.ts          # HTTP请求
│   │   └── websocket.ts     # WebSocket
│   └── data/                # 数据管理
│       ├── save-data.ts     # 存档数据
│       └── game-config.ts   # 游戏配置
└── scenes/                   # 场景
    ├── main-menu.scene      # 主菜单
    ├── battle.scene         # 战斗场景
    ├── world-map.scene      # 世界地图
    └── inventory.scene      # 背包界面
```

---

## 七、部署架构

### 7.1 开发环境
- 本地开发: Spring Boot + 本地MySQL/Redis
- 前端调试: Cocos Creator + 微信开发者工具

### 7.2 生产环境
```
┌─────────────────────────────────────┐
│          负载均衡 (Nginx)            │
└─────────────────────────────────────┘
         ↕                ↕
┌──────────────┐  ┌──────────────┐
│  应用服务器1   │  │  应用服务器2   │
│ Spring Boot  │  │ Spring Boot  │
└──────────────┘  └──────────────┘
         ↕                ↕
┌─────────────────────────────────────┐
│        数据库集群 (主从)              │
│   MySQL Master + MySQL Slave        │
│   Redis Cluster                     │
└─────────────────────────────────────┘
```

---

## 八、开发计划

### Phase 1: 基础架构 (2周)
- [ ] 搭建Spring Boot项目
- [ ] 设计数据库表结构
- [ ] 实现用户认证系统
- [ ] 搭建Cocos Creator项目

### Phase 2: 核心系统 (4周)
- [ ] 实现回合制战斗系统
- [ ] 角色属性和升级系统
- [ ] 装备和物品系统
- [ ] 技能系统

### Phase 3: 内容开发 (6周)
- [ ] 第一章: 四海龙宫
- [ ] 第二章: 地狱修行
- [ ] 第三章: 哪吒重生
- [ ] ...后续章节

### Phase 4: 小程序适配 (2周)
- [ ] 微信登录集成
- [ ] 小游戏发布适配
- [ ] 性能优化

---

## 九、关键技术点

### 9.1 战斗系统实现
```java
@Service
public class BattleService {
    
    // 回合制战斗核心逻辑
    public BattleResult executeTurn(BattleAction action) {
        // 1. 计算行动顺序(基于敏捷)
        // 2. 执行攻击/技能
        // 3. 计算伤害(攻击-防御+随机浮动)
        // 4. 应用状态效果(中毒/混乱等)
        // 5. 判断战斗结束条件
        // 6. 返回战斗结果
    }
    
    // 伤害计算公式
    private int calculateDamage(int attack, int defense) {
        int baseDamage = attack - defense;
        float randomFactor = 0.9f + random.nextFloat() * 0.2f; // 0.9-1.1倍浮动
        return (int)(baseDamage * randomFactor);
    }
}
```

### 9.2 WebSocket实时通信
```java
@Component
public class GameWebSocketHandler extends TextWebSocketHandler {
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        // 解析消息
        GameMessage msg = parseMessage(message);
        
        // 根据消息类型分发处理
        switch(msg.getType()) {
            case BATTLE_ACTION:
                battleService.handleAction(session, msg);
                break;
            case SYNC_STATE:
                syncService.syncGameState(session, msg);
                break;
        }
    }
}
```

---

## 十、性能优化策略

### 10.1 后端优化
- Redis缓存热点数据(角色配置、物品信息)
- 数据库读写分离
- WebSocket连接池管理
- 异步处理战斗结算

### 10.2 前端优化
- 图集打包减少Draw Call
- 对象池复用节点
- 分帧加载大地图
- 音效预加载

---

**更新时间:** 2026-03-08
**版本:** v1.0
