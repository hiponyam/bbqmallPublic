package com.hiponya.bbqmall.vos.member;


import com.hiponya.bbqmall.entities.member.EmailAuthEntity;

public class EmailAuthVo extends EmailAuthEntity {

    private String id;
    private String name;


    public String getId() {
        return id;
    }

    public EmailAuthVo setId(String id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public EmailAuthVo setName(String name) {
        this.name = name;
        return this;
    }
}
