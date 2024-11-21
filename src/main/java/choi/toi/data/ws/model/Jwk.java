package choi.toi.data.ws.model;

import choi.toi.data.ws.model.support.JwkStatusType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Jwk {
    private Long id;
    private String description;
    private String privateKey;
    private String publicKey;
    private LocalDate issuingExpiredAt;
    private LocalDate validatingExpiredAt;
    private LocalDate createdAt;
    private LocalDate modifiedAt;
    private JwkStatusType status;
}
