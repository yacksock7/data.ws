package choi.toi.data.ws.model.transfer;

import choi.toi.data.ws.model.Jwk;
import choi.toi.data.ws.model.support.JwkStatusType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.time.LocalDate;
import java.util.Base64;

@NoArgsConstructor
@Setter
@Getter
public class JwkTransfer {

    private Long id;

    private String privateKey;

    private String publicKey;

    private String description;

    private LocalDate issuingExpiredAt;

    private LocalDate validatingExpiredAt;

    private JwkStatusType status;

    private KeyPair keyPair;

    public JwkTransfer(Jwk jwk) {
        id = jwk.getId();
        privateKey = jwk.getPrivateKey();
        publicKey = jwk.getPublicKey();
        description = jwk.getDescription();
        issuingExpiredAt = jwk.getIssuingExpiredAt();
        validatingExpiredAt = jwk.getValidatingExpiredAt();
        status = jwk.getStatus();
        keyPair = createKeyPair();
    }

    public KeyPair createKeyPair() {
        try {
            return new KeyPair(getPublicKeyFromString(publicKey), getPrivateKeyFromString(privateKey));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (InvalidKeySpecException e) {
            e.printStackTrace();
        }
        return null;
    }

    private PublicKey getPublicKeyFromString(String keystring) throws NoSuchAlgorithmException, InvalidKeySpecException {
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        byte[] bytePublicKey = Base64.getDecoder().decode(keystring.getBytes());
        X509EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(bytePublicKey);
        return keyFactory.generatePublic(publicKeySpec);
    }

    private PrivateKey getPrivateKeyFromString(String keystring) throws NoSuchAlgorithmException, InvalidKeySpecException {
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        byte[] bytePrivateKey = Base64.getDecoder().decode(keystring.getBytes());
        PKCS8EncodedKeySpec privateKeySpec = new PKCS8EncodedKeySpec(bytePrivateKey);
        return keyFactory.generatePrivate(privateKeySpec);
    }
}
