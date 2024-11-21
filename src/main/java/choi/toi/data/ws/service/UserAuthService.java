package choi.toi.data.ws.service;

import choi.toi.data.ws.model.User;
import choi.toi.data.ws.model.support.MailType;
import choi.toi.data.ws.model.support.UserAuthType;
import choi.toi.data.ws.repository.UserRepository;
import choi.toi.data.ws.service.support.TokenService;
import choi.toi.data.ws.util.MailSenderUsingOCI;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class UserAuthService {

    private UserRepository userRepository;
    private TokenService tokenService;
    private MailSenderUsingOCI mailUtil;
    private ObjectMapper objectMapper;

    @Autowired
    public UserAuthService(UserRepository userRepository,
                           TokenService tokenService,
                           MailSenderUsingOCI mailUtil,
                           ObjectMapper objectMapper) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.mailUtil = mailUtil;
        this.objectMapper = objectMapper;
    }

    @Value("${data.ws.domain}")
    private String domain;

    public void sendSignUpEmail(User user) {
        final MailType mailType = MailType.JoinMail;
        final String token = generateToken(user, mailType);
        final String url = this.domain + "/api/v1/users/token/" + token +"/signup";

        Map<String, String> map = new HashMap<>();
        map.put("url", url);

        try {
            mailUtil.sendMessage(user.getEmail(), mailType, map);
        } catch (Exception e) {
            log.error("sendSignUpEmail Failed!! error : {}", e);
        }
    }

    public void sendPasswordEmail(User user) {
        final MailType mailType = MailType.ChangePasswordMail;
        final String token = generateToken(user, mailType);

        final String url = this.domain + "/api/v1/users/token/" + token +"/password";

        Map<String, String> map = new HashMap<>();
        map.put("url", url);

        try {
            mailUtil.sendMessage(user.getEmail(), mailType, map);
        } catch (Exception e) {
            log.error("sendSignUpEmail Failed!! error : {}", e);
        }
    }

    public void authenticateSignUpToken(String token) {
        final boolean isExpired = tokenService.isExpired(token);
        if (!isExpired) {
            final Claims claims = tokenService.extract(token);
            final Long userId = Double.valueOf(claims.get("id").toString()).longValue();
            userRepository.updateUser(userId, UserAuthType.AUTHENTICATED);
        }
    }

    public Long authenticatePasswordToken(String token) {
        final boolean isExpired = tokenService.isExpired(token);
        if (!isExpired) {
            final Claims claims = tokenService.extract(token);
            final Long userId = Double.valueOf(claims.get("id").toString()).longValue();
            return userId;
        } else {
            return null;
        }
    }

    public String generateToken(User user, MailType mailType) {

        Map<String, Object> payload = new HashMap<>();

        payload.put(Claims.ISSUER, "basic.ws");
        payload.put(Claims.SUBJECT, mailType);
        payload.put("id", user.getId());
        payload.put("email", user.getEmail());

        Claims claims = Jwts.claims(payload);

        return tokenService.generate(claims, 24 * 60 * 60 * 1000L);
    }
}
