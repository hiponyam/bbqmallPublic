package com.hiponya.bbqmall.vos.product;

import com.hiponya.bbqmall.entities.product.WishlistEntity;

public class WishlistVo extends WishlistEntity {
    private int price;
    private String productName;

    private int saleQuantity;

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getSaleQuantity() {
        return saleQuantity;
    }

    public void setSaleQuantity(int saleQuantity) {
        this.saleQuantity = saleQuantity;
    }
}
