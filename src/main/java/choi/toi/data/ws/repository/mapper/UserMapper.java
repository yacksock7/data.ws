package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.User;
import choi.toi.data.ws.model.support.UserAuthType;
import choi.toi.data.ws.model.support.UserType;
import choi.toi.data.ws.model.transfer.UserGroupTransfer;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {


    int insertUser(User account);
    List<User> selectUsers();
    List<UserGroupTransfer> selectUserGroupTransfers(String keyword);
    User selectUserById(Long userId);
    User selectUserByEmail(String email);
    User selectUserByNickname(String nickname);
    List<User> selectUsersWhereType(UserType type);
    void updateUser(User user);
    void updateUserAuthType(@Param("userId") Long userId, @Param("authType") UserAuthType authType);
    void updateUserPassword(@Param("userId") Long userId, @Param("password") String password);
    void deleteUser(Long userId);
}
