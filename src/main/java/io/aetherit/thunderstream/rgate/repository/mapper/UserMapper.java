package io.aetherit.thunderstream.rgate.repository.mapper;

import io.aetherit.thunderstream.rgate.model.RGateUser;
import io.aetherit.thunderstream.rgate.model.support.RGateUserType;

import java.util.List;

public interface UserMapper {
    RGateUser selectUser(String id);
    List<RGateUser> selectUsersWhereType(RGateUserType type);
    int insertUser(RGateUser account);
}
