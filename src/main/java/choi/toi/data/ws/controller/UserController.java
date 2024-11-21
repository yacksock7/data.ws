package choi.toi.data.ws.controller;

import choi.toi.data.ws.model.User;
import choi.toi.data.ws.model.UserProfile;
import choi.toi.data.ws.model.transfer.UserGroupTransfer;
import choi.toi.data.ws.model.transfer.UserProfileTransfer;
import choi.toi.data.ws.service.UserAuthService;
import choi.toi.data.ws.service.UserProfileService;
import choi.toi.data.ws.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/users")
public class UserController {

    private UserService userService;
    private UserAuthService userAuthService;
    private UserProfileService userProfileService;

    public UserController(UserService userService,
                          UserAuthService userAuthService,
                          UserProfileService userProfileService) {
        this.userService = userService;
        this.userAuthService = userAuthService;
        this.userProfileService = userProfileService;
    }

    @Value("${data.ws.domain}")
    private String basicService;

//    @PostMapping
//    public void createUser(HttpServletRequest request,
//                           @RequestBody User user) {
//        userService.createNewUser(user);
//    }
    @PostMapping
    @Transactional
    public User createUser(HttpServletRequest request,
                           @RequestBody UserProfileTransfer userTransfer) {
        final User user = userService.createNewUserTransfer(userTransfer);
        userAuthService.sendSignUpEmail(user);

        return user;
    }

    @GetMapping("/{userId}/signup-email")
    public void sendSignUpEmail(HttpServletRequest request,
                                 @PathVariable Long userId) {
        final User user = userService.getUser(userId);
        userAuthService.sendSignUpEmail(user);
    }

    @GetMapping("/{userId}/password-email")
    public void sendPasswordEmail(HttpServletRequest request,
                                    @PathVariable Long userId) {
        final User user = userService.getUser(userId);
        userAuthService.sendPasswordEmail(user);
    }



    @GetMapping("/token/{token}/signup")
    public void authenticateToSignUp(HttpServletRequest request,
                                     HttpServletResponse response,
                                     @PathVariable String token ) {

        log.trace("authenticateToSignUp Start... token={}", token);
        userAuthService.authenticateSignUpToken(token);

        final String url = basicService + "/login";
        try {
            response.sendRedirect(url);
        } catch (IOException e) {
            log.warn("failed to redirect. url={}", url);
            log.warn("error={}", e);
        }
    }

    @GetMapping("/token/{token}/password")
    public void authenticateToChangePassword(HttpServletRequest request,
                                             HttpServletResponse response,
                                             @PathVariable String token ) {

        log.trace("authenticateToChangePassword Start... token={}", token);
        userAuthService.authenticatePasswordToken(token);

        final String url = basicService + "/password/" + token;
        try {
            response.sendRedirect(url);
        } catch (IOException e) {
            log.warn("failed to redirect. url={}", url);
            log.warn("error={}", e);
        }
    }

    @PutMapping("/token/{token}/password")
    public void modifyPassword(HttpServletRequest request,
                               HttpServletResponse response,
                               @PathVariable String token,
                               @RequestParam(value = "password") String password) {

        log.trace("modifyPassword Start... token={}", token);
        final Long userId = userAuthService.authenticatePasswordToken(token);
        userService.modifyUser(userId, password);

    }



    @GetMapping
    public List<UserGroupTransfer> getUserGroupTransfers(HttpServletRequest request,
                                                         @RequestParam(value="keyword", required=false, defaultValue="") String keyword) {
        return userService.getUserGroupTransfers(keyword);
    }

    @GetMapping("/{userId}")
    public User getUser(HttpServletRequest request,
                        @PathVariable Long userId) {
        return userService.getUser(userId);
    }
    @GetMapping("/email/{email}")
    public User getUserByEmail(HttpServletRequest request,
                        @PathVariable String email) {
        return userService.getUser(email);
    }

    @GetMapping("/nickname/{nickname}")
    public User getUserByNickname(HttpServletRequest request,
                               @PathVariable String nickname) {
        return userService.getUserByNickname(nickname);
    }

    @PutMapping
    public User modifyUser(HttpServletRequest request,
                           @RequestBody User user) {
        return userService.modifyUser(user);
    }

    @DeleteMapping("/{userId}")
    public void removeUser(HttpServletRequest request,
                           @PathVariable Long userId) {
        userService.removeUser(userId);
    }

    @PostMapping("/modify")
    public void modifyUserProfile(HttpServletRequest request,
                               HttpServletResponse response,
                               @RequestParam(value = "userId") Long userId,
                               @RequestParam(value = "email") String email,
                               @RequestParam(value = "nickname") String nickname,
                               @RequestParam(value = "userProfile") UserProfile userProfile) {
        userService.modifyUserProfile(userId, email, nickname);
        userProfileService.modifyUserProfile(userProfile);
    }

//
//    // 비밀번호 찾기 본인 인증 수단 선택
//    @PostMapping("/password/{email}")
//    public void showVerifyGuide(HttpServletRequest request,
//                                                     @PathVariable(value = "email") String email) {
//
//        final User user =
//        final boolean isAuth = user != null;
//
//        final UserFindPwRequestTransfer userFindDto =
//                UserFindPwRequestTransfer.builder()
//                        .id(userId)
//                        .name(name)
//                        .userCheck(isAuth)
//                        .build();
//
//        return userFindDto;
//    }
}
