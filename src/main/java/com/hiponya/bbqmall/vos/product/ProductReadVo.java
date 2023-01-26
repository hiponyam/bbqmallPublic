package com.hiponya.bbqmall.vos.product;

import com.hiponya.bbqmall.entities.product.ProductEntity;

public class ProductReadVo extends ProductEntity {

    private int[] imageIndexes;

    private int[] detailImageIndexes;

    public int[] getImageIndexes() {
        return imageIndexes;
    }

    public void setImageIndexes(int[] imageIndexes) {
        this.imageIndexes = imageIndexes;
    }

    public int[] getDetailImageIndexes() {
        return detailImageIndexes;
    }

    public void setDetailImageIndexes(int[] detailImageIndexes) {
        this.detailImageIndexes = detailImageIndexes;
    }
}