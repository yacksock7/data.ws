package choi.toi.data.ws.repository;

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

    public User selectUser(Long id) {
        return mapper.selectUser(id);
    }
    public User selectUser(String email) {
        return mapper.selectUserByEmail(email);
    }

    public List<User> selectUsers(UserType type) {
        return mapper.selectUsersWhereType(type);
    }

    public int insertUser(User user) {
        return mapper.insertUser(user);
    }
}
