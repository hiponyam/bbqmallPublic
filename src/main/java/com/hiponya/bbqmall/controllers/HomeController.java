package com.hiponya.bbqmall.controllers;

import com.hiponya.bbqmall.entities.product.ProductEntity;
import com.hiponya.bbqmall.entities.product.ProductImageEntity;
import com.hiponya.bbqmall.services.CategoryService;
import com.hiponya.bbqmall.services.HomeService;
import org.springframework.boot.Banner;
import org.springframework.stereotype.Controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/")
public class HomeController {

    private final CategoryService categoryService;
    private final HomeService homeService;

    public HomeController(CategoryService categoryService, HomeService homeService) {
        this.categoryService = categoryService;
        this.homeService = homeService;
    }

    @GetMapping(value = "/" ,produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getHome(){
        ModelAndView modelAndView = new ModelAndView("home/index");
        ProductEntity[] eightProducts = this.categoryService.getEightProducts();
        ProductEntity[] secondEightProducts = this.categoryService.getSecondEightProducts();
        ProductEntity[] thirdEightProducts = this.categoryService.getThirdEightProducts();

        modelAndView.addObject("eightProducts", eightProducts);
        modelAndView.addObject("secondEightProducts", secondEightProducts);
        modelAndView.addObject("thirdEightProducts", thirdEightProducts);

        modelAndView.addObject("reviews", this.homeService.getProductReviews());
        modelAndView.addObject("products", this.homeService.getRecommendedProducts());

        return modelAndView;
    }

    @GetMapping(value = "register", produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getRegister() {
        ModelAndView modelAndView = new ModelAndView("member/register");

        return modelAndView;
    }

    @GetMapping(value = "catalog", produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getCatalog() {
        ModelAndView modelAndView = new ModelAndView("member/catalog");

        return modelAndView;
    }


}