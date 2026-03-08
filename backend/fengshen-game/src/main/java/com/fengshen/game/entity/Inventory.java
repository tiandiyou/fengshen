package com.fengshen.game.entity;

import com.baomidou.mybatisplus.annotation.*;
import java.time.LocalDateTime;

/**
 * 背包物品实体
 */
public class Inventory {

    @TableId(type = IdType.AUTO)
    private Long id;

    @TableField("save_id")
    private Long saveId;

    @TableField("item_id")
    private String itemId;

    @TableField("item_type")
    private String itemType;

    private Integer quantity;

    private Integer equipped;

    @TableField("equipped_character")
    private String equippedCharacter;

    @TableField(value = "created_at", fill = FieldFill.INSERT)
    private LocalDateTime createdAt;

    @TableField(value = "updated_at", fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSaveId() {
        return saveId;
    }

    public void setSaveId(Long saveId) {
        this.saveId = saveId;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getEquipped() {
        return equipped;
    }

    public void setEquipped(Integer equipped) {
        this.equipped = equipped;
    }

    public String getEquippedCharacter() {
        return equippedCharacter;
    }

    public void setEquippedCharacter(String equippedCharacter) {
        this.equippedCharacter = equippedCharacter;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
