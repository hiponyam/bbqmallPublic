package com.hiponya.bbqmall.vos.product;

import com.hiponya.bbqmall.entities.product.ProductEntity;

public class ProductVo extends ProductEntity {
    private int productCount;

    public int getProductCount() {
        return productCount;
    }

    public void setProductCount(int productCount) {
        this.productCount = productCount;
    }
}
