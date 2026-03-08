-- =============================================
-- FC封神榜 - 数据库初始化脚本
-- 版本: 1.0.0
-- 创建时间: 2026-03-08
-- =============================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS `fengshen`
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE `fengshen`;

-- =============================================
-- 1. 用户表
-- =============================================
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
    UNIQUE KEY `uk_openid` (`openid`),
    KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- =============================================
-- 2. 游戏存档表
-- =============================================
DROP TABLE IF EXISTS `game_save`;

CREATE TABLE `game_save` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '存档ID',
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `save_name` VARCHAR(32) DEFAULT '存档1' COMMENT '存档名称',
    `current_chapter` INT DEFAULT 1 COMMENT '当前章节',
    `current_location` VARCHAR(64) DEFAULT '陈塘关' COMMENT '当前位置',
    `gold` INT DEFAULT 0 COMMENT '金币',
    `play_time` INT DEFAULT 0 COMMENT '游戏时长(秒)',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_updated_at` (`updated_at`),
    CONSTRAINT `fk_save_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='游戏存档表';

-- =============================================
-- 3. 角色数据表
-- =============================================
DROP TABLE IF EXISTS `character_data`;

CREATE TABLE `character_data` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '角色数据ID',
    `save_id` BIGINT NOT NULL COMMENT '存档ID',
    `character_type` VARCHAR(32) NOT NULL COMMENT '角色类型: NEZHA, XIAO_LONG_NV, YANG_JIAN, JIANG_ZI_YA',
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
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_save_id` (`save_id`),
    KEY `idx_character_type` (`character_type`),
    CONSTRAINT `fk_character_save` FOREIGN KEY (`save_id`) REFERENCES `game_save` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色数据表';

-- =============================================
-- 4. 背包表
-- =============================================
DROP TABLE IF EXISTS `inventory`;

CREATE TABLE `inventory` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '背包ID',
    `save_id` BIGINT NOT NULL COMMENT '存档ID',
    `item_id` VARCHAR(32) NOT NULL COMMENT '物品ID',
    `item_type` VARCHAR(32) NOT NULL COMMENT '物品类型: WEAPON, ARMOR, ACCESSORY, CONSUMABLE, KEY_ITEM',
    `quantity` INT DEFAULT 1 COMMENT '数量',
    `equipped` TINYINT DEFAULT 0 COMMENT '是否装备: 0-否, 1-是',
    `equipped_character` VARCHAR(32) DEFAULT NULL COMMENT '装备角色',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_save_id` (`save_id`),
    KEY `idx_item_id` (`item_id`),
    KEY `idx_item_type` (`item_type`),
    CONSTRAINT `fk_inventory_save` FOREIGN KEY (`save_id`) REFERENCES `game_save` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='背包表';

-- =============================================
-- 5. 物品配置表
-- =============================================
DROP TABLE IF EXISTS `item_config`;

CREATE TABLE `item_config` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '配置ID',
    `item_id` VARCHAR(32) NOT NULL COMMENT '物品ID',
    `item_name` VARCHAR(64) NOT NULL COMMENT '物品名称',
    `item_type` VARCHAR(32) NOT NULL COMMENT '物品类型',
    `description` VARCHAR(255) DEFAULT NULL COMMENT '物品描述',
    `attack` INT DEFAULT 0 COMMENT '攻击力加成',
    `defense` INT DEFAULT 0 COMMENT '防御力加成',
    `agility` INT DEFAULT 0 COMMENT '敏捷加成',
    `hp_bonus` INT DEFAULT 0 COMMENT 'HP加成',
    `mp_bonus` INT DEFAULT 0 COMMENT 'MP加成',
    `effect_type` VARCHAR(32) DEFAULT NULL COMMENT '特效类型',
    `effect_value` INT DEFAULT 0 COMMENT '特效数值',
    `price` INT DEFAULT 0 COMMENT '价格',
    `sell_price` INT DEFAULT 0 COMMENT '出售价格',
    `usable` TINYINT DEFAULT 0 COMMENT '是否可使用: 0-否, 1-是',
    `equippable` TINYINT DEFAULT 0 COMMENT '是否可装备: 0-否, 1-是',
    `character_restriction` JSON DEFAULT NULL COMMENT '角色限制',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_item_id` (`item_id`),
    KEY `idx_item_type` (`item_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='物品配置表';

-- =============================================
-- 6. 技能配置表
-- =============================================
DROP TABLE IF EXISTS `skill_config`;

CREATE TABLE `skill_config` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '配置ID',
    `skill_id` VARCHAR(32) NOT NULL COMMENT '技能ID',
    `skill_name` VARCHAR(64) NOT NULL COMMENT '技能名称',
    `character_type` VARCHAR(32) NOT NULL COMMENT '所属角色',
    `skill_type` VARCHAR(32) NOT NULL COMMENT '技能类型: HEAL, DAMAGE, BUFF, DEBUFF, UTILITY',
    `learn_level` INT NOT NULL COMMENT '学习等级',
    `mp_cost` INT NOT NULL COMMENT 'MP消耗',
    `base_damage` INT DEFAULT 0 COMMENT '基础伤害',
    `level_scale` INT DEFAULT 0 COMMENT '等级倍率',
    `target_type` VARCHAR(32) NOT NULL COMMENT '目标类型: SINGLE, ALL_ENEMIES, ALL_ALLIES, SELF',
    `effect_type` VARCHAR(32) DEFAULT NULL COMMENT '附加效果',
    `effect_duration` INT DEFAULT 0 COMMENT '效果持续回合',
    `description` VARCHAR(255) DEFAULT NULL COMMENT '技能描述',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_skill_id` (`skill_id`),
    KEY `idx_character_type` (`character_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='技能配置表';

-- =============================================
-- 7. 插入初始配置数据
-- =============================================

-- 插入角色初始属性配置
INSERT INTO `character_data` (`save_id`, `character_type`, `level`, `exp`, `hp`, `mp`, `max_hp`, `max_mp`, `attack`, `defense`, `agility`, `stamina`)
VALUES
(1, 'NEZHA', 1, 0, 100, 0, 100, 0, 15, 10, 12, 8),
(1, 'XIAO_LONG_NV', 1, 0, 80, 50, 80, 50, 10, 8, 15, 6);

-- 插入初始物品配置
INSERT INTO `item_config` (`item_id`, `item_name`, `item_type`, `description`, `attack`, `defense`, `agility`, `hp_bonus`, `mp_bonus`, `effect_type`, `effect_value`, `price`, `sell_price`, `usable`, `equippable`, `character_restriction`)
VALUES
('herb', '药草', 'CONSUMABLE', '恢复少量HP', 0, 0, 0, 0, 0, 'HEAL_HP', 30, 10, 5, 1, 0, NULL),
('niu_huang_wan', '牛黄丸', 'CONSUMABLE', '恢复中量HP', 0, 0, 0, 0, 0, 'HEAL_HP', 100, 50, 25, 1, 0, NULL),
('liu_shen_wan', '六神丸', 'CONSUMABLE', '恢复大量HP', 0, 0, 0, 0, 0, 'HEAL_HP', 300, 200, 100, 1, 0, NULL),
('hun_dan', '还魂丹', 'CONSUMABLE', '复活队友', 0, 0, 0, 0, 0, 'REVIVE', 50, 500, 250, 1, 0, NULL),
('long_sword', '长剑', 'WEAPON', '基础长剑', 10, 0, 0, 0, 0, NULL, 0, 100, 50, 0, 1, '["NEZHA"]'),
('fish_bone_sword', '鱼骨剑', 'WEAPON', '东海特产', 15, 0, 0, 0, 0, NULL, 0, 200, 100, 0, 1, '["NEZHA"]'),
('cloth_armor', '布衣', 'ARMOR', '基础防具', 0, 5, 0, 0, 0, NULL, 0, 80, 40, 0, 1, NULL),
('fish_leather', '鱼皮衣', 'ARMOR', '东海特产', 0, 10, 0, 0, 0, NULL, 0, 150, 75, 0, 1, NULL);

-- 插入技能配置 (小龙女)
INSERT INTO `skill_config` (`skill_id`, `skill_name`, `character_type`, `skill_type`, `learn_level`, `mp_cost`, `base_damage`, `level_scale`, `target_type`, `effect_type`, `effect_duration`, `description`)
VALUES
('ti_shen_shu', '提神术', 'XIAO_LONG_NV', 'HEAL', 12, 3, 17, 3, 'SINGLE', 'HEAL_HP', 0, '单体治疗'),
('jie_du_shu', '解毒术', 'XIAO_LONG_NV', 'UTILITY', 12, 3, 0, 0, 'SINGLE', 'CURE_POISON', 0, '解除中毒'),
('huan_yuan_shu', '还原术', 'XIAO_LONG_NV', 'UTILITY', 15, 4, 0, 0, 'SINGLE', 'CURE_CONFUSION', 0, '解除混乱'),
('rao_hun_shu', '扰魂术', 'XIAO_LONG_NV', 'DAMAGE', 20, 6, 114, 6, 'SINGLE', NULL, 0, '单体伤害'),
('yang_shen_shu', '养神术', 'XIAO_LONG_NV', 'HEAL', 25, 12, 290, 10, 'SINGLE', 'HEAL_HP', 0, '中等治疗'),
('qu_yao_shu', '驱妖术', 'XIAO_LONG_NV', 'UTILITY', 30, 10, 0, 0, 'SELF', 'PREVENT_ENCOUNTER', 1, '当前地图不遇敌'),
('rong_shi_shu', '溶石术', 'XIAO_LONG_NV', 'UTILITY', 35, 20, 0, 0, 'SINGLE', 'CURE_STONE', 0, '解除石化'),
('she_hun_shu', '摄魂术', 'XIAO_LONG_NV', 'DAMAGE', 43, 40, 680, 20, 'ALL_ENEMIES', NULL, 0, '全体伤害'),
('hui_shen_shu', '回神术', 'XIAO_LONG_NV', 'HEAL', 50, 50, 1970, 30, 'SINGLE', 'HEAL_HP', 0, '强力治疗'),
('fu_huo_shu', '复活术', 'XIAO_LONG_NV', 'UTILITY', 57, 80, 0, 0, 'SINGLE', 'REVIVE', 0, '复活队友');

-- 插入技能配置 (杨戬)
INSERT INTO `skill_config` (`skill_id`, `skill_name`, `character_type`, `skill_type`, `learn_level`, `mp_cost`, `base_damage`, `level_scale`, `target_type`, `effect_type`, `effect_duration`, `description`)
VALUES
('huan_zhuo_ji', '幻啄鸡', 'YANG_JIAN', 'DAMAGE', 24, 4, 196, 4, 'SINGLE', NULL, 0, '单体伤害'),
('ying_xiang_shu', '映像术', 'YANG_JIAN', 'UTILITY', 24, 6, 0, 0, 'SELF', 'SHOW_MAP', 0, '显示地图'),
('huan_du_gong', '幻毒蚣', 'YANG_JIAN', 'DAMAGE', 25, 8, 392, 8, 'SINGLE', NULL, 0, '单体伤害'),
('tiao_yue_shu', '跳跃术', 'YANG_JIAN', 'UTILITY', 30, 10, 0, 0, 'SELF', 'ESCAPE', 0, '逃离室内'),
('huan_lei_gong', '幻雷公', 'YANG_JIAN', 'DAMAGE', 35, 20, 592, 8, 'ALL_ENEMIES', NULL, 0, '全体伤害'),
('huan_shi_jiang', '幻石匠', 'YANG_JIAN', 'DEBUFF', 41, 25, 0, 0, 'SINGLE', 'STONE', 0, '石化敌人'),
('huan_di_niu', '幻地牛', 'YANG_JIAN', 'DAMAGE', 47, 35, 376, 24, 'ALL_ENEMIES', NULL, 0, '全体伤害'),
('huan_huo_long', '幻火龙', 'YANG_JIAN', 'DAMAGE', 54, 50, 1242, 28, 'ALL_ENEMIES', NULL, 0, '全体伤害');

-- 插入技能配置 (姜子牙)
INSERT INTO `skill_config` (`skill_id`, `skill_name`, `character_type`, `skill_type`, `learn_level`, `mp_cost`, `base_damage`, `level_scale`, `target_type`, `effect_type`, `effect_duration`, `description`)
VALUES
('hun_shui_shu', '昏睡术', 'JIANG_ZI_YA', 'DEBUFF', 38, 4, 0, 0, 'SINGLE', 'SLEEP', 1, '使敌人睡眠'),
('ling_ying_shu', '凌鹰术', 'JIANG_ZI_YA', 'UTILITY', 38, 6, 0, 0, 'SELF', 'TELEPORT', 0, '快速传送'),
('tian_gang_shu', '天罡术', 'JIANG_ZI_YA', 'BUFF', 38, 5, 0, 0, 'SINGLE', 'BUFF_ATK_DEF', 1, '提升攻防'),
('feng_mo_shu', '封魔术', 'JIANG_ZI_YA', 'DEBUFF', 38, 8, 0, 0, 'SINGLE', 'SILENCE', 1, '禁止法术'),
('ji_bing_shu', '疾兵术', 'JIANG_ZI_YA', 'BUFF', 38, 5, 0, 0, 'SINGLE', 'BUFF_ATK_DEF', 1, '提升攻防');

-- =============================================
-- 完成
-- =============================================
SELECT '数据库初始化完成!' AS message;
