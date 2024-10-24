package choi.toi.data.ws.controller;

import choi.toi.data.ws.exception.ServiceException;
import choi.toi.data.ws.exception.ErrorCode;
import choi.toi.data.ws.model.SimpleUser;
import choi.toi.data.ws.model.User;
import choi.toi.data.ws.model.UserToken;
import choi.toi.data.ws.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1/authentications/")
public class AuthenticationController {
    private AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signin")
    public ResponseEntity<UserToken> getLoginToken(HttpServletRequest httpRequest, HttpSession session, @RequestBody User account) {
        final UserToken token = authenticationService.getToken(account.getId(), account.getPassword(), session);

        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/signout")
    public ResponseEntity logout(HttpServletRequest httpRequest, HttpServletResponse resp) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null){
            new SecurityContextLogoutHandler().logout(httpRequest, resp, auth);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/signcheck")
    public ResponseEntity<SimpleUser> check(HttpServletRequest httpRequest) {
        final SimpleUser user = authenticationService.getUser();

        if(user == null) {
            throw new ServiceException(ErrorCode.CanNotFoundUser, "Can not found a user");
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
