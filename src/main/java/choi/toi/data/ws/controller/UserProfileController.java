package choi.toi.data.ws.controller;

import choi.toi.data.ws.model.UserProfile;
import choi.toi.data.ws.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/users")
public class UserProfileController {

    private UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @PostMapping("/profiles")
    public void createUserProfile(HttpServletRequest request,
                                  @RequestBody UserProfile userProfile) {
        userProfileService.createUserProfile(userProfile);
    }

    @GetMapping("/profiles/{userId}")
    public UserProfile getUserProfile(HttpServletRequest request,
                                      @PathVariable Long userId) {
        return  userProfileService.getUserProfile(userId);
    }

    @PutMapping("/profiles")
    public UserProfile modifyUserProfile(HttpServletRequest request,
                                         @RequestBody UserProfile userProfile) {
        return userProfileService.modifyUserProfile(userProfile);
    }

    @DeleteMapping("/profiles/{userId}")
    public void removeUserProfile(HttpServletRequest request,
                                  @PathVariable Long userId){
        userProfileService.removeUserProfile(userId);
    }

}
