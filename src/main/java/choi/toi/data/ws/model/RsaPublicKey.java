package choi.toi.data.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder(toBuilder = true)
@Getter
@AllArgsConstructor
public class RsaPublicKey {
    private String alg; // algorithm
    private String e; // publicExponent
    private String n; //modulus
    private String kty; // keyType
    private String kid; // keyId
    private String use; // keyUse
}
