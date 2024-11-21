package choi.toi.data.ws.repository.mapper;


import choi.toi.data.ws.model.UserProfile;

public interface UserProfileMapper {
    void insertUserProfile(UserProfile userProfile);
    UserProfile selectUserProfile(Long userId);
    void modifyUserProfile(UserProfile userProfile);
    void deleteUserProfile(Long userId);
}
