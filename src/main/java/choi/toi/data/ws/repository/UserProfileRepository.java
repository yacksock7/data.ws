package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.UserProfile;
import choi.toi.data.ws.repository.mapper.UserProfileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserProfileRepository {

    private UserProfileMapper userProfileMapper;

    @Autowired
    public UserProfileRepository(UserProfileMapper userProfileMapper) {
        this.userProfileMapper = userProfileMapper;
    }


    public void insertUserProfile(UserProfile userProfile) {
        userProfileMapper.insertUserProfile(userProfile);
    }

    public UserProfile selectUserProfile(Long userId) {
        return userProfileMapper.selectUserProfile(userId);
    }

    public void updateUserProfile(UserProfile userProfile) {
        userProfileMapper.modifyUserProfile(userProfile);
    }

    public void deleteUserProfile(Long userId) {
        userProfileMapper.deleteUserProfile(userId);
    }

}
