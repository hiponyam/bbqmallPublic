package com.hiponya.bbqmall.entities.bbs;

public class BpBoardEntity {

    private String  id;
    private String text;

    public String getId() {
        return id;
    }

    public BpBoardEntity setId(String id) {
        this.id = id;
        return this;
    }

    public String getText() {
        return text;
    }

    public BpBoardEntity setText(String text) {
        this.text = text;
        return this;
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}