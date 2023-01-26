package com.hiponya.bbqmall.enums.bbs;


import com.hiponya.bbqmall.interfaces.IResult;

public enum ModifyResult implements IResult {
    NO_SUCH_ARTICLE,
    NOT_ALLOWED,
    NOT_SIGNED,

    CONTACT_DUPLICATED;
}