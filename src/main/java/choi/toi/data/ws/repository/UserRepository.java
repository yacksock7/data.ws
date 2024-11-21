package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.support.UserAuthType;
import choi.toi.data.ws.model.transfer.UserGroupTransfer;
import choi.toi.data.ws.repository.mapper.UserMapper;
import choi.toi.data.ws.model.User;
import choi.toi.data.ws.model.support.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {
    private UserMapper mapper;

    @Autowired
    public UserRepository(UserMapper mapper) {
        this.mapper = mapper;
    }


    public int insertUser(User user) {
        return mapper.insertUser(user);
    }

    public List<User> selectUsers() {
        return mapper.selectUsers();
    }

    public List<UserGroupTransfer> selectUserGroupTransfers(String keyword) {
        keyword = "%" + keyword + "%";
        return mapper.selectUserGroupTransfers(keyword);
    }

    public User selectUser(Long id) {
        return mapper.selectUserById(id);
    }

    public User selectUser(String email) { return mapper.selectUserByEmail(email);}

    public User selectUserByNickname(String nickname) { return mapper.selectUserByNickname(nickname);}

    public List<User> selectUsers(UserType type) {
        return mapper.selectUsersWhereType(type);
    }

    public void updateUser(User user) {
        mapper.updateUser(user);
    }
    public void updateUser(Long userId, UserAuthType authType) {
        mapper.updateUserAuthType(userId, authType);
    }
    public void updateUser(Long userId, String password) {
        mapper.updateUserPassword(userId, password);
    }

    public void deleteUser(Long userId) {
        mapper.deleteUser(userId);
    }
}
