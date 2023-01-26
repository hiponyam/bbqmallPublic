package com.hiponya.bbqmall.mappers;

import com.hiponya.bbqmall.entities.bbs.*;
import com.hiponya.bbqmall.vos.bbs.BpReadVo;
import com.hiponya.bbqmall.vos.bbs.NoticeReadVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IBbsMapper {


    NoticeBoardEntity selectNoticeBoardId(@Param(value = "id") String id);
    BpBoardEntity selectBpBoardById(@Param(value = "id") int id);



    int selectNoticeCountByNoticeBoardId(@Param(value = "boardId") String boardId,

                                         @Param(value = "keyword") String keyword,
                                         @Param(value = "qid") String qid);

    int selectBpArticleCountByBpBoardId(@Param(value = "bpBoardId") String bpBoardId,

                                        @Param(value = "keyword") String keyword);



    int updateNoticeIsNew();

    int deleteNoticeByIndex(@Param(value = "index") int index);
    int deleteBpArticleByIndex(@Param(value = "index") int index);
    int deleteAdminCommentByIndex(@Param(value = "index") int index);
    int deletePiCommentByIndex(@Param(value = "index") int index);

    NoticeReadVo[] selectAnnounceNotice();
    NoticeReadVo[] selectNoticeByBoardId(@Param(value = "boardId") String boardId,

                                         @Param(value = "keyword") String keyword,
                                         @Param(value = "limit") int limit,
                                         @Param(value = "offset") int offset,
                                         @Param(value = "qid") String qid);
    NoticeReadVo[] selectMyNoticeById(@Param(value = "id") String id,

                                      @Param(value = "boardId") String boardId,
                                      @Param(value = "limit") int limit,
                                      @Param(value = "offset") int offset);

    BpReadVo[] selectBpArticleByBoardId(@Param(value = "bpBoardId") String bpBoardId,
                                        @Param(value = "keyword") String keyword,
                                        @Param(value = "limit") int limit,
                                        @Param(value = "offset") int offset
    );
    BpReadVo[] selectBpArticleById(@Param(value = "id") String id,

                                   @Param(value = "limit") int limit,
                                   @Param(value = "offset") int offset
    );
    BpReadVo selectBpArticleByBoardIdJustOne(@Param(value = "bpBoardId") int bpBoardId);
    NoticeReadVo selectNoticeByIndex(@Param(value = "index") int index);

    QnaAnswerEntity[] selectAnswers();

    AdminCommentEntity[] selectAdminCommentByIndex(@Param(value = "articleIndex") int articleIndex);
    PiCommentEntity[] selectPiCommentByIndex(@Param(value = "articleIndex") int articleIndex);
    AdminCommentEntity selectAdminCommentByIndexJustOne(@Param(value = "index") int index);
    PiCommentEntity selectPiCommentByIndexJustOne(@Param(value = "index") int index);
    int updateNotice(NoticeEntity notice);
    int updateBpArticle(BpArticleEntity bpArticle);
    int updateAdminComment(AdminCommentEntity adminComment);
    int updatePiComment(PiCommentEntity piComment);



    int insertNotice(NoticeEntity notice);
    int insertBpArticle(BpArticleEntity bpArticle);
    int insertAdminComment(AdminCommentEntity adminComment);
    int insertPiComment(PiCommentEntity piComment);



    int insertImage(ImageEntity image);

    ImageEntity selectImageByIndex(@Param(value =  "index") int index);



}