package com.fengshen.game.controller;

import com.fengshen.common.domain.R;
import com.fengshen.game.entity.CharacterData;
import com.fengshen.game.service.CharacterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/character")
public class CharacterController {

    private final CharacterService characterService;

    public CharacterController(CharacterService characterService) {
        this.characterService = characterService;
    }

    @GetMapping
    public R<List<CharacterData>> getCharacters(@RequestParam("saveId") Long saveId) {
        List<CharacterData> characters = characterService.getCharactersBySaveId(saveId);
        return R.ok(characters);
    }

    @GetMapping("/{id}")
    public R<CharacterData> getCharacter(@PathVariable("id") Long id) {
        CharacterData character = characterService.getCharacter(id, null);
        if (character == null) {
            return R.error("角色不存在");
        }
        return R.ok(character);
    }

    @PutMapping("/{id}")
    public R<CharacterData> updateCharacter(@PathVariable("id") Long id, @RequestBody UpdateCharacterRequest request) {
        try {
            CharacterData character = characterService.updateCharacter(id, request.getLevel(),
                    request.getExp(), request.getHp(), request.getMp(),
                    request.getAttack(), request.getDefense(), request.getAgility(), request.getStamina());
            return R.ok(character);
        } catch (RuntimeException e) {
            return R.error(e.getMessage());
        }
    }

    @PostMapping("/{id}/level-up")
    public R<CharacterData> levelUp(@PathVariable("id") Long id) {
        try {
            CharacterData character = characterService.levelUp(id);
            return R.ok(character);
        } catch (RuntimeException e) {
            return R.error(e.getMessage());
        }
    }

    @PutMapping("/{id}/equipment")
    public R<CharacterData> updateEquipment(@PathVariable("id") Long id, @RequestBody UpdateEquipmentRequest request) {
        try {
            CharacterData character = characterService.updateEquipment(id, request.getEquipment());
            return R.ok(character);
        } catch (RuntimeException e) {
            return R.error(e.getMessage());
        }
    }

    @PutMapping("/{id}/skills")
    public R<CharacterData> updateSkills(@PathVariable("id") Long id, @RequestBody UpdateSkillsRequest request) {
        try {
            CharacterData character = characterService.updateSkills(id, request.getSkills());
            return R.ok(character);
        } catch (RuntimeException e) {
            return R.error(e.getMessage());
        }
    }

    public static class UpdateCharacterRequest {
        private Integer level;
        private Integer exp;
        private Integer hp;
        private Integer mp;
        private Integer attack;
        private Integer defense;
        private Integer agility;
        private Integer stamina;

        public Integer getLevel() { return level; }
        public void setLevel(Integer level) { this.level = level; }
        public Integer getExp() { return exp; }
        public void setExp(Integer exp) { this.exp = exp; }
        public Integer getHp() { return hp; }
        public void setHp(Integer hp) { this.hp = hp; }
        public Integer getMp() { return mp; }
        public void setMp(Integer mp) { this.mp = mp; }
        public Integer getAttack() { return attack; }
        public void setAttack(Integer attack) { this.attack = attack; }
        public Integer getDefense() { return defense; }
        public void setDefense(Integer defense) { this.defense = defense; }
        public Integer getAgility() { return agility; }
        public void setAgility(Integer agility) { this.agility = agility; }
        public Integer getStamina() { return stamina; }
        public void setStamina(Integer stamina) { this.stamina = stamina; }
    }

    public static class UpdateEquipmentRequest {
        private String equipment;

        public String getEquipment() { return equipment; }
        public void setEquipment(String equipment) { this.equipment = equipment; }
    }

    public static class UpdateSkillsRequest {
        private String skills;

        public String getSkills() { return skills; }
        public void setSkills(String skills) { this.skills = skills; }
    }
}
