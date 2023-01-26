package com.hiponya.bbqmall.vos.bbs;

import com.hiponya.bbqmall.entities.bbs.NoticeEntity;

public class NoticeReadVo  extends NoticeEntity {


    private String text;

    public String getText() {
        return text;
    }

    public NoticeReadVo setText(String text) {
        this.text = text;
        return this;
    }
}
