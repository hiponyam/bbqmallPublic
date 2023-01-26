package com.hiponya.bbqmall.services;

import com.hiponya.bbqmall.entities.bbs.ImageEntity;
import com.hiponya.bbqmall.entities.member.EmailAuthEntity;
import com.hiponya.bbqmall.entities.member.WithdrawalEntity;
import com.hiponya.bbqmall.entities.product.OrderEntity;
import com.hiponya.bbqmall.enums.bbs.DeleteResult;
import com.hiponya.bbqmall.enums.bbs.ModifyResult;
import com.hiponya.bbqmall.enums.member.DeleteUserResult;
import com.hiponya.bbqmall.enums.member.RegisterResult;
import com.hiponya.bbqmall.entities.member.UserEntity;
import com.hiponya.bbqmall.enums.CommonResult;
import com.hiponya.bbqmall.enums.member.SendEmailAuthResult;
import com.hiponya.bbqmall.enums.member.VerifyEmailAuthResult;
import com.hiponya.bbqmall.interfaces.IResult;
import com.hiponya.bbqmall.mappers.IMemberMapper;
import com.hiponya.bbqmall.utils.CryptoUtils;
import com.hiponya.bbqmall.vos.member.EmailAuthVo;
import org.apache.catalina.User;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

@Service(value = "com.hiponya.bbqmall.services.MemberService")
public class MemberService {


    private final JavaMailSender mailSender;

    private final TemplateEngine templateEngine;
    private final IMemberMapper memberMapper;


    @Autowired
    public MemberService(JavaMailSender mailSender, TemplateEngine templateEngine, IMemberMapper MemberMapper) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
        this.memberMapper = MemberMapper;
    }

    @Transactional //모두성공해야 보내주겟다
    public Enum<? extends IResult> sendEmailAuth(UserEntity user, EmailAuthEntity emailAuth, HttpServletRequest request) throws NoSuchAlgorithmException, MessagingException {
        //뭔진모르겠는데 반드시 상속받거나 구현하고 있어야한다.
        UserEntity existingUser = this.memberMapper.selectUserByEmail(user.getEmail());
        if (existingUser != null) {
            return SendEmailAuthResult.EMAIL_DUPLICATED; //사용중인 이메일이다.
        }
        //아파치커먼즈랭 암호화
        String authCode = RandomStringUtils.randomNumeric(6);
        String authSalt = String.format("%s%s%f%f",
                user.getEmail(), authCode, Math.random(), Math.random());
        System.out.println(authSalt); //솔트할 문자열 제작

        CryptoUtils.hashSha512(authCode);//유틸즈에서 가져옴

        Date createdOn = new Date();
        Date expiresOn = DateUtils.addMinutes(createdOn, 5);

        emailAuth.setCode(authCode);
        emailAuth.setSalt(authSalt);
        emailAuth.setCreatedOn(createdOn);
        emailAuth.setExpiresOn(expiresOn);
        emailAuth.setExpired(false);

        if (this.memberMapper.insertEmailAuth(emailAuth) == 0) {
            return CommonResult.FAILURE;
        }
//        SimpleMailMessage mail = new SimpleMailMessage();
//        mail.setTo(user.getEmail());
//        mail.setFrom("jjirong2e@gmail.com");
//        mail.setSubject("[스터디] 회원가입 인증 번호");
//        mail.setText("emailAuth.getCode()");
//        this.mailSender.send(mail);

        Context context = new Context(); //서비스에서 html 파일갑이용하기 위해
        context.setVariable("code", emailAuth.getCode());
        context.setVariable("domain", String.format("https://%s", request.getServerName()));


        //메일보내기
        String text = this.templateEngine.process("member/registerEmailAuth", context);//서비스에서 html 파일갑이용하기 위해2
        MimeMessage mail = this.mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mail, "UTF-8");
        helper.setTo(user.getEmail());
        helper.setSubject("[BBQ몰] 회원가입 인증번호입니다.");
        helper.setText(text, true);
        this.mailSender.send(mail);

        return CommonResult.SUCCESS;
    }

    @Transactional
    public Enum<? extends IResult> verifyEmailAuth(EmailAuthEntity emailAuth) {

        EmailAuthEntity existingEmailAuth = this.memberMapper.selectEmailAuthByEmailCodeSalt(
                emailAuth.getEmail(), emailAuth.getCode(), emailAuth.getSalt());

        if (existingEmailAuth == null) {
            return CommonResult.FAILURE;
        }

        if (existingEmailAuth.getExpiresOn().compareTo(new Date()) < 0) {
            return VerifyEmailAuthResult.EXPIRED;
        }

        existingEmailAuth.setExpired(true);
        if (this.memberMapper.updateEmailAuth(existingEmailAuth) == 0) {
            return CommonResult.FAILURE;
        }

        return CommonResult.SUCCESS;
    }


    public Enum<? extends IResult> register(UserEntity user, EmailAuthEntity emailAuth) {

        //이메일어스가 가진 이메일, 코드 ,솔트값 기준으로 새로운 이메일어스앤티티, 셀렉트해서 가져오기
        //2. 1에서 가녀종ㄴ 새로운 객체가 null이거나 이가 가진 isExpired()호출결과가 false이녁ㅇ우 registerResult.email_not_verified'를 결과로 반환하기. 없음으로 만들어야함
        //3,. user객체를 imembermapper객체의 insertuser메서드 호출시 전달인자로 하여 insert하기
        //4. 3의 결과가 0이면 comonresult.failure반환하기
        //5 위 과정 전체를 거친후 commonresult.success반환하기

        EmailAuthEntity existingEmailAuthEntity = this.memberMapper.selectEmailAuthByEmailCodeSalt(emailAuth.getEmail(), emailAuth.getCode(), emailAuth.getSalt());
        if (existingEmailAuthEntity == null || !existingEmailAuthEntity.isExpired()) {
            return RegisterResult.EMAIL_NOT_VERIFIED;
        }

        //유틸즈에 비밀번호 보냄
        user.setPassword(CryptoUtils.hashSha512(user.getPassword()));

        if (this.memberMapper.insertUser(user) == 0) {
            return CommonResult.FAILURE;
        }

        return CommonResult.SUCCESS;
    }

    @Transactional
    public Enum<? extends IResult> login(UserEntity user) {
        user.setPassword(CryptoUtils.hashSha512(user.getPassword()));
        UserEntity exising = this.memberMapper.selectUserLogin(user.getId(), user.getPassword());

        if (exising == null) {
            return CommonResult.FAILURE;
        }

        return CommonResult.SUCCESS;
    }

    @Transactional
    public UserEntity isAdminMode(UserEntity user) {
        return this.memberMapper.selectUserLogin(user.getId(), user.getPassword());
    }


    @Transactional
    public Enum<? extends IResult> recoverId(UserEntity user) {
        UserEntity exisingUser = this.memberMapper.selectUserByNameContact(user.getName(), user.getEmail());
        if (exisingUser == null) {
            return CommonResult.FAILURE;
        }
        user.setId(exisingUser.getId());

        return CommonResult.SUCCESS;
    }


    @Transactional//실패시 안보내겠다.
    public Enum<? extends IResult> recoverPasswordSend(EmailAuthVo emailAuthVo) throws MessagingException {

        UserEntity existingUser = this.memberMapper.selectUserByNameIdEmail(
                emailAuthVo.getName(), emailAuthVo.getId(), emailAuthVo.getEmail()
        );
        if (existingUser == null) {
            return CommonResult.FAILURE;
        }

        String authCode = RandomStringUtils.randomNumeric(6); //아파치 커먼 유틸즈 있어야 사용가능
        String authSalt = String.format("%s%s%f%f",
                authCode,
                emailAuthVo.getEmail(),
                Math.random(),
                Math.random());
        authSalt = CryptoUtils.hashSha512(authSalt);
        Date createdOn = new Date(); //현재 일시
        Date expiresOn = DateUtils.addMinutes(createdOn, 5); //5분미래
        emailAuthVo.setCode(authCode);
        emailAuthVo.setSalt(authSalt);
        emailAuthVo.setCreatedOn(createdOn);
        emailAuthVo.setExpiresOn(expiresOn);
        emailAuthVo.setExpired(false);

        if (this.memberMapper.insertEmailAuth(emailAuthVo) == 0) {
            return CommonResult.FAILURE;
        }

        Context context = new Context(); //서비스에서 html 파일갑이용하기 위해
        context.setVariable("code", emailAuthVo.getCode());
        context.setVariable("email", emailAuthVo.getEmail());
        context.setVariable("salt", emailAuthVo.getSalt());

        //메일보내기
        String text = this.templateEngine.process("member/recoverPasswordEmailAuth", context);
        MimeMessage mail = this.mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mail, "UTF-8");
        helper.setTo(emailAuthVo.getEmail());
        helper.setSubject("[BBQ몰] 비밀번호 재설정 인증 링크입니다.");
        helper.setText(text, true);
        this.mailSender.send(mail);

        return CommonResult.SUCCESS;
    }


    public Enum<? extends IResult> recoverPasswordCheck(EmailAuthEntity emailAuth) {
        EmailAuthEntity existingEmailAuth = this.memberMapper.selectEmailAuthByIndex(emailAuth.getIndex());
        if (existingEmailAuth == null || !existingEmailAuth.isExpired()) {

            return CommonResult.FAILURE;
        }

        emailAuth.setCode(existingEmailAuth.getCode());
        emailAuth.setSalt(existingEmailAuth.getSalt());
        return CommonResult.SUCCESS;
    }


    @Transactional
    public Enum<? extends IResult> recoverPasswordAuth(EmailAuthEntity emailAuth) {
//        int existingEmailAuth =  this.memberMapper.updateRecoverPasswordAuth(emailAuth.getEmail(),emailAuth.getCode(),emailAuth.getSalt());
        EmailAuthEntity existingEmailAuth = this.memberMapper.selectEmailAuthByEmailCodeSalt(emailAuth.getEmail(), emailAuth.getCode(), emailAuth.getSalt());


        if (existingEmailAuth == null || existingEmailAuth.getExpiresOn().compareTo(new Date()) < 0) {
            //new Date().compareTo(~~~.get~)와 같음 순서가 다름
            return CommonResult.FAILURE;
        }
        if (this.memberMapper.updateEmailAuth(existingEmailAuth) == 0) {
            return CommonResult.FAILURE;
        }
//        emailAuth.setExpired(true);
        this.memberMapper.updateRecoverPasswordAuth(emailAuth.getEmail(), emailAuth.getCode(), emailAuth.getSalt());
        return CommonResult.SUCCESS;


    }

    @Transactional
    public Enum<? extends IResult> recoverPassword(EmailAuthEntity emailAuth, UserEntity user) {

        EmailAuthEntity existingEmailAuth = this.memberMapper.selectEmailAuthByEmailCodeSalt(emailAuth.getEmail(), emailAuth.getCode(), emailAuth.getSalt());

        if (existingEmailAuth == null || !existingEmailAuth.isExpired()) {
            return CommonResult.FAILURE;
        }
//
        UserEntity existingUser = this.memberMapper.selectUserByEmail(existingEmailAuth.getEmail());


        existingUser.setPassword(CryptoUtils.hashSha512(user.getPassword()));

        if (this.memberMapper.updateUser(existingUser) == 0) {//user는 페스워드와 이메일만갖고잇음
            return CommonResult.FAILURE;
        }

        return CommonResult.SUCCESS;
    }


    @Transactional
    public Enum<? extends IResult> deleteUser(UserEntity user, WithdrawalEntity withdrawal ) {

        if (user == null) {
            return DeleteUserResult.NOT_SIGNED;
        }

        UserEntity existingUser = this.memberMapper.selectUserByEmail(user.getEmail());

        if (existingUser == null) {
            return DeleteUserResult.NO_SUCH_USER;
        }

        //삭제가 된다면
        if(this.memberMapper.deleteUserById(existingUser.getId()) > 0){
            //탈퇴 사유를 저장한다.
            withdrawal.setId(user.getId());

            switch (withdrawal.getReasonValue()){
                case 1:
                    withdrawal.setReasonCategory("배송 주문 불만");
                    break;
                case 2:
                    withdrawal.setReasonCategory("사이트 이용 불편");
                    break;
                case 3:
                    withdrawal.setReasonCategory("상품품질 불만족");
                    break;
                case 4:
                    withdrawal.setReasonCategory("서비스 불만족");
                    break;
                case 5:
                    withdrawal.setReasonCategory("기타");
                    break;

                default: break;
            }

            if(this.memberMapper.insertReason(withdrawal)>0){

                return CommonResult.SUCCESS;}
        }


        return CommonResult.FAILURE;


    }

    @Transactional
    public Enum<? extends IResult> updateUserInfo(UserEntity user, UserEntity userInfo) {

        if(user==null){
            return ModifyResult.NOT_SIGNED;
        }
        if(!user.getId().equals(userInfo.getId())){
            return ModifyResult.NOT_ALLOWED;
        }

        UserEntity existingUser = this.memberMapper.selectUserByEmail(userInfo.getEmail());
        if(existingUser==null){
            return DeleteResult.NO_SUCH_ARTICLE;
        }

        if(!userInfo.getPassword().equals("")){
            existingUser.setPassword(CryptoUtils.hashSha512(userInfo.getPassword()));
        }
        UserEntity existingContact = this.memberMapper.selectUserByContact(userInfo.getContact());

        System.out.println(existingContact+"번호");
        if(existingContact!=null){
            if(!existingContact.getId().equals(userInfo.getId())){
                return ModifyResult.CONTACT_DUPLICATED;
            }
        }
        existingUser.setName(userInfo.getName());
        existingUser.setContact(userInfo.getContact());
        existingUser.setBirth(userInfo.getBirth());
        existingUser.setAddressPostal(userInfo.getAddressPostal());
        existingUser.setAddressPrimary(userInfo.getAddressPrimary());
        existingUser.setAddressSecondary(userInfo.getAddressSecondary());


        return this.memberMapper.updateUser(existingUser)>0?CommonResult.SUCCESS:CommonResult.FAILURE;
    }

    public OrderEntity[] getOrder(UserEntity user) {

        return this.memberMapper.selectOrderById(user.getId());



    }


}