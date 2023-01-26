package com.hiponya.bbqmall.entities.bbs;

import java.util.Date;

public class BpArticleEntity {



    private int  index;
    private String Id;

    private int bpBoardId;
    private String name;

    private String email;

    private String contact;

    private String company;

    private String requestDate;

    private String productInfo;



    private String requestPrice;

    private String pay;

    private String requestEvidence;

    private boolean replySms;
    private boolean replyEmail;

    private String title;
    private String content;

    private Date writtenOn;

    private Date modifiedOn;

    private int commentCount;

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    public String getProductInfo() {
        return productInfo;
    }

    public void setProductInfo(String productInfo) {
        this.productInfo = productInfo;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public int getBpBoardId() {
        return bpBoardId;
    }

    public void setBpBoardId(int bpBoardId) {
        this.bpBoardId = bpBoardId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(String requestDate) {
        this.requestDate = requestDate;
    }

    public String getRequestPrice() {
        return requestPrice;
    }

    public void setRequestPrice(String requestPrice) {
        this.requestPrice = requestPrice;
    }

    public String getPay() {
        return pay;
    }

    public void setPay(String pay) {
        this.pay = pay;
    }

    public String getRequestEvidence() {
        return requestEvidence;
    }

    public void setRequestEvidence(String requestEvidence) {
        this.requestEvidence = requestEvidence;
    }

    public boolean isReplySms() {
        return replySms;
    }

    public void setReplySms(boolean replySms) {
        this.replySms = replySms;
    }

    public boolean isReplyEmail() {
        return replyEmail;
    }

    public void setReplyEmail(boolean replyEmail) {
        this.replyEmail = replyEmail;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getWrittenOn() {
        return writtenOn;
    }

    public void setWrittenOn(Date writtenOn) {
        this.writtenOn = writtenOn;
    }

    public Date getModifiedOn() {
        return modifiedOn;
    }

    public void setModifiedOn(Date modifiedOn) {
        this.modifiedOn = modifiedOn;
    }
}