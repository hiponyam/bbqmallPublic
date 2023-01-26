package com.hiponya.bbqmall.services;

import com.hiponya.bbqmall.controllers.HomeController;
import com.hiponya.bbqmall.entities.member.EmailAuthEntity;
import com.hiponya.bbqmall.entities.member.UserEntity;
import com.hiponya.bbqmall.entities.product.*;
import com.hiponya.bbqmall.enums.CommonResult;
import com.hiponya.bbqmall.enums.category.WishlistDeleteResult;
import com.hiponya.bbqmall.enums.member.CategoryResult;
import com.hiponya.bbqmall.enums.member.VerifyEmailAuthResult;
import com.hiponya.bbqmall.interfaces.IResult;
import com.hiponya.bbqmall.mappers.ICategoryMapper;
import com.hiponya.bbqmall.mappers.IHomeMapper;
import com.hiponya.bbqmall.models.PagingModel;
import com.hiponya.bbqmall.vos.product.ProductReadVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;

import static java.util.Arrays.stream;

@Service(value = "com.hiponya.bbqmall.services.CategoryService")
public class CategoryService {

    private final ICategoryMapper categoryMapper;
    private final IHomeMapper iHomeMapper ;
    @Autowired
    public CategoryService(ICategoryMapper categoryMapper, IHomeMapper iHomeMapper) {
        this.categoryMapper = categoryMapper;
        this.iHomeMapper = iHomeMapper;
    }

    public CategoryEntity getCategoryIndex(int index) {
        return this.categoryMapper.selectCategoryByIndex(index);
    }

    public Enum<? extends IResult> getProductQuantity (int index) {
        ProductEntity existingProduct = this.categoryMapper.selectSaleQuantityByIndex(index);
        if(existingProduct == null) {
            return CategoryResult.NO_PRODUCTS;
        }
        return CommonResult.SUCCESS;
    }

    @Transactional
    public Enum<? extends IResult> sendCategoryIndex(CategoryEntity category, ProductEntity product) {

        CategoryEntity existingCategory = this.categoryMapper.selectCategoryIndexByDetailIndex(product.getDetailIndex());
        if (existingCategory == null) {
            return CommonResult.FAILURE;
        }
        if(category.getIndex() != product.getDetailIndex()) {
            return CategoryResult.NO_PRODUCTS;
        }
        if(category.getTitle() == null) {
            return CategoryResult.NO_CATEGORY;
        }

        return CommonResult.SUCCESS;
    }

    public Enum<? extends IResult> insertOrder(UserEntity user, OrderEntity order) {
        UserEntity existingUser = this.categoryMapper.selectUserById(user.getId());
        if(existingUser == null) {
            return CommonResult.FAILURE;
        }
        return this.categoryMapper.insertOrder(order) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public Enum<? extends IResult> insertWishlistOrder(UserEntity user, OrderEntity order) {
        UserEntity existingUser = this.categoryMapper.selectUserById(user.getId());
        if(existingUser == null) {
            return CommonResult.FAILURE;
        }
        return this.categoryMapper.insertWishlistOrder(order) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public Enum<? extends IResult> insertWishlist(WishlistEntity wishlist) {

        ProductEntity product = this.categoryMapper.selectProductByIndex(wishlist.getProductIndex());

        if(product == null) {
            return CommonResult.FAILURE; // 게시글이 없다면 FAILURE
        }
        return this.categoryMapper.insertWishlistByIndex(wishlist) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public Integer getWishlistSumPrice(String id) {
        return this.categoryMapper.selectWishlistSumPriceByUserId(id);
    }

    public Integer getWishlistSumSalePrice(String id) {
        return this.categoryMapper.selectWishlistSumSalePriceByUserId(id);
    }

    public Integer getWishlistSumQuantity(String id) {
        return this.categoryMapper.selectWishlistSumQuantityByUserId(id);
    }

    public ProductReadVo getProductByIndex(int pid) {




        ProductReadVo product =this.categoryMapper.selectProductByIndex(pid);

        ProductImageEntity[] productImages = this.iHomeMapper.selectProductImagesByProductIndexExceptData(product.getProductIndex());
        int[] productImageIndexes = stream(productImages).mapToInt(ProductImageEntity::getIndex).toArray();
        product.setImageIndexes(productImageIndexes);

        DetailImageEntity[] detailImages = this.iHomeMapper.selectDetailImagesByProductIndexExceptData(product.getProductIndex());
        int[] detailImageIndexes = stream(detailImages).mapToInt(DetailImageEntity::getIndex).toArray();
        product.setDetailImageIndexes(detailImageIndexes);




        return product;
    }

    public Enum<? extends IResult> deleteWishlist(WishlistEntity wishlist, UserEntity user) {
        // 성공, 실패, 로그인이 안되었고 삭제하려는 댓글이 니 댓글이 아닌경우(너 = 세션으로 확인), 댓글이 존재하지 않음(null이 반환될 경우)
        WishlistEntity existingWishlist = this.categoryMapper.selectWishlist(wishlist.getIndex()); // wishlist.getIndex() = 자바스크립트에서 넘어온 index 값
        if(existingWishlist == null) {
            return WishlistDeleteResult.NO_SUCH_WISHLIST;
        }

        return this.categoryMapper.deleteWishlistByIndex(wishlist.getIndex()) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
    }

    public ProductEntity[] getProductSortByIndex(int sid) {
        SortEntity existingSort = this.categoryMapper.selectSort(sid);
        existingSort.setIndex(sid);
        ProductEntity[] products = this.categoryMapper.selectProductsSortBySortIndex(existingSort.getIndex());


        return products;
    }

    public CartEntity getCartByIndex(int cid) {
        return this.categoryMapper.selectCartByIndex(cid);
    }

    public CategoryEntity[] getCategories() {
        return this.categoryMapper.selectCategories();
    }

    public CategoryEntity getCategories2(int cid) {
        return this.categoryMapper.selectCategories2(cid);
    }

    public ProductReadVo[] getProductsByCid(int cid) {
        return this.categoryMapper.selectProducts(cid);
    }

    public SortEntity[] getSorts() {
        return this.categoryMapper.selectSorts();
    }

    public WishlistEntity[] getWishlists(String id) {
        return this.categoryMapper.selectWishlists(id);
    }

    public ProductEntity[] getEightProducts() {
        return this.categoryMapper.selectEightProducts();
    }
    public ProductEntity[] getSecondEightProducts() {
        return this.categoryMapper.selectSecondEightProducts();
    }
    public ProductEntity[] getThirdEightProducts() {
        return this.categoryMapper.selectThirdEightProducts();
    }

    public ProductReadVo[] getProducts(int cid, int sid, PagingModel paging){

        ProductReadVo[] products =this.categoryMapper.selectProductsByDetailIndex(cid, sid, paging.countPerPage, (paging.requestPage - 1) * (paging.countPerPage));
        for (ProductReadVo product :products){
            ProductImageEntity[] productImages = this.categoryMapper.selectProductImagesByProductIndexExceptData(product.getProductIndex());
            int[] productImageIndexes = stream(productImages).mapToInt(ProductImageEntity::getIndex).toArray();
            product.setImageIndexes(productImageIndexes);

            DetailImageEntity[] detailImages = this.categoryMapper.selectDetailImagesByProductIndexExceptData(product.getProductIndex());
            int[] detailImageIndexes = stream(detailImages).mapToInt(DetailImageEntity::getIndex).toArray();
            product.setDetailImageIndexes(detailImageIndexes);


        }
        return products;
    }

    public ProductImageEntity getProductImage (int index){

        return this.categoryMapper.selectProductImageByIndex(index);
    }
    public DetailImageEntity getDetailImage (int index){

        return this.categoryMapper.selectDetailImageByIndex(index);
    }

    public ProductReadVo[] getSearchProducts(PagingModel paging, String keyword){

        ProductReadVo[] products =this.categoryMapper.selectProductsByKeyword(keyword, paging.countPerPage, (paging.requestPage - 1) * (paging.countPerPage));
        for (ProductReadVo product :products){
            ProductImageEntity[] productImages = this.categoryMapper.selectProductImagesByProductIndexExceptData(product.getProductIndex());
            int[] productImageIndexes = stream(productImages).mapToInt(ProductImageEntity::getIndex).toArray();
            product.setImageIndexes(productImageIndexes);

            DetailImageEntity[] detailImages = this.categoryMapper.selectDetailImagesByProductIndexExceptData(product.getProductIndex());
            int[] detailImageIndexes = stream(detailImages).mapToInt(DetailImageEntity::getIndex).toArray();
            product.setDetailImageIndexes(detailImageIndexes);


        }


        return products;
    }

    public int getCategoryProductsCount(int cid){
        return this.categoryMapper.selectCategoryProductCountById(cid);
    }

    public int getSearchProductsCount(String keyword) { //검색조건이 크리테리온 검색어가 키워드 보드가 어느 게시판
//
        return this.categoryMapper.selectSearchProductsCountByKeyword(keyword );

    }
}