package com.hiponya.bbqmall.mappers;


import com.hiponya.bbqmall.entities.product.DetailImageEntity;
import com.hiponya.bbqmall.entities.product.ProductEntity;
import com.hiponya.bbqmall.entities.product.ProductImageEntity;
import com.hiponya.bbqmall.entities.product.StatusLookupEntity;
import com.hiponya.bbqmall.vos.product.ProductReadVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

@Mapper
public interface IAdminMapper {



    int insertProduct(ProductEntity product);

    int insertProductImage(ProductImageEntity productImage);
    int insertDetailImage(DetailImageEntity detailImage);
    int insertStatusLookup(StatusLookupEntity statusLookup);
    int updateProduct(ProductEntity product);


    int deleteProductByProductIndex(@RequestParam (value = "productIndex") int productIndex);
    int deleteProductImageByProductIndex(@RequestParam (value = "productIndex") int productIndex);
    int deleteDetailImageByProductIndex(@RequestParam (value = "productIndex") int productIndex);
    ProductReadVo[] selectProductsByDetailIndex(@RequestParam (value = "detailIndex") String detailIndex);
    ProductReadVo selectProductByProductIndex(@RequestParam (value = "productIndex") int pid);

    ProductImageEntity[] selectProductImagesByProductIndexExceptData(@Param(value = "productIndex") int productIndex);
    DetailImageEntity[] selectDetailImagesByProductIndexExceptData(@Param(value = "productIndex") int productIndex);

    StatusLookupEntity[] selectStatusLookupByStatus(String status);

    ProductImageEntity selectProductImageByIndex(@Param(value = "index") int index);
    DetailImageEntity selectDetailImageByIndex(@Param(value = "index") int index);



}