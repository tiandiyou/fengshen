# FC封神榜 - 环境安装指南

## 系统要求

- macOS (已检测到)
- Homebrew (✅ 已安装)
- 管理员权限 (需要输入密码)

---

## 第一步: 安装Java 17

### 方式A: 使用Homebrew (推荐)

```bash
# 安装OpenJDK 17
brew install openjdk@17

# 创建符号链接 (需要输入密码)
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk \
     /Library/Java/JavaVirtualMachines/openjdk-17.jdk

# 配置环境变量
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 验证安装
java -version
```

### 方式B: 下载Oracle JDK

1. 访问: https://www.oracle.com/java/technologies/downloads/#java17
2. 下载 macOS ARM64 版本
3. 双击安装包安装
4. 验证: `java -version`

---

## 第二步: 安装MySQL 8.0

### 安装MySQL

```bash
# 安装MySQL
brew install mysql@8.0

# 启动MySQL服务
brew services start mysql@8.0

# 配置MySQL (设置root密码)
mysql_secure_installation

# 按提示操作:
# - 设置root密码: 建议使用简单密码如 "root123" (开发环境)
# - 移除匿名用户: Yes
# - 禁止root远程登录: Yes
# - 删除test数据库: Yes
# - 重新加载权限表: Yes
```

### 验证MySQL

```bash
# 连接MySQL
mysql -u root -p

# 输入你设置的密码，成功连接后输入:
SHOW DATABASES;

# 退出
EXIT;
```

### 创建项目数据库

```bash
# 方式1: 使用命令行
mysql -u root -p < /Users/gouqiang/fengshen/docs/sql/init.sql

# 方式2: 在MySQL中执行
mysql -u root -p
```

```sql
-- 在MySQL命令行中执行
CREATE DATABASE IF NOT EXISTS fengshen
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- 创建用户 (可选)
CREATE USER 'fengshen'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON fengshen.* TO 'fengshen'@'localhost';
FLUSH PRIVILEGES;

-- 导入数据
USE fengshen;
SOURCE /Users/gouqiang/fengshen/docs/sql/init.sql;
```

---

## 第三步: 安装Redis (可选)

```bash
# 安装Redis
brew install redis

# 启动Redis服务
brew services start redis

# 验证Redis
redis-cli ping
# 应该返回: PONG
```

---

## 第四步: 验证环境

### 检查所有安装

```bash
# Java
java -version
# 应该显示: openjdk version "17.x.x"

# Maven
mvn -version
# 应该显示: Apache Maven 3.x.x

# MySQL
mysql --version
# 应该显示: mysql  Ver 8.0.x

# Redis (可选)
redis-cli --version
# 应该显示: redis-cli 7.x.x
```

---

## 第五步: 配置后端项目

### 修改数据库配置

编辑文件: `/Users/gouqiang/fengshen/backend/fengshen-user/src/main/resources/application.yml`

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/fengshen?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true
    username: root
    password: YOUR_PASSWORD_HERE  # 改成你的MySQL密码
```

---

## 第六步: 构建和运行

### 构建项目

```bash
cd /Users/gouqiang/fengshen/backend

# 清理并编译
mvn clean compile

# 打包 (跳过测试)
mvn clean package -DskipTests
```

### 运行用户服务

```bash
cd /Users/gouqiang/fengshen/backend/fengshen-user

# 方式1: 使用Maven运行
mvn spring-boot:run

# 方式2: 使用jar包运行
java -jar target/fengshen-user-1.0.0-SNAPSHOT.jar
```

### 测试API

```bash
# 测试健康检查
curl http://localhost:8081/api/actuator/health

# 注册用户
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456"}'

# 登录
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456"}'

# 获取用户信息 (需要替换YOUR_TOKEN)
curl http://localhost:8081/api/auth/info \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 快速安装命令 (复制粘贴)

```bash
# 一键安装所有依赖 (需要输入密码多次)
brew install openjdk@17 mysql@8.0 redis

# 配置Java
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk \
     /Library/Java/JavaVirtualMachines/openjdk-17.jdk
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 启动服务
brew services start mysql@8.0
brew services start redis

# 配置MySQL
mysql_secure_installation

# 创建数据库
mysql -u root -p < /Users/gouqiang/fengshen/docs/sql/init.sql

# 验证
java -version
mvn -version
mysql --version
redis-cli ping
```

---

## 故障排除

### Java安装问题

```bash
# 如果提示权限错误
sudo chown -R $(whoami) /opt/homebrew/opt/openjdk@17

# 如果环境变量不生效
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### MySQL连接问题

```bash
# 检查MySQL是否运行
brew services list | grep mysql

# 重启MySQL
brew services restart mysql@8.0

# 查看MySQL日志
tail -f /opt/homebrew/var/log/mysql/error.log
```

### Maven构建问题

```bash
# 清理Maven缓存
rm -rf ~/.m2/repository

# 重新下载依赖
mvn clean install -U
```

---

## 下一步

环境安装完成后:

1. ✅ 修改 `application.yml` 中的数据库密码
2. ✅ 运行 `mvn clean compile` 验证构建
3. ✅ 运行 `mvn spring-boot:run` 启动服务
4. ✅ 使用Postman或curl测试API
5. ⏸️ 安装Cocos Creator (需要手动下载)

---

**安装完成后告诉我，我会帮你验证环境并运行项目！** 🚀
