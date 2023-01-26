package com.hiponya.bbqmall.controllers;


import com.hiponya.bbqmall.entities.member.UserEntity;
import com.hiponya.bbqmall.entities.member.WithdrawalEntity;
import com.hiponya.bbqmall.interfaces.IResult;
import com.hiponya.bbqmall.services.MemberService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping(value = "myPage")
public class MyPageController {


    private final MemberService memberService;

    @Autowired
    public MyPageController(MemberService memberService) {
        this.memberService = memberService;
    }



//    @GetMapping(value = "/" , produces = MediaType.TEXT_HTML_VALUE)
//    public ModelAndView getMyPage(){
//
//        return new ModelAndView("myPage/myPage");
//
//    }
//
//
//    @GetMapping(value = "/withdrawal" , produces = MediaType.TEXT_HTML_VALUE)
//    public ModelAndView getMyPageWithdrawal(){
//
//        return new ModelAndView("myPage/myPageWithdrawal");
//
//    }
//
//    @ResponseBody
//    @RequestMapping(value = "/withdrawal", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public String  deleteUser(@SessionAttribute (value = "user" ,required = false)UserEntity user, WithdrawalEntity withdrawal, HttpSession session){
////        System.out.println("id="+user.getId());
//
//        JSONObject responseObject = new JSONObject();
//        Enum<? extends IResult> result = this.memberService.deleteUser(user, withdrawal,session);
//
//        responseObject.put("result", result.name().toLowerCase());
//
//        return responseObject.toString();
//    }


}