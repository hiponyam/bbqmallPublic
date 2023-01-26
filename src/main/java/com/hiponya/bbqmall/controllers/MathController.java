package com.hiponya.bbqmall.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/math")
public class MathController {

    @RequestMapping(value= "add", method= RequestMethod.GET)
    public int getAdd(@RequestParam(value="a", required = false) String a, @RequestParam(value="b", required = false) String b) {
        int result;
        try {
            result = Integer.parseInt(a) + Integer.parseInt(b);
        } catch(NullPointerException|NumberFormatException ex) {
            result = Integer.MIN_VALUE;
        }
        return result;
    }
}
