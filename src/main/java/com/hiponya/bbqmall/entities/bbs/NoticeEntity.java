package com.hiponya.bbqmall.entities.bbs;

import java.util.Date;

public class NoticeEntity {



    private int  index;

    private String id;
    private String boardId;
    private String title;
    private Date writtenOn;
    private int view;
    private Boolean isImportant;
    private String content;

    private Date modifiedOn;

    private Date expirationDate;

    private Boolean isNew;

    private String qnaBoardId;

    private int commentCount;
    public String getQnaBoardId() {
        return qnaBoardId;
    }

    public void setQnaBoardId(String qnaBoardId) {
        this.qnaBoardId = qnaBoardId;
    }

    public Boolean isNew() {
        return isNew;
    }

    public NoticeEntity setNew(Boolean isNew) {
        this.isNew = isNew;
        return this;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }



    public int getIndex() {
        return index;
    }

    public NoticeEntity setIndex(int index) {
        this.index = index;
        return this;
    }

    public String getBoardId() {
        return boardId;
    }

    public NoticeEntity setBoardId(String boardId) {
        this.boardId = boardId;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public NoticeEntity setTitle(String title) {
        this.title = title;
        return this;
    }

    public Date getWrittenOn() {
        return writtenOn;
    }

    public NoticeEntity setWrittenOn(Date writtenOn) {
        this.writtenOn = writtenOn;
        return this;
    }

    public int getView() {
        return view;
    }

    public NoticeEntity setView(int view) {
        this.view = view;
        return this;
    }

    public Boolean isImportant() {
        return isImportant;
    }

    public NoticeEntity setImportant(Boolean important) {
        this.isImportant = important;
        return this;
    }

    public String getContent() {
        return content;
    }

    public NoticeEntity setContent(String content) {
        this.content = content;
        return this;
    }

    public Date getModifiedOn() {
        return modifiedOn;
    }

    public NoticeEntity setModifiedOn(Date modifiedOn) {
        this.modifiedOn = modifiedOn;
        return this;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
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