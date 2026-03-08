-- =============================================
-- FC封神榜 - 敌人配置表
-- =============================================

USE `fengshen`;

CREATE TABLE IF NOT EXISTS `enemy_config` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '配置ID',
    `enemy_id` VARCHAR(32) NOT NULL COMMENT '敌人ID',
    `enemy_name` VARCHAR(64) NOT NULL COMMENT '敌人名称',
    `enemy_type` VARCHAR(32) NOT NULL COMMENT '敌人类型: NORMAL, BOSS',
    `hp` INT NOT NULL COMMENT 'HP',
    `mp` INT DEFAULT 0 COMMENT 'MP',
    `attack` INT NOT NULL COMMENT '攻击力',
    `defense` INT NOT NULL COMMENT '防御力',
    `agility` INT NOT NULL COMMENT '敏捷',
    `exp_reward` INT NOT NULL COMMENT '经验奖励',
    `gold_reward` INT NOT NULL COMMENT '金币奖励',
    `drops` JSON DEFAULT NULL COMMENT '掉落物品',
    `skills` JSON DEFAULT NULL COMMENT '技能列表',
    `description` VARCHAR(255) DEFAULT NULL COMMENT '描述',
    `chapter` INT DEFAULT 1 COMMENT '出现章节',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_enemy_id` (`enemy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `location_config` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '配置ID',
    `location_id` VARCHAR(32) NOT NULL COMMENT '地点ID',
    `location_name` VARCHAR(64) NOT NULL COMMENT '地点名称',
    `chapter` INT NOT NULL COMMENT '所属章节',
    `description` VARCHAR(255) DEFAULT NULL COMMENT '描述',
    `connections` JSON DEFAULT NULL COMMENT '连接地点',
    `npcs` JSON DEFAULT NULL COMMENT 'NPC列表',
    `shops` JSON DEFAULT NULL COMMENT '商店列表',
    `enemy_group` VARCHAR(32) DEFAULT NULL COMMENT '敌人组',
    `is_dungeon` TINYINT DEFAULT 0 COMMENT '是否副本',
    `is_town` TINYINT DEFAULT 0 COMMENT '是否城镇',
    `required_level` INT DEFAULT 1 COMMENT '所需等级',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_location_id` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `enemy_config` (`enemy_id`, `enemy_name`, `enemy_type`, `hp`, `mp`, `attack`, `defense`, `agility`, `exp_reward`, `gold_reward`, `drops`, `skills`, `description`, `chapter`) VALUES
('xiao_yao', '小妖', 'NORMAL', 30, 0, 8, 3, 5, 15, 8, '[{"itemId":"herb","chance":0.3,"quantity":[1,1]}]', '[]', '山林中的低等妖怪，攻击力较弱', 1),
('ye_lang', '野狼', 'NORMAL', 40, 0, 12, 4, 8, 25, 12, '[{"itemId":"herb","chance":0.2,"quantity":[1,2]}]', '[]', '荒野中的凶猛狼群', 1),
('shan_zei', '山贼', 'NORMAL', 55, 10, 14, 6, 6, 35, 25, '[{"itemId":"herb","chance":0.3,"quantity":[1,2]},{"itemId":"niu_huang_wan","chance":0.1,"quantity":[1,1]}]', '["qiang_ji"]', '占据山头的强盗', 2),
('hu_li_jing', '狐狸精', 'NORMAL', 45, 30, 10, 3, 12, 40, 30, '[{"itemId":"niu_huang_wan","chance":0.2,"quantity":[1,1]}]', '["huo_qiu","mi_huo"]', '善于使用法术迷惑敌人', 2),
('shu_yao', '鼠妖', 'NORMAL', 35, 15, 9, 2, 15, 20, 15, '[{"itemId":"herb","chance":0.25,"quantity":[1,2]}]', '["tou_xi"]', '行动敏捷，善于偷袭', 2),
('she_yao', '蛇妖', 'NORMAL', 60, 20, 16, 5, 10, 50, 35, '[{"itemId":"niu_huang_wan","chance":0.2,"quantity":[1,1]}]', '["du_yao","chan_rao"]', '口中喷吐毒雾', 3),
('hou_jing', '猴精', 'NORMAL', 50, 25, 13, 4, 18, 45, 28, '[{"itemId":"herb","chance":0.3,"quantity":[1,3]}]', '["lian_ji","shan_bi"]', '身手矫健的猴妖', 3),
('zhu_yao', '猪妖', 'NORMAL', 80, 0, 18, 8, 4, 55, 40, '[{"itemId":"niu_huang_wan","chance":0.15,"quantity":[1,1]}]', '["zhuang_ji"]', '皮糙肉厚的野猪妖', 4),
('niu_mo', '牛魔', 'NORMAL', 100, 30, 22, 10, 5, 80, 60, '[{"itemId":"liu_shen_wan","chance":0.1,"quantity":[1,1]},{"itemId":"niu_huang_wan","chance":0.25,"quantity":[1,2]}]', '["di_zhen","meng_ji"]', '力大无穷的牛头魔', 4),
('li_yu_jing', '鲤鱼精', 'NORMAL', 45, 35, 11, 4, 8, 42, 32, '[{"itemId":"niu_huang_wan","chance":0.15,"quantity":[1,1]}]', '["shui_jian","bing_dong"]', '水中修炼成精的鲤鱼', 1),
('ao_bing', '敖丙', 'BOSS', 200, 80, 25, 10, 12, 150, 100, '[{"itemId":"liu_shen_wan","chance":1,"quantity":[1,2]}]', '["long_tun","shui_jian","bing_dong"]', '东海龙王三太子', 1),
('shi_jing_niang', '石矶娘娘', 'BOSS', 500, 100, 35, 15, 12, 300, 200, '[{"itemId":"liu_shen_wan","chance":1,"quantity":[2,3]}]', '["shi_hua","yan_mo","di_ci"]', '骷髅山白骨洞的妖王', 3),
('shen_gong_bao', '申公豹', 'BOSS', 600, 150, 30, 12, 15, 400, 300, '[{"itemId":"liu_shen_wan","chance":1,"quantity":[3,5]}]', '["lei_ji","feng_bao","huan_ying"]', '阐教叛徒，擅长各种法术', 5),
('tong_tian_jiao_zhu', '通天教主', 'BOSS', 2000, 500, 60, 25, 20, 1000, 1000, '[{"itemId":"liu_shen_wan","chance":1,"quantity":[5,10]}]', '["zhu_xian_jian","wan_jian_gui_zong","tian_jiang_jie_nan"]', '截教教主，最终BOSS', 10);

INSERT INTO `location_config` (`location_id`, `location_name`, `chapter`, `description`, `connections`, `npcs`, `shops`, `enemy_group`, `is_dungeon`, `is_town`, `required_level`) VALUES
('chen_tang_guan', '陈塘关', 1, '东海之滨的重镇，哪吒的故乡', '["chen_tang_wai","li_jing_fu"]', '[{"id":"old_man","name":"老者"},{"id":"merchant","name":"商人"}]', '[{"id":"item_shop","name":"杂货铺","items":["herb","niu_huang_wan"]}]', NULL, 0, 1, 1),
('li_jing_fu', '李靖府', 1, '陈塘关总兵李靖的府邸', '["chen_tang_guan"]', '[{"id":"li_jing","name":"李靖"},{"id":"yin_shi","name":"殷氏"}]', '[]', NULL, 0, 0, 1),
('chen_tang_wai', '陈塘关外', 1, '陈塘关外的荒野，偶有小妖出没', '["chen_tang_guan","dong_hai_bian"]', '[]', '[]', 'chen_tang_wan_wild', 0, 0, 1),
('dong_hai_bian', '东海边', 1, '浩瀚的东海之滨，波涛汹涌', '["chen_tang_wai","dong_hai_long_gong"]', '[{"id":"fisherman","name":"渔夫"}]', '[]', 'dong_hai', 0, 0, 3),
('dong_hai_long_gong', '东海龙宫', 1, '深海之中的龙族宫殿', '["dong_hai_bian"]', '[{"id":"long_wang","name":"东海龙王"}]', '[]', 'dong_hai', 1, 0, 5),
('qian_li_yan', '千里眼山林', 2, '传说中千里眼修炼的山林', '["chen_tang_wai","shun_feng_er_feng"]', '[]', '[]', 'qian_li_yan', 0, 0, 5),
('shun_feng_er_feng', '顺风耳峰', 2, '高耸入云的山峰', '["qian_li_yan"]', '[{"id":"shun_feng_er","name":"顺风耳"}]', '[]', 'qian_li_yan', 0, 0, 8),
('ku_lou_shan', '骷髅山', 3, '阴森恐怖的山脉，白骨遍地', '["bai_gu_dong","wu_yi_shan"]', '[]', '[]', 'ku_lou_shan', 1, 0, 10),
('bai_gu_dong', '白骨洞', 3, '石矶娘娘的洞府', '["ku_lou_shan"]', '[{"id":"shi_jing_niang","name":"石矶娘娘"}]', '[]', 'ku_lou_shan', 1, 0, 12),
('wu_yi_shan', '五夷山', 4, '风景秀丽的仙山', '["ku_lou_shan","fei_lian_dong"]', '[{"id":"hermit","name":"隐士"}]', '[{"id":"weapon_shop","name":"兵器铺"}]', 'wu_yi_shan', 0, 0, 15),
('fei_lian_dong', '飞廉洞', 4, '风神飞廉的居所', '["wu_yi_shan"]', '[]', '[]', 'wu_yi_shan', 1, 0, 18);

SELECT '游戏配置数据初始化完成!' AS message;
