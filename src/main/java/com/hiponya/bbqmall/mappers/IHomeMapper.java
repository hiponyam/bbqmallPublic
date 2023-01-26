package com.hiponya.bbqmall.mappers;

import com.hiponya.bbqmall.entities.bbs.BpBoardEntity;
import com.hiponya.bbqmall.entities.bbs.NoticeEntity;
import com.hiponya.bbqmall.entities.product.DetailImageEntity;
import com.hiponya.bbqmall.entities.product.ProductImageEntity;
import com.hiponya.bbqmall.vos.product.ProductReadVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IHomeMapper {


    NoticeEntity[] selectProductReview();

    ProductReadVo[] selectRecommendedProduct();

    ProductImageEntity[] selectProductImagesByProductIndexExceptData(@Param(value = "productIndex") int productIndex);
    DetailImageEntity[] selectDetailImagesByProductIndexExceptData(@Param(value = "productIndex") int productIndex);

}