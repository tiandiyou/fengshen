USE `fengshen`;

INSERT INTO `item_config` (`item_id`, `item_name`, `item_type`, `description`, `attack`, `defense`, `price`, `sell_price`, `usable`, `equippable`) VALUES
('tong_jian', '铜剑', 'WEAPON', '普通的铜制长剑', 5, 0, 100, 50, 0, 1),
('tie_jian', '铁剑', 'WEAPON', '锋利的铁制长剑', 10, 0, 300, 150, 0, 1),
('gang_jian', '钢剑', 'WEAPON', '精钢打造的长剑', 18, 0, 800, 400, 0, 1),
('hun_tian_ling', '混天绫', 'WEAPON', '哪吒的宝物，可变化无穷', 25, 5, 0, 0, 0, 1),
('feng_huo_lun', '风火轮', 'WEAPON', '脚踏风火，速度极快', 30, 0, 0, 0, 0, 1),
('bu_yi', '布衣', 'ARMOR', '普通的布制衣服', 0, 3, 50, 25, 0, 1),
('pi_jia', '皮甲', 'ARMOR', '兽皮制成的护甲', 0, 6, 150, 75, 0, 1),
('tie_jia', '铁甲', 'ARMOR', '铁制护甲，防御坚固', 0, 12, 400, 200, 0, 1),
('jie_du_cao', '解毒草', 'CONSUMABLE', '解除中毒状态', 0, 0, 30, 15, 1, 0),
('huan_hun_dan', '还魂丹', 'CONSUMABLE', '复活倒下的队友', 0, 0, 500, 250, 1, 0);

INSERT INTO `skill_config` (`skill_id`, `skill_name`, `character_type`, `skill_type`, `learn_level`, `mp_cost`, `base_damage`, `level_scale`, `target_type`, `description`) VALUES
('huo_jian', '火箭', 'NE_ZHA', 'DAMAGE', 1, 5, 30, 5, 'SINGLE', '发射火箭攻击敌人'),
('san_tou_liu_bi', '三头六臂', 'NE_ZHA', 'BUFF', 10, 15, 0, 0, 'SELF', '变身三头六臂，攻击力提升'),
('qian_kun_quan', '乾坤圈', 'NE_ZHA', 'DAMAGE', 15, 20, 100, 15, 'ALL_ENEMIES', '投掷乾坤圈攻击全体敌人'),
('qiang_ji', '强击', 'ENEMY', 'DAMAGE', 1, 0, 15, 2, 'SINGLE', '强力一击'),
('huo_qiu', '火球', 'ENEMY', 'DAMAGE', 1, 5, 25, 3, 'SINGLE', '发射火球'),
('mi_huo', '迷惑', 'ENEMY', 'DEBUFF', 1, 8, 0, 0, 'SINGLE', '使敌人迷惑'),
('tou_xi', '偷袭', 'ENEMY', 'DAMAGE', 1, 0, 20, 2, 'SINGLE', '偷袭敌人'),
('du_yao', '毒药', 'ENEMY', 'DOT', 1, 6, 10, 1, 'SINGLE', '使敌人中毒'),
('chan_rao', '缠绕', 'ENEMY', 'DEBUFF', 1, 5, 0, 0, 'SINGLE', '缠绕敌人'),
('lian_ji', '连击', 'ENEMY', 'DAMAGE', 1, 0, 12, 1, 'SINGLE', '连续攻击两次'),
('shan_bi', '闪避', 'ENEMY', 'BUFF', 1, 0, 0, 0, 'SELF', '提升闪避'),
('zhuang_ji', '撞击', 'ENEMY', 'DAMAGE', 1, 0, 25, 3, 'SINGLE', '强力撞击'),
('di_zhen', '地震', 'ENEMY', 'DAMAGE', 1, 15, 40, 5, 'ALL_ENEMIES', '引发地震'),
('meng_ji', '猛击', 'ENEMY', 'DAMAGE', 1, 8, 35, 4, 'SINGLE', '猛烈一击'),
('shui_jian', '水箭', 'ENEMY', 'DAMAGE', 1, 5, 25, 3, 'SINGLE', '发射水箭'),
('bing_dong', '冰冻', 'ENEMY', 'DEBUFF', 1, 10, 0, 0, 'SINGLE', '冰冻敌人'),
('long_tun', '龙吞', 'BOSS', 'DAMAGE', 1, 20, 80, 10, 'SINGLE', '龙息攻击'),
('shi_hua', '石化', 'BOSS', 'DEBUFF', 1, 15, 0, 0, 'SINGLE', '将敌人石化'),
('yan_mo', '妖魔', 'BOSS', 'DAMAGE', 1, 25, 60, 8, 'ALL_ENEMIES', '召唤妖魔攻击'),
('di_ci', '地刺', 'BOSS', 'DAMAGE', 1, 18, 50, 6, 'ALL_ENEMIES', '地面刺出尖刺'),
('lei_ji', '雷击', 'BOSS', 'DAMAGE', 1, 20, 70, 9, 'SINGLE', '召唤雷电'),
('feng_bao', '风暴', 'BOSS', 'DAMAGE', 1, 30, 50, 6, 'ALL_ENEMIES', '召唤风暴'),
('huan_ying', '幻影', 'BOSS', 'BUFF', 1, 15, 0, 0, 'SELF', '制造幻影分身'),
('zhu_xian_jian', '诛仙剑', 'BOSS', 'DAMAGE', 1, 50, 150, 20, 'ALL_ENEMIES', '上古神剑，威力无穷'),
('wan_jian_gui_zong', '万剑归宗', 'BOSS', 'DAMAGE', 1, 80, 200, 25, 'ALL_ENEMIES', '万剑齐发'),
('tian_jiang_jie_nan', '天降劫难', 'BOSS', 'DAMAGE', 1, 100, 300, 30, 'ALL_ENEMIES', '天劫降临');

SELECT '物品和技能配置扩展完成!' AS message;
