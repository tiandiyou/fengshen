package com.fengshen.game.controller;

import com.fengshen.common.domain.R;
import com.fengshen.game.entity.CharacterData;
import com.fengshen.game.entity.GameSave;
import com.fengshen.game.service.GameSaveService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/save")
public class SaveController {

    private final GameSaveService gameSaveService;

    public SaveController(GameSaveService gameSaveService) {
        this.gameSaveService = gameSaveService;
    }

    @GetMapping("/list")
    public R<List<GameSave>> getSaveList(@RequestAttribute("userId") Long userId) {
        List<GameSave> saves = gameSaveService.getSaveListByUserId(userId);
        return R.ok(saves);
    }

    @GetMapping("/{id}")
    public R<Map<String, Object>> getSaveDetail(@PathVariable("id") Long id, @RequestAttribute("userId") Long userId) {
        GameSave save = gameSaveService.getSaveById(id, userId);
        if (save == null) {
            return R.error("存档不存在");
        }
        List<CharacterData> characters = gameSaveService.getCharactersBySaveId(id);
        
        Map<String, Object> result = new HashMap<>();
        result.put("save", save);
        result.put("characters", characters);
        return R.ok(result);
    }

    @PostMapping
    public R<GameSave> createSave(@RequestAttribute("userId") Long userId, @RequestBody CreateSaveRequest request) {
        GameSave save = gameSaveService.createSave(userId, request.getSaveName());
        return R.ok(save);
    }

    @PutMapping("/{id}")
    public R<GameSave> updateSave(@PathVariable("id") Long id, @RequestAttribute("userId") Long userId,
                                  @RequestBody UpdateSaveRequest request) {
        try {
            GameSave save = gameSaveService.updateSave(id, userId, request.getChapter(),
                    request.getLocation(), request.getGold(), request.getPlayTime());
            return R.ok(save);
        } catch (RuntimeException e) {
            return R.error(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public R<Void> deleteSave(@PathVariable("id") Long id, @RequestAttribute("userId") Long userId) {
        try {
            gameSaveService.deleteSave(id, userId);
            return R.ok(null);
        } catch (RuntimeException e) {
            return R.error(e.getMessage());
        }
    }

    public static class CreateSaveRequest {
        private String saveName;

        public String getSaveName() {
            return saveName;
        }

        public void setSaveName(String saveName) {
            this.saveName = saveName;
        }
    }

    public static class UpdateSaveRequest {
        private Integer chapter;
        private String location;
        private Integer gold;
        private Integer playTime;

        public Integer getChapter() {
            return chapter;
        }

        public void setChapter(Integer chapter) {
            this.chapter = chapter;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public Integer getGold() {
            return gold;
        }

        public void setGold(Integer gold) {
            this.gold = gold;
        }

        public Integer getPlayTime() {
            return playTime;
        }

        public void setPlayTime(Integer playTime) {
            this.playTime = playTime;
        }
    }
}
