package choi.toi.data.ws.service.support;

import io.jsonwebtoken.Claims;

/**
 * Authorization code를 임의로 발급하기 위한 서비스 클래스
 */
public interface TokenService {
    String generate(Claims claims, long expireTime);
    boolean isExpired(String token);
    Claims extract(String token);
}
