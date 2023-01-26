package com.hiponya.bbqmall.entities.member;

import java.util.Date;

public class WithdrawalEntity {


    private int index;

    private String id;

    private String reasonText;

    private int reasonValue;
    private String reasonCategory;



    private Date deletedOn;

    public int getReasonValue() {
        return reasonValue;
    }

    public void setReasonValue(int reasonValue) {
        this.reasonValue = reasonValue;
    }

    public String getReasonCategory() {
        return reasonCategory;
    }

    public void setReasonCategory(String reasonCategory) {
        this.reasonCategory = reasonCategory;
    }
    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReasonText() {
        return reasonText;
    }

    public void setReasonText(String reasonText) {
        this.reasonText = reasonText;
    }

    public Date getDeletedOn() {
        return deletedOn;
    }

    public void setDeletedOn(Date deletedOn) {
        this.deletedOn = deletedOn;
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