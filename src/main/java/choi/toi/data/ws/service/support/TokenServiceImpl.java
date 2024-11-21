package choi.toi.data.ws.service.support;

import choi.toi.data.ws.exception.ErrorCode;
import choi.toi.data.ws.exception.ServiceException;
import choi.toi.data.ws.model.transfer.JwkTransfer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TokenServiceImpl implements TokenService {

    public final static long TOKEN_VALIDATION_SECOND = 1000L * 10;
    public final static long REFRESH_TOKEN_VALIDATION_SECOND = 1000L * 60 * 24 * 2;

    private final JwkService jwkService;

    @Override
    public Claims extract(String token) throws ExpiredJwtException {
        List<JwkTransfer> jwks = jwkService.findKeyAvailableForValidating();
        for(JwkTransfer jwk : jwks) {
            try {
                return Jwts.parserBuilder()
                        .setSigningKey(jwk.getKeyPair().getPrivate())
                        .build()
                        .parseClaimsJws(token)
                        .getBody();
            } catch (ExpiredJwtException expiredJwtException) {
                throw new ServiceException(ErrorCode.ExpiredToken, "token time expired");
            } catch (Exception exception) {
            }
        }
        throw new ServiceException(ErrorCode.CanNotValidateToken, "Can not validate token.");
    }

    @Override
    public boolean isExpired(String token) {
        final Date expiration = extract(token).getExpiration();
        return expiration.before(new Date());
    }

    @Override
    public String generate(Claims claims, long expireTime) {
        JwkTransfer jwk = jwkService.findKeyAvailableForIssuing();
        return Jwts.builder().setHeaderParam("kid", "" + jwk.getId())
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(jwk.getKeyPair().getPrivate(), SignatureAlgorithm.RS256)
                .compact();
    }
}
