package com.hiponya.bbqmall.enums.admin;

import com.hiponya.bbqmall.interfaces.IResult;

public enum AdminResult implements IResult {

    SUCCESS,
    FAILURE,
    NOT_SIGNED,
    NOT_ALLOWED,
    NO_SUCH_ARTICLE
}