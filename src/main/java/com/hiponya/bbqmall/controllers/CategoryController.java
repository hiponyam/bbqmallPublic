package com.hiponya.bbqmall.controllers;

import com.hiponya.bbqmall.entities.member.UserEntity;
import com.hiponya.bbqmall.entities.product.*;
import com.hiponya.bbqmall.enums.CommonResult;
import com.hiponya.bbqmall.enums.category.UserResult;
import com.hiponya.bbqmall.enums.member.CategoryResult;
import com.hiponya.bbqmall.interfaces.IResult;
import com.hiponya.bbqmall.models.PagingModel;
import com.hiponya.bbqmall.services.CategoryService;
import com.hiponya.bbqmall.vos.bbs.BpReadVo;
import com.hiponya.bbqmall.vos.product.ProductReadVo;
import jdk.jfr.Category;
import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.print.attribute.standard.Media;

@Controller
@RequestMapping(value = "/")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @RequestMapping(value = "category", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getCategory(@RequestParam(value = "cid") Integer cid,
                                    @RequestParam(value = "sid", required = false) Integer sid,
                                    @RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                                    CategoryEntity category,
                                    ProductEntity product,
                                    SortEntity sort) {
        //페이지 안보내줫을때는 펄즈, 펄즈도 인식하게 인티저, 펄즈일시 디폴트 1
        page=Math.max(1,page);
        ModelAndView modelAndView = new ModelAndView("home/category");
        CategoryEntity[] categories = this.categoryService.getCategories();

        if(sid == null) {
            sid = 1;
        }
        int totalCount = this.categoryService.getCategoryProductsCount(cid);

        PagingModel paging = new PagingModel(12,totalCount, page);
        ProductReadVo[] products = this.categoryService.getProducts(cid, sid, paging);
        CategoryEntity categories2;
        SortEntity[] sorts = this.categoryService.getSorts();

        if(cid != 0 && product!=null) {
            categories2 = this.categoryService.getCategories2(cid);
            modelAndView.addObject("title", categories2.getTitle());
        }

        if(cid == 0 && product != null) {//전체조회
            modelAndView.addObject("title", "전체상품");
        }


        category.setIndex(category.getIndex());

        category.setTitle(category.getTitle());

        modelAndView.addObject("sort", sort);
        modelAndView.addObject("sorts", sorts);
        modelAndView.addObject("product", product);
        modelAndView.addObject("paging", paging); //게시글개수

        modelAndView.addObject("products", products);
        modelAndView.addObject("categories", categories);
        modelAndView.addObject("category", category);
        modelAndView.addObject("index",category.getIndex());
        modelAndView.addObject("cid", cid);

        return modelAndView;
    }

    @RequestMapping(value="wishlist", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getWishlist(@SessionAttribute(value = "user", required = false) UserEntity user,
                                    @RequestParam(value = "pid") int pid,
                                    @RequestParam(value="quantity") int quantity) {
        ModelAndView modelAndView = new ModelAndView("home/wishlist");
        ProductEntity product = this.categoryService.getProductByIndex(pid);

        WishlistEntity[] wishlists = this.categoryService.getWishlists(user.getId());
        Integer sumPrice =  this.categoryService.getWishlistSumPrice(user.getId());
        Integer salePrice = this.categoryService.getWishlistSumSalePrice(user.getId());
        Integer sumQuantity =  this.categoryService.getWishlistSumQuantity(user.getId());

        modelAndView.addObject("wishlists", wishlists);
        modelAndView.addObject("sumPrice", sumPrice);
        modelAndView.addObject("salePrice", salePrice);
        modelAndView.addObject("sumQuantity", sumQuantity);
        modelAndView.addObject("user", user);

        modelAndView.addObject("product", product);
        modelAndView.addObject("quantity", quantity);
        modelAndView.addObject("pid", pid);

        return modelAndView;
    }

    @RequestMapping(value = "wishlist", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postWishlist(@SessionAttribute(value = "user", required = false) UserEntity user,
                               WishlistEntity wishlist) {
        JSONObject responseObject = new JSONObject();
        if (user == null) {
            responseObject.put("result", UserResult.NO_USER.name().toLowerCase());
        } else {
            wishlist.setId(user.getId());
            Enum<?> result = this.categoryService.insertWishlist(wishlist);
            responseObject.put("result", result.name().toLowerCase());
            System.out.println(wishlist.getProductIndex());
        }
        return responseObject.toString();
    }

    @RequestMapping(value="wishlist", method=RequestMethod.PATCH, produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchWishlist(@SessionAttribute(value = "user",required = false) UserEntity user,
                                OrderEntity order) {
        JSONObject responseObject = new JSONObject();
        Enum<?> result = this.categoryService.insertWishlistOrder(user, order);
        responseObject.put("result", result.name().toLowerCase());
        if(result == CommonResult.SUCCESS) {

            System.out.println(order.getId());
        }

        return responseObject.toString();
    }

    @RequestMapping(value="category", method=RequestMethod.PATCH, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchCategory(@RequestParam(value="sid") int sid) {
        JSONObject responseObject = new JSONObject();
        ProductEntity[] products = this.categoryService.getProductSortByIndex(sid);
        responseObject.put("products", products);

        return responseObject.toString();
    }

    @RequestMapping(value="order", method=RequestMethod.POST, produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postOrder(@SessionAttribute(value = "user",required = false) UserEntity user,
                            OrderEntity order) {
        JSONObject responseObject = new JSONObject();
        Enum<?> result = this.categoryService.insertOrder(user, order);
        responseObject.put("result", result.name().toLowerCase());
        if(result == CommonResult.SUCCESS) {

            System.out.println(order.getId());
        }

        return responseObject.toString();
    }

    @RequestMapping(value = "wishlist", method= RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteWishlist(@SessionAttribute(value = "user", required = false) UserEntity user,
                                 @RequestParam(value = "wishlistIndex") int wishlistIndex) {
        // CommentEntity를 받아오는 이유 : formData.append('index', commentObject['index']); <- 에 index를 전달하기 위해
        // index를 전달하는 이유 : 지워야할 comment를 완벽하게 특정할 수 있는 키이기 때문에(기본 키여서 겹치지 않기때문에)

        WishlistEntity wishlist = new WishlistEntity();
        wishlist.setIndex(wishlistIndex);
        System.out.println(wishlist.getIndex());
        wishlist.setId(user.getId());
        Enum<? extends IResult> result = this.categoryService.deleteWishlist(wishlist, user);
        System.out.println(wishlist.getIndex());

        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }


    @RequestMapping(value = "cart", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getCart(@SessionAttribute(value = "user",required = false) UserEntity user,
                                @RequestParam(value="cid", required = false) Integer cid,
                                @RequestParam(value="pid", required = false) int pid,
                                @RequestParam(value="quantity") int quantity) {
        ModelAndView modelAndView = new ModelAndView("home/cart");;

        CartEntity cart = new CartEntity();

        ProductEntity product = this.categoryService.getProductByIndex(pid);
        if(user != null) {
            modelAndView.addObject("user", user);
        }

//        ProductReadVo[] products = this.categoryService.getProducts(cid);
//        modelAndView.addObject("products", products);


        modelAndView.addObject("quantity", quantity);
        modelAndView.addObject("pid", pid);
        modelAndView.addObject("product", product);
        modelAndView.addObject("cart", cart);
        modelAndView.addObject("cartIndex", cid);

        return modelAndView;
    }

    @RequestMapping(value = "view", method=RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getView(@SessionAttribute(value="user", required = false)UserEntity user,
                                @RequestParam(value = "pid", required = false) int pid,
                                @RequestParam(value = "cid", required = false) Integer cid,
                                CategoryEntity category,
                                CartEntity cart) {
        ModelAndView modelAndView = new ModelAndView("home/view");

        modelAndView.addObject("cart", cart);


        modelAndView.addObject("category", category);
        modelAndView.addObject("cid", category.getIndex());
        modelAndView.addObject("pid", pid);
//        if(cid == 0) {
//            ProductEntity[] products = this.categoryService.getProducts(cid);
//            modelAndView.addObject("products", products);
//        }

        ProductReadVo product = this.categoryService.getProductByIndex(pid);
        modelAndView.addObject("product", product);
        if(user==null) {

        }


//        JSONObject commentObject = new JSONObject();
//        commentObject.put("productName", product.getProductName());
//        commentObject.put("price", product.getPrice());

        return modelAndView;
    }

//    @RequestMapping(value = "list", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ModelAndView getList(@RequestParam(value = "cid") int cid,
//                                @RequestParam(value = "sid", required = false) int sid,
//                                CategoryEntity category,
//                                ProductEntity product) {
//        ModelAndView modelAndView = new ModelAndView("home/list");
//
//        this.categoryService.getCategoryIndex(cid);
//        modelAndView.addObject("category", category);
//        modelAndView.addObject("product", product);
//
//        ProductReadVo[] products = this.categoryService.getProducts(cid, sid);
//        modelAndView.addObject("products", products);
//
//        JSONObject commentObject = new JSONObject();
//        commentObject.put("productName", product.getProductName());
//        commentObject.put("price", product.getPrice());
//
//        return modelAndView;
//    }


    @GetMapping(value = "productImage")
    public ResponseEntity<byte[]> getProductImage(@RequestParam(value = "index") int index){

        ResponseEntity<byte[]> responseEntity ;


        ProductImageEntity productImage = this.categoryService.getProductImage(index);

        if(productImage==null){
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.valueOf(productImage.getType()));
            headers.setContentLength(productImage.getData().length);
            responseEntity = new ResponseEntity<>(productImage.getData(),headers, HttpStatus.OK);
        }
        return responseEntity;
    }

    @GetMapping(value = "detailImage")
    public ResponseEntity<byte[]> getDetailImage(@RequestParam(value = "index") int index){

        ResponseEntity<byte[]> responseEntity ;


        DetailImageEntity detailImage = this.categoryService.getDetailImage(index);

        if(detailImage==null){
            responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.valueOf(detailImage.getType()));
            headers.setContentLength(detailImage.getData().length);
            responseEntity = new ResponseEntity<>(detailImage.getData(),headers, HttpStatus.OK);
        }
        return responseEntity;
    }

    @RequestMapping(value = "view", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String postCategoryQuantity(@RequestParam(value = "cid") int cid,
                                       @RequestParam(value = "sid") int sid,
                                       CategoryEntity category,
                                       SortEntity sort) {
        JSONObject responseObject = new JSONObject();
        Enum<?> result =this.categoryService.getProductQuantity(cid);
        responseObject.put("result", result.name().toLowerCase());
        sort.setIndex(sid);
        responseObject.put("index", category.getIndex());
        responseObject.put("title", category.getTitle());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("cid", category.getIndex());
            responseObject.put("sid", sid);
        }


        return responseObject.toString();
    }

    @PostMapping(value="category", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postCategory(@RequestParam(value = "cid") int cid,
                               @SessionAttribute(value = "user", required = false) UserEntity user,
                               CategoryEntity category,
                               ProductEntity product,
                               SortEntity sort) {
        JSONObject responseObject = new JSONObject();

        Enum<? extends IResult> result =this.categoryService.sendCategoryIndex(category, product);

        if (category == null) {
            result = CategoryResult.NO_CATEGORY;
        } else if(user == null) {
            result = UserResult.NO_USER;
        } else {
            category.setIndex(cid);
            category.setTitle(category.getTitle());
            product.setPrice(product.getPrice());
            product.setDetailIndex(category.getIndex());
            sort.setIndex(sort.getIndex());

            result = this.categoryService.getProductQuantity(category.getIndex());
            if (result == CommonResult.SUCCESS) {
                responseObject.put("cid", category.getIndex());
                responseObject.put("sid", sort.getIndex());
            }
        }


        responseObject.put("result", result.name().toLowerCase());
        responseObject.put("category", category);
        responseObject.put("product", product);
        responseObject.put("price", product.getPrice());


        return responseObject.toString();
    }

//    @RequestMapping(value="view", method=RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
//    @ResponseBody
//    public String postView() {
//        return null;
//    }


    @GetMapping(value = "search", produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getSearch(@RequestParam (value = "keyword", defaultValue = "") String keyword,
                                  @RequestParam(value = "page", required = false, defaultValue = "1") Integer page
    ){
        //페이지 안보내줫을때는 펄즈, 펄즈도 인식하게 인티저, 펄즈일시 디폴트 1
        page=Math.max(1,page);



        int totalCount = this.categoryService.getSearchProductsCount(keyword);

        PagingModel paging = new PagingModel(12,totalCount, page);
        ProductReadVo[] products = this.categoryService.getSearchProducts(paging, keyword);



        ModelAndView modelAndView = new ModelAndView("home/search");
        modelAndView.addObject("keyword",keyword);

        modelAndView.addObject("products",products);

        modelAndView.addObject("paging", paging); //게시글개수




        return modelAndView;
    }

}