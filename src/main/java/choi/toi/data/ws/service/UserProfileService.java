package choi.toi.data.ws.service;

import choi.toi.data.ws.model.UserProfile;
import choi.toi.data.ws.repository.UserProfileRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserProfileService {

    private UserProfileRepository userProfileRepository;

    @Autowired
    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }


    public void createUserProfile(UserProfile userProfile) {
        userProfileRepository.insertUserProfile(userProfile);
    }

    public UserProfile getUserProfile(Long userId) {
        return userProfileRepository.selectUserProfile(userId);
    }

    public UserProfile modifyUserProfile(UserProfile userProfile) {
        userProfileRepository.updateUserProfile(userProfile);
        return getUserProfile(userProfile.getUserId());
    }

    public void removeUserProfile(Long userId) {
        userProfileRepository.deleteUserProfile(userId);
    }




}
