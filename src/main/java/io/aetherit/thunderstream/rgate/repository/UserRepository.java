package io.aetherit.thunderstream.rgate.repository;

import io.aetherit.thunderstream.rgate.model.RGateUser;
import io.aetherit.thunderstream.rgate.model.support.RGateUserType;
import io.aetherit.thunderstream.rgate.repository.mapper.UserMapper;
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

    public RGateUser selectUser(String id) {
        return mapper.selectUser(id);
    }

    public List<RGateUser> selectUsers(RGateUserType type) {
        return mapper.selectUsersWhereType(type);
    }

    public int insertUser(RGateUser user) {
        return mapper.insertUser(user);
    }
}
