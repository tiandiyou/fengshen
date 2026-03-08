-- =============================================
-- FC封神榜 - 数据库表结构 (无示例数据)
-- =============================================

CREATE DATABASE IF NOT EXISTS `fengshen`
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE `fengshen`;

-- 用户表
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    `openid` VARCHAR(64) DEFAULT NULL COMMENT '微信openid',
    `username` VARCHAR(32) NOT NULL COMMENT '用户名',
    `password` VARCHAR(128) NOT NULL COMMENT '密码(加密)',
    `avatar_url` VARCHAR(255) DEFAULT NULL COMMENT '头像URL',
    `email` VARCHAR(64) DEFAULT NULL COMMENT '邮箱',
    `phone` VARCHAR(20) DEFAULT NULL COMMENT '手机号',
    `status` TINYINT DEFAULT 1 COMMENT '状态: 0-禁用, 1-正常',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `last_login` DATETIME DEFAULT NULL COMMENT '最后登录时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_username` (`username`),
    UNIQUE KEY `uk_openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 游戏存档表
DROP TABLE IF EXISTS `game_save`;
CREATE TABLE `game_save` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '存档ID',
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `save_name` VARCHAR(32) DEFAULT '存档1' COMMENT '存档名称',
    `current_chapter` INT DEFAULT 1 COMMENT '当前章节',
    `current_location` VARCHAR(64) DEFAULT '陈塘关' COMMENT '当前位置',
    `gold` INT DEFAULT 0 COMMENT '金币',
    `play_time` INT DEFAULT 0 COMMENT '游戏时长(秒)',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    CONSTRAINT `fk_save_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 角色数据表
DROP TABLE IF EXISTS `character_data`;
CREATE TABLE `character_data` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '角色数据ID',
    `save_id` BIGINT NOT NULL COMMENT '存档ID',
    `character_type` VARCHAR(32) NOT NULL COMMENT '角色类型',
    `level` INT DEFAULT 1 COMMENT '等级',
    `exp` INT DEFAULT 0 COMMENT '经验值',
    `hp` INT NOT NULL COMMENT '当前HP',
    `mp` INT NOT NULL COMMENT '当前MP',
    `max_hp` INT NOT NULL COMMENT '最大HP',
    `max_mp` INT NOT NULL COMMENT '最大MP',
    `attack` INT NOT NULL COMMENT '攻击力',
    `defense` INT NOT NULL COMMENT '防御力',
    `agility` INT NOT NULL COMMENT '敏捷',
    `stamina` INT NOT NULL COMMENT '体能',
    `equipment` JSON DEFAULT NULL COMMENT '装备信息',
    `skills` JSON DEFAULT NULL COMMENT '已学技能列表',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_save_id` (`save_id`),
    CONSTRAINT `fk_character_save` FOREIGN KEY (`save_id`) REFERENCES `game_save` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 背包表
DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '背包ID',
    `save_id` BIGINT NOT NULL COMMENT '存档ID',
    `item_id` VARCHAR(32) NOT NULL COMMENT '物品ID',
    `item_type` VARCHAR(32) NOT NULL COMMENT '物品类型',
    `quantity` INT DEFAULT 1 COMMENT '数量',
    `equipped` TINYINT DEFAULT 0 COMMENT '是否装备',
    `equipped_character` VARCHAR(32) DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_save_id` (`save_id`),
    CONSTRAINT `fk_inventory_save` FOREIGN KEY (`save_id`) REFERENCES `game_save` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 物品配置表
DROP TABLE IF EXISTS `item_config`;
CREATE TABLE `item_config` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '配置ID',
    `item_id` VARCHAR(32) NOT NULL COMMENT '物品ID',
    `item_name` VARCHAR(64) NOT NULL COMMENT '物品名称',
    `item_type` VARCHAR(32) NOT NULL COMMENT '物品类型',
    `description` VARCHAR(255) DEFAULT NULL COMMENT '物品描述',
    `attack` INT DEFAULT 0 COMMENT '攻击力加成',
    `defense` INT DEFAULT 0 COMMENT '防御力加成',
    `price` INT DEFAULT 0 COMMENT '价格',
    `sell_price` INT DEFAULT 0 COMMENT '出售价格',
    `usable` TINYINT DEFAULT 0 COMMENT '是否可使用',
    `equippable` TINYINT DEFAULT 0 COMMENT '是否可装备',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_item_id` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 技能配置表
DROP TABLE IF EXISTS `skill_config`;
CREATE TABLE `skill_config` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '配置ID',
    `skill_id` VARCHAR(32) NOT NULL COMMENT '技能ID',
    `skill_name` VARCHAR(64) NOT NULL COMMENT '技能名称',
    `character_type` VARCHAR(32) NOT NULL COMMENT '所属角色',
    `skill_type` VARCHAR(32) NOT NULL COMMENT '技能类型',
    `learn_level` INT NOT NULL COMMENT '学习等级',
    `mp_cost` INT NOT NULL COMMENT 'MP消耗',
    `base_damage` INT DEFAULT 0 COMMENT '基础伤害',
    `level_scale` INT DEFAULT 0 COMMENT '等级倍率',
    `target_type` VARCHAR(32) NOT NULL COMMENT '目标类型',
    `description` VARCHAR(255) DEFAULT NULL COMMENT '技能描述',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_skill_id` (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入基础物品配置
INSERT INTO `item_config` (`item_id`, `item_name`, `item_type`, `description`, `price`, `sell_price`, `usable`, `equippable`) VALUES
('herb', '药草', 'CONSUMABLE', '恢复少量HP', 10, 5, 1, 0),
('niu_huang_wan', '牛黄丸', 'CONSUMABLE', '恢复中量HP', 50, 25, 1, 0),
('liu_shen_wan', '六神丸', 'CONSUMABLE', '恢复大量HP', 200, 100, 1, 0);

-- 插入基础技能配置 (小龙女)
INSERT INTO `skill_config` (`skill_id`, `skill_name`, `character_type`, `skill_type`, `learn_level`, `mp_cost`, `base_damage`, `level_scale`, `target_type`, `description`) VALUES
('ti_shen_shu', '提神术', 'XIAO_LONG_NV', 'HEAL', 12, 3, 17, 3, 'SINGLE', '单体治疗'),
('jie_du_shu', '解毒术', 'XIAO_LONG_NV', 'UTILITY', 12, 3, 0, 0, 'SINGLE', '解除中毒'),
('she_hun_shu', '摄魂术', 'XIAO_LONG_NV', 'DAMAGE', 43, 40, 680, 20, 'ALL_ENEMIES', '全体伤害');

SELECT '数据库初始化完成!' AS message;
