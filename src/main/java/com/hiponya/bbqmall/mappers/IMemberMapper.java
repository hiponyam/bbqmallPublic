package com.hiponya.bbqmall.mappers;


import com.hiponya.bbqmall.entities.member.EmailAuthEntity;
import com.hiponya.bbqmall.entities.member.UserEntity;
import com.hiponya.bbqmall.entities.member.WithdrawalEntity;
import com.hiponya.bbqmall.entities.product.OrderEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.core.annotation.Order;

@Mapper
public interface IMemberMapper {


    EmailAuthEntity selectEmailAuthByEmailCodeSalt(@Param(value = "email") String email,
                                                   @Param(value = "code") String code,
                                                   @Param(value = "salt") String salt); //@파람 타입이 있기때문에 xml파일에서 파라매터 타입을 적지 않는다.
    UserEntity selectUserByEmail(@Param(value = "email") String email);
    //  UserEntity selectUserByEmail(UserEntity user);

    OrderEntity[] selectOrderById(@Param(value = "id") String id);


    int insertEmailAuth(EmailAuthEntity emailAuthEntity);


    int insertUser(UserEntity user);

    UserEntity selectUserLogin(@Param(value = "id") String id,
                               @Param(value = "password") String password);


    int updateEmailAuth(EmailAuthEntity emailAuth);

    UserEntity selectUserByNameContact(@Param(value = "name") String name,
                                       @Param(value = "email") String email);
    UserEntity selectUserByContact(@Param(value = "contact") String contact);

    UserEntity selectUserByNameIdEmail(@Param(value = "name") String name,
                                       @Param(value = "id") String id,
                                       @Param(value = "email") String email);

    int updateRecoverPasswordAuth(@Param(value = "email") String email,
                                  @Param(value = "code") String code,
                                  @Param(value = "salt") String salt);

    EmailAuthEntity selectEmailAuthByIndex(@Param(value = "index") int index);


    int updateUser(UserEntity user);

    int deleteUserById(@Param(value = "id") String id);

    int insertReason(WithdrawalEntity withdrawal);
}