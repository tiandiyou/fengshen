package com.fengshen.common.enums;

import lombok.Getter;

@Getter
public enum CharacterType {
    NEZHA("哪吒"),
    XIAO_LONG_NV("小龙女"),
    YANG_JIAN("杨戬"),
    JIANG_ZI_YA("姜子牙");

    private final String name;

    CharacterType(String name) {
        this.name = name;
    }
}
