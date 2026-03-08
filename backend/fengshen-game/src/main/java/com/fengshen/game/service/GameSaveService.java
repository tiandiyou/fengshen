package com.fengshen.game.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.fengshen.game.entity.CharacterData;
import com.fengshen.game.entity.GameSave;
import com.fengshen.game.mapper.CharacterDataMapper;
import com.fengshen.game.mapper.GameSaveMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GameSaveService {

    private final GameSaveMapper gameSaveMapper;
    private final CharacterDataMapper characterDataMapper;

    public GameSaveService(GameSaveMapper gameSaveMapper, CharacterDataMapper characterDataMapper) {
        this.gameSaveMapper = gameSaveMapper;
        this.characterDataMapper = characterDataMapper;
    }

    public List<GameSave> getSaveListByUserId(Long userId) {
        LambdaQueryWrapper<GameSave> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(GameSave::getUserId, userId).orderByDesc(GameSave::getUpdatedAt);
        return gameSaveMapper.selectList(wrapper);
    }

    public GameSave getSaveById(Long id, Long userId) {
        LambdaQueryWrapper<GameSave> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(GameSave::getId, id).eq(GameSave::getUserId, userId);
        return gameSaveMapper.selectOne(wrapper);
    }

    @Transactional
    public GameSave createSave(Long userId, String saveName) {
        GameSave save = new GameSave();
        save.setUserId(userId);
        save.setSaveName(saveName != null ? saveName : "存档1");
        save.setCurrentChapter(1);
        save.setCurrentLocation("陈塘关");
        save.setGold(0);
        save.setPlayTime(0);
        gameSaveMapper.insert(save);

        CharacterData neZha = createDefaultCharacter(save.getId(), "NE_ZHA", 1);
        characterDataMapper.insert(neZha);

        return save;
    }

    @Transactional
    public GameSave updateSave(Long id, Long userId, Integer chapter, String location, Integer gold, Integer playTime) {
        GameSave save = getSaveById(id, userId);
        if (save == null) {
            throw new RuntimeException("存档不存在");
        }
        if (chapter != null) save.setCurrentChapter(chapter);
        if (location != null) save.setCurrentLocation(location);
        if (gold != null) save.setGold(gold);
        if (playTime != null) save.setPlayTime(playTime);
        gameSaveMapper.updateById(save);
        return save;
    }

    @Transactional
    public void deleteSave(Long id, Long userId) {
        GameSave save = getSaveById(id, userId);
        if (save == null) {
            throw new RuntimeException("存档不存在");
        }
        LambdaQueryWrapper<CharacterData> charWrapper = new LambdaQueryWrapper<>();
        charWrapper.eq(CharacterData::getSaveId, id);
        characterDataMapper.delete(charWrapper);
        gameSaveMapper.deleteById(id);
    }

    public List<CharacterData> getCharactersBySaveId(Long saveId) {
        LambdaQueryWrapper<CharacterData> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(CharacterData::getSaveId, saveId);
        return characterDataMapper.selectList(wrapper);
    }

    private CharacterData createDefaultCharacter(Long saveId, String characterType, int level) {
        CharacterData character = new CharacterData();
        character.setSaveId(saveId);
        character.setCharacterType(characterType);
        character.setLevel(level);
        character.setExp(0);
        
        int baseHp = 100 + level * 20;
        int baseMp = 50 + level * 10;
        character.setHp(baseHp);
        character.setMp(baseMp);
        character.setMaxHp(baseHp);
        character.setMaxMp(baseMp);
        character.setAttack(10 + level * 3);
        character.setDefense(5 + level * 2);
        character.setAgility(10 + level);
        character.setStamina(10 + level);
        character.setEquipment("{}");
        character.setSkills("[]");
        
        return character;
    }
}
