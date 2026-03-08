package com.fengshen.game.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.fengshen.game.entity.CharacterData;
import com.fengshen.game.mapper.CharacterDataMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharacterService {

    private final CharacterDataMapper characterDataMapper;
    private final GameSaveService gameSaveService;

    public CharacterService(CharacterDataMapper characterDataMapper, GameSaveService gameSaveService) {
        this.characterDataMapper = characterDataMapper;
        this.gameSaveService = gameSaveService;
    }

    public CharacterData getCharacter(Long saveId, String characterType) {
        LambdaQueryWrapper<CharacterData> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(CharacterData::getSaveId, saveId)
               .eq(CharacterData::getCharacterType, characterType);
        return characterDataMapper.selectOne(wrapper);
    }

    public List<CharacterData> getCharactersBySaveId(Long saveId) {
        return gameSaveService.getCharactersBySaveId(saveId);
    }

    public CharacterData updateCharacter(Long id, Integer level, Integer exp, Integer hp, Integer mp,
                                         Integer attack, Integer defense, Integer agility, Integer stamina) {
        CharacterData character = characterDataMapper.selectById(id);
        if (character == null) {
            throw new RuntimeException("角色不存在");
        }
        if (level != null) character.setLevel(level);
        if (exp != null) character.setExp(exp);
        if (hp != null) character.setHp(hp);
        if (mp != null) character.setMp(mp);
        if (attack != null) character.setAttack(attack);
        if (defense != null) character.setDefense(defense);
        if (agility != null) character.setAgility(agility);
        if (stamina != null) character.setStamina(stamina);
        characterDataMapper.updateById(character);
        return character;
    }

    public CharacterData updateEquipment(Long id, String equipment) {
        CharacterData character = characterDataMapper.selectById(id);
        if (character == null) {
            throw new RuntimeException("角色不存在");
        }
        character.setEquipment(equipment);
        characterDataMapper.updateById(character);
        return character;
    }

    public CharacterData updateSkills(Long id, String skills) {
        CharacterData character = characterDataMapper.selectById(id);
        if (character == null) {
            throw new RuntimeException("角色不存在");
        }
        character.setSkills(skills);
        characterDataMapper.updateById(character);
        return character;
    }

    public CharacterData levelUp(Long id) {
        CharacterData character = characterDataMapper.selectById(id);
        if (character == null) {
            throw new RuntimeException("角色不存在");
        }
        
        int currentLevel = character.getLevel();
        int expNeeded = getExpNeededForLevel(currentLevel + 1);
        
        if (character.getExp() < expNeeded) {
            throw new RuntimeException("经验值不足");
        }
        
        character.setLevel(currentLevel + 1);
        character.setExp(character.getExp() - expNeeded);
        
        int newMaxHp = character.getMaxHp() + 20;
        int newMaxMp = character.getMaxMp() + 10;
        character.setMaxHp(newMaxHp);
        character.setMaxMp(newMaxMp);
        character.setHp(newMaxHp);
        character.setMp(newMaxMp);
        character.setAttack(character.getAttack() + 3);
        character.setDefense(character.getDefense() + 2);
        character.setAgility(character.getAgility() + 1);
        character.setStamina(character.getStamina() + 1);
        
        characterDataMapper.updateById(character);
        return character;
    }

    private int getExpNeededForLevel(int level) {
        return level * level * 100;
    }
}
