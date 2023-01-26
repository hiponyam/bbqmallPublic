package com.hiponya.bbqmall.models;


public class PagingModel {
    public final int countPerPage; //페이지당 표시할 게시글의 개수
    public final int totalCount;//전체 게시글의 개수
    public final int requestPage; //요청한 페이지 번호
    public int maxPage;//이동 가능한 최대 페이지
    public final int minPage;//이동 가능한 최소 페이지
    public int startPage;//표시 시작 페이지
    public int endPage;//표시 끝 페이지 상수기때문에 생성자로 전달해줘야함

    public PagingModel(int totalCount, int requestPage) {
        this(10, totalCount, requestPage); //갑을 주지않으면 자동으로 10줌
    }

    public PagingModel(int countPerPage, int totalCount, int requestPage) {
        this.countPerPage = countPerPage; //페이지당 표시할 게시글의 수
        this.totalCount = totalCount;  // 전체 게시글의수
        this.requestPage = requestPage; //요청한 페이지 펀호
        this.maxPage = (totalCount-1) /countPerPage+1; //이동 가능한 최대 페이지
        this.minPage=1;
        this.startPage =  ((requestPage-1)/10) *10+1;
        this.endPage = Math.min(this.startPage + 9, this.maxPage);
    }


}
