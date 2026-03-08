# FC封神榜 - 后端服务

## 项目结构

```
backend/
├── fengshen-common/          # 公共模块
├── fengshen-user/            # 用户服务 (端口: 8081)
├── fengshen-game/            # 游戏核心服务 (端口: 8080)
└── fengshen-save/            # 存档服务
```

## 技术栈

- Java 17
- Spring Boot 3.2.2
- MyBatis-Plus 3.5.5
- MySQL 8.0
- Redis 7.x
- JWT (Auth0)

## 快速开始

### 1. 环境要求

- JDK 17+
- Maven 3.9+
- MySQL 8.0+
- Redis 7.x (可选)

### 2. 数据库初始化

```bash
# 创建数据库并导入初始数据
mysql -u root -p < ../docs/sql/init.sql
```

### 3. 修改配置

编辑 `fengshen-user/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/fengshen?...
    username: your_username
    password: your_password
```

### 4. 构建项目

```bash
# 编译
mvn clean compile

# 打包
mvn clean package

# 跳过测试打包
mvn clean package -DskipTests
```

### 5. 运行服务

```bash
# 运行用户服务 (端口 8081)
cd fengshen-user
mvn spring-boot:run

# 或使用 jar 包运行
java -jar target/fengshen-user-1.0.0-SNAPSHOT.jar
```

## API文档

### 用户服务 (端口: 8081)

#### 用户注册
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "test",
  "password": "123456"
}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "userId": 1,
    "username": "test"
  }
}
```

#### 用户登录
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "test",
  "password": "123456"
}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9..."
  }
}
```

#### 获取用户信息
```
GET /api/auth/info
Authorization: Bearer {token}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "username": "test",
    "avatarUrl": null,
    "email": null,
    "phone": null,
    "status": 1,
    "createdAt": "2026-03-08T12:50:00",
    "updatedAt": "2026-03-08T12:50:00",
    "lastLogin": "2026-03-08T12:50:00"
  }
}
```

## 开发进度

- [x] Maven多模块项目搭建
- [x] Spring Boot 3.2.x配置
- [x] MyBatis-Plus集成
- [x] 数据库表设计
- [x] 用户认证系统 (JWT)
- [ ] WebSocket通信
- [ ] 游戏核心服务
- [ ] 存档服务
- [ ] 单元测试

## 下一步

1. 安装Maven: `brew install maven` (macOS)
2. 验证构建: `mvn clean compile`
3. 初始化数据库: 执行 `docs/sql/init.sql`
4. 启动用户服务: `cd fengshen-user && mvn spring-boot:run`
5. 测试API: 使用Postman或curl测试注册/登录接口

## 许可证

MIT
