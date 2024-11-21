package choi.toi.data.ws.service;

import choi.toi.data.ws.exception.ErrorCode;
import choi.toi.data.ws.exception.ServiceException;
import choi.toi.data.ws.model.UserProfile;
import choi.toi.data.ws.model.support.UserAuthType;
import choi.toi.data.ws.model.support.UserType;
import choi.toi.data.ws.model.transfer.UserGroupTransfer;
import choi.toi.data.ws.model.transfer.UserProfileTransfer;
import choi.toi.data.ws.repository.UserProfileRepository;
import choi.toi.data.ws.repository.UserRepository;
import choi.toi.data.ws.model.User;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
public class UserService {

    private static final String DEFAULT_ADMIN_EMAIL = "admin@data.ws";
    private static final String DEFAULT_ADMIN_PASSWORD = "1234";
    private static final String DEFAULT_ADMIN_NICKNAME = "administrator";
    private static final Map<String, Boolean> notAcceptableIdMap = new HashMap<>();
    static {
        notAcceptableIdMap.put("check", false);
        notAcceptableIdMap.put("signin", false);
        notAcceptableIdMap.put("signout", false);
        notAcceptableIdMap.put("signcheck", false);
        notAcceptableIdMap.put("login", false);
        notAcceptableIdMap.put("logout", false);
        notAcceptableIdMap.put("logincheck", false);
    }


    private UserRepository repository;
    private UserProfileRepository userProfileRepository;
    private PasswordEncoder passwordEncoder;
    private ModelMapper modelMapper;

    @Autowired
    public UserService(UserRepository repository,
                       UserProfileRepository userProfileRepository,
                       PasswordEncoder passwordEncoder,
                       ModelMapper modelMapper) {
        this.repository = repository;
        this.userProfileRepository = userProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    @PostConstruct
    public void checkAdmin() {
        final List<User> users = getUsers(UserType.Admin);

        if((users == null) || (users.size() < 1)) {
            log.info("Admin account not exists : create a default admin account");

            final User newAdmin = User.builder()
                    .email(DEFAULT_ADMIN_EMAIL)
                    .password(DEFAULT_ADMIN_PASSWORD)
                    .nickname(DEFAULT_ADMIN_NICKNAME)
                    .type(UserType.Admin)
                    .authType(UserAuthType.AUTHENTICATED)
                    .build();
            createNewUser(newAdmin);

            final User mtUser = User.builder()
                    .email("MT@data.ws")
                    .password("1234")
                    .nickname("MT")
                    .type(UserType.System)
                    .authType(UserAuthType.AUTHENTICATED)
                    .build();
            createNewUser(mtUser);

            final User testUser001 = User.builder()
                    .email("user001@data.ws")
                    .password("1234")
                    .nickname("User001")
                    .type(UserType.User)
                    .authType(UserAuthType.AUTHENTICATED)
                    .build();
            createNewUser(testUser001);

            final User testUser002 = User.builder()
                    .email("user002@data.ws")
                    .password("1234")
                    .nickname("User002")
                    .type(UserType.User)
                    .authType(UserAuthType.AUTHENTICATED)
                    .build();
            createNewUser(testUser002);

            final User testUser003 = User.builder()
                    .email("user003@data.ws")
                    .password("1234")
                    .nickname("User003")
                    .type(UserType.User)
                    .authType(UserAuthType.AUTHENTICATED)
                    .build();
            createNewUser(testUser003);
        }
    }

    public User createNewUser(User user) {
        if(isNotAcceptableId(user.getEmail())) {
            throw new ServiceException(ErrorCode.NotAcceptableId, "Not acceptable id : " + user.getId());
        }
        final String encodedPassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);
        repository.insertUser(user);

        return user;
    }

    @Transactional
    public User createNewUserTransfer(UserProfileTransfer userProfileTransfer) {
        final User user = modelMapper.map(userProfileTransfer, User.class);
        user.setAuthType(UserAuthType.NOTAUTHENTICATED);
        createNewUser(user);

        final UserProfile userProfile = userProfileTransfer.getUserProfile();
        userProfile.setUserId(user.getId());
        userProfileRepository.insertUserProfile(userProfile);

        return user;
    }

    public List<User> getUsers() {
        return repository.selectUsers();
    }
    public List<UserGroupTransfer> getUserGroupTransfers(String keyword) {
        return repository.selectUserGroupTransfers(keyword);
    }

    public User getUser(Long id) {
        return repository.selectUser(id);
    }

    public User getUser(String email) {
        return repository.selectUser(email);
    }

    public User getUserByNickname(String nickname) {
        final User user = repository.selectUserByNickname(nickname);
        return user;
    }

    public List<User> getUsers(UserType type) {
        return repository.selectUsers(type);
    }


    public User modifyUser(User user) {
        log.trace("modifyUser Start... user={}", user);

        repository.updateUser(user);
        return getUser(user.getId());
    }

    public void modifyUser(Long userId, String password) {
        log.trace("modifyUserPassword Start... userId={}, password={}", userId, password);
        final String encodedPassword = passwordEncoder.encode(password);
        repository.updateUser(userId, encodedPassword);
    }

    public void removeUser(Long userId) {
        log.trace("removeUser Start... userId={}", userId);

        repository.deleteUser(userId);
    }

    public void modifyUserProfile(Long userId, String email,String nickname ) {
        log.trace("modifyUserProfile Start... userId={}, email={}, nickname={}", userId, email, nickname);
        if((Objects.equals(email, "") || email == null )&&(Objects.equals(nickname, "") || nickname == null)){
            return;
        }
        User user = repository.selectUser(userId);
        if(Objects.equals(email, "") || email == null){
            user.setEmail(email);
        }
        if(Objects.equals(nickname, "") || nickname == null){
            user.setNickname(nickname);
        }
        repository.updateUser(user);
    }

    private boolean isNotAcceptableId(String id) {
        boolean isNotAcceptable = false;

        if((id == null) || (id.length() < 1) || (id.contains(" ")) || (notAcceptableIdMap.containsKey(id.toLowerCase()))) {
            isNotAcceptable = true;
        }

        return isNotAcceptable;
    }
}
