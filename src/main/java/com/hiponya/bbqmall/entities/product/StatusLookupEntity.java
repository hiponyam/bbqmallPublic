package com.hiponya.bbqmall.entities.product;

import java.util.Date;

public class StatusLookupEntity {

    private int index;
    private String productIndex;
    private String status;
    private String statusText;
    private String text;

    private Date occurredTime;


    public String getProductIndex() {
        return productIndex;
    }

    public void setProductIndex(String productIndex) {
        this.productIndex = productIndex;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getOccurredTime() {
        return occurredTime;
    }

    public void setOccurredTime(Date occurredTime) {
        this.occurredTime = occurredTime;
    }

    public String getStatusText() {
        return statusText;
    }

    public void setStatusText(String statusText) {
        this.statusText = statusText;
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