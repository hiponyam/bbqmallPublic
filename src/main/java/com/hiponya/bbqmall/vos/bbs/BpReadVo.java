package com.hiponya.bbqmall.vos.bbs;

import com.hiponya.bbqmall.entities.bbs.BpArticleEntity;

public class BpReadVo extends BpArticleEntity {

    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
