package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.User;
import choi.toi.data.ws.model.support.UserType;

import java.util.List;

public interface UserMapper {
    User selectUser(Long id);
    User selectUserByEmail(String email);
    List<User> selectUsersWhereType(UserType type);
    int insertUser(User account);
}
