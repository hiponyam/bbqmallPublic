package com.hiponya.bbqmall.entities.product;

import java.util.Date;
import java.util.Objects;

public class ProductEntity {
    private int productIndex;
    private int detailIndex;
    private String productName;
    private int price;
    private String content;
    private int view;
    private Date createdOn;
    private Date modifiedOn;
    private int amount;
    private int onSale;
    private int saleQuantity;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductEntity that = (ProductEntity) o;
        return productIndex == that.productIndex;
    }

    @Override
    public int hashCode() {
        return Objects.hash(productIndex);
    }

    public int getProductIndex() {
        return productIndex;
    }

    public ProductEntity setProductIndex(int productIndex) {
        this.productIndex = productIndex;
        return this;
    }

    public int getDetailIndex() {
        return detailIndex;
    }

    public ProductEntity setDetailIndex(int detailIndex) {
        this.detailIndex = detailIndex;
        return this;
    }

    public String getProductName() {
        return productName;
    }

    public ProductEntity setProductName(String productName) {
        this.productName = productName;
        return this;
    }

    public int getPrice() {
        return price;
    }

    public ProductEntity setPrice(int price) {
        this.price = price;
        return this;
    }

    public String getContent() {
        return content;
    }

    public ProductEntity setContent(String content) {
        this.content = content;
        return this;
    }

    public int getView() {
        return view;
    }

    public ProductEntity setView(int view) {
        this.view = view;
        return this;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public ProductEntity setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public Date getModifiedOn() {
        return modifiedOn;
    }

    public ProductEntity setModifiedOn(Date modifiedOn) {
        this.modifiedOn = modifiedOn;
        return this;
    }

    public int getAmount() {
        return amount;
    }

    public ProductEntity setAmount(int amount) {
        this.amount = amount;
        return this;
    }

    public int getOnSale() {
        return onSale;
    }

    public ProductEntity setOnSale(int onSale) {
        this.onSale = onSale;
        return this;
    }

    public int getSaleQuantity() {
        return saleQuantity;
    }

    public ProductEntity setSaleQuantity(int saleQuantity) {
        this.saleQuantity = saleQuantity;
        return this;
    }
}
