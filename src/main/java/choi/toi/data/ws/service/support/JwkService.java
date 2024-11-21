package choi.toi.data.ws.service.support;

import choi.toi.data.ws.model.Jwk;
import choi.toi.data.ws.model.RsaPublicKey;
import choi.toi.data.ws.model.support.JwkStatusType;
import choi.toi.data.ws.model.transfer.JwkTransfer;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.KeyUse;
import com.nimbusds.jose.jwk.RSAKey;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class JwkService {
    private static final int KEY_SIZE = 2048;
    private final String PRIVATE_KEY = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCeHX6Xr/yU3YBV758KHrBE+EEsYMtDznR4WFNdRpPqd9TZrWW7TVMBDltRSe4Hs32sr70p4AoPO2CgEJDfHegKkQu+oGA3EbDmSa8+cpgpETZx+E4Ep/FTRsD2g+UG2tgOgOIuwYgFRThfa/PgFVtO0k1iY0x3JejTw0QCf6scZukWxck59unc17F/H1mIvIWDpESaF/tQdATPg+/VCodrBW1hd0U9S8ZyxchlEkrZB+iG8qnMwNY65PNvg38rz5dA/kh/7yY3EXI0L9s7QNcQGO/TmfgcyySkJ3azUmfIiVVKdvOiEtNIPCyCrM0Qva1IwBarzvHa9U35+vdbjl8fAgMBAAECggEAB7S0SLxA+RhaetW00I9yU8otkvYcse9L6dmUJoWcC99PNlSnEpvQIcsLVEjgGuv6ggIGnBXZJ6jjKqnkBZu1hV5QTjgOuGBaWL7alZaMJ+Q43REW7E8rCb33BYykCtN7mClb3J99+5PGDZB7UD56Nrs1Hkhsn5nvYPKxS9XhBv9BRiBzl9kpzslseuJ53Xm5+xYWZ/sCywB0QH8B+RL0y/8AMO/O16zbZcyEfKxrGgyhIcTaLSJS8cEr2NJincTFJg/iPx4dbJ0cKWSAQ5WaRBLPBjEIm8aSEd78Rloiwia9U8kF/eseEte/awLrvlbSqMnK1AwW11keB+fIEAr7AQKBgQDdInj36WnvtWi0OhTGq9wJbP/aPegu4PD9HNIbgw05H+JYzBVIV/yyZdr1a7hjowIwjV19kFgrsd8NNohgl+bHhP1nRzCQu38VCDAeH1gIDjO4F4Ukp15krQtttMzJWCgLrdJqG+JXYKVGjCycOQJeeZPvKZH3IJdAgLZW664mQQKBgQC3C2fFRKC4wWI5W5EqgtIZ61sJ2ozfB4mAfQ2k3WBhxhqRyITKcUZ/FCM6HLR9sh3UUPKh5c5zYrOycjCLaNZ2s2y8wM+IR5duca02IQy6WsasMWqu2GVjb7szr/EXcWHPa7kS04aQ6D62SvO0/VteOrKtX2Ei2SX/SQhbM4TtXwKBgCqiCcZqBtWDGQOeKwE+gvaCQDV4N/pJvcxesRdCxdrcjcvm1LeU1xAh2Pv135+9/p8TshGSMZ2C9mjauaI9xu1yc1RlAjT1IQQSBwzXqCYtbsUwK6gsaGNqhUiKUe0DhPzzbxyr8ZA8/sBCKBuaVh2WvPGgBxco/mAeMIlDeNjBAoGAcVFCQMGnrjkqEdA6IlMytpEZnxQJudj0qvLAC5xxGpaFxFKawqk1t15EIKm8o0Qta09hphCaqpwkGwjOPL/+ZSXW31OOJxQLD3iYfrYfJw8jh15gaTXWLqTxA6KcYqLypnJN9PW2jOb6S+hCz305nzA/hU1S2TwNZelUnwFZ/YkCgYBc1h9F+r/S67bJoPKLcO0hchXWlvcZcDYXeMQ0BC+i92fsVU5Lmc63mJlgE2rag+Cx+nMv4ubt7hHll32j5aJs0Qc09rHTgTEwb77qcg+7n8z6MUyhcFNJOW1ZxWSTt0vYtRVDUWGNjdTlqCA91TsJHtRFmLBs8PWfjcaQswNiyg==";
    private final String PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnh1+l6/8lN2AVe+fCh6wRPhBLGDLQ850eFhTXUaT6nfU2a1lu01TAQ5bUUnuB7N9rK+9KeAKDztgoBCQ3x3oCpELvqBgNxGw5kmvPnKYKRE2cfhOBKfxU0bA9oPlBtrYDoDiLsGIBUU4X2vz4BVbTtJNYmNMdyXo08NEAn+rHGbpFsXJOfbp3Nexfx9ZiLyFg6REmhf7UHQEz4Pv1QqHawVtYXdFPUvGcsXIZRJK2QfohvKpzMDWOuTzb4N/K8+XQP5If+8mNxFyNC/bO0DXEBjv05n4HMskpCd2s1JnyIlVSnbzohLTSDwsgqzNEL2tSMAWq87x2vVN+fr3W45fHwIDAQAB";
    private final LocalDate EXPIRED_DATE = LocalDate.parse("2223-03-02", DateTimeFormatter.ISO_DATE);
    private final JwkStatusType STATUS = JwkStatusType.ENABLE;

    public JwkTransfer findKeyAvailableForIssuing() {
        final Jwk key = getJwk();
        return new JwkTransfer(key);
    }

    private Jwk getJwk() {
        return Jwk.builder()
                .id(1L)
                .privateKey(PRIVATE_KEY)
                .publicKey(PUBLIC_KEY)
                .issuingExpiredAt(EXPIRED_DATE)
                .validatingExpiredAt(EXPIRED_DATE)
                .status(STATUS)
                .build();
    }

    public List<JwkTransfer> findKeyAvailableForValidating() {

        final JwkTransfer jwkTransfer = findKeyAvailableForIssuing();
        final List<JwkTransfer> jwkTransfers = new ArrayList<>();
        jwkTransfers.add(jwkTransfer);

        return jwkTransfers;
    }
//
//    public Jwk createNewKey() {
//        try {
//            SecureRandom secureRandom = new SecureRandom();
//            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
//            keyPairGenerator.initialize(KEY_SIZE, secureRandom);
//            KeyPair keyPair = keyPairGenerator.genKeyPair();
//
//            PublicKey publicKey = keyPair.getPublic();
//            PrivateKey privateKey = keyPair.getPrivate();
//
//            String stringPublicKey = Base64.getEncoder().encodeToString(publicKey.getEncoded());
//            String stringPrivateKey = Base64.getEncoder().encodeToString(privateKey.getEncoded());
//
//            Jwk key = new Jwk();
//            key.setPrivateKey(stringPrivateKey);
//            key.setPublicKey(stringPublicKey);
//            key.setIssuingExpiredAt(LocalDate.now().plusYears(1));
//            key.setValidatingExpiredAt(LocalDate.now().plusYears(1));
//            key.setStatus(JwtStatusType.ENABLE);
//            return jwkRepository.save(key);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return null;
//    }


    public List<RsaPublicKey> getRsaPublicKeys() {

        findKeyAvailableForIssuing();
        List<JwkTransfer> keyAvailableForValidating = findKeyAvailableForValidating();

        List<RsaPublicKey> result = keyAvailableForValidating.stream().map(k -> {
            PublicKey pub = k.getKeyPair().getPublic();
            RSAKey.Builder builder = new RSAKey.Builder((RSAPublicKey) pub)
                    .keyUse(KeyUse.SIGNATURE)
                    .algorithm(JWSAlgorithm.RS256)
                    .keyID("" + k.getId());

            RSAKey publicKey = builder.build();

            RsaPublicKey rsaPublicKey = RsaPublicKey.builder()
                    .alg(publicKey.getAlgorithm().getName())
                    .e(publicKey.getPublicExponent().toString())
                    .n(publicKey.getModulus().toString())
                    .kty(publicKey.getKeyType().toString())
                    .kid(publicKey.getKeyID())
                    .use(publicKey.getKeyUse().toString())
                    .build();

            return rsaPublicKey;
        }).collect(Collectors.toList());

        return result;
    }
}
