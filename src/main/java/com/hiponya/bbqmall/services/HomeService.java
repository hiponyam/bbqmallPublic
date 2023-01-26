package com.hiponya.bbqmall.services;

import com.hiponya.bbqmall.entities.bbs.*;
import com.hiponya.bbqmall.entities.product.DetailImageEntity;
import com.hiponya.bbqmall.entities.product.ProductEntity;
import com.hiponya.bbqmall.entities.product.ProductImageEntity;
import com.hiponya.bbqmall.mappers.IBbsMapper;
import com.hiponya.bbqmall.mappers.IHomeMapper;
import com.hiponya.bbqmall.vos.product.ProductReadVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static java.util.Arrays.stream;

@Service(value = "com.hiponya.services.HomeService")

public class HomeService {

    private final IHomeMapper iHomeMapper;

    @Autowired
    public HomeService(IHomeMapper iHomeMapper) {
        this.iHomeMapper = iHomeMapper;
    }

    public NoticeEntity[] getProductReviews() {

        return this.iHomeMapper.selectProductReview();
    }
    public ProductReadVo[] getRecommendedProducts() {

        ProductReadVo[] products =this.iHomeMapper.selectRecommendedProduct();
        for (ProductReadVo product :products){
            ProductImageEntity[] productImages = this.iHomeMapper.selectProductImagesByProductIndexExceptData(product.getProductIndex());
            int[] productImageIndexes = stream(productImages).mapToInt(ProductImageEntity::getIndex).toArray();
            product.setImageIndexes(productImageIndexes);

        }
        return products;
    }

}