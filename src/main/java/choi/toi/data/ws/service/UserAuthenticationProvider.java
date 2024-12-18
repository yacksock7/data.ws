package choi.toi.data.ws.service;

import choi.toi.data.ws.model.SimpleUser;
import choi.toi.data.ws.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class UserAuthenticationProvider implements AuthenticationProvider {
    private UserService userService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserAuthenticationProvider(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication request) throws AuthenticationException {

        Assert.isInstanceOf(UsernamePasswordAuthenticationToken.class, request, "Only UsernamePasswordAuthenticationToken is supported");

        final String email = (String) request.getPrincipal();
        final String password = (String) request.getCredentials();

        final User user = userService.getUser(email);
        if(user == null) {
            throw new UsernameNotFoundException("Username not found : " + email);
        }

        UsernamePasswordAuthenticationToken result = null;
        if ((password != null) && (password.length() > 0) && (passwordEncoder.matches(password, user.getPassword()))) {

            final List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(user.getType().name()));

            SimpleUser simpleUser = SimpleUser.convert(user);
            result = new UsernamePasswordAuthenticationToken(email, password, authorities);
            result.setDetails(simpleUser);

        } else {
            throw new BadCredentialsException("Bad credentials");
        }

        return result;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(aClass);
    }
}
