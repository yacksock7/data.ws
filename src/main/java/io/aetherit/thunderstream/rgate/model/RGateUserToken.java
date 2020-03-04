package io.aetherit.thunderstream.rgate.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RGateUserToken {
    private String token;
    private RGateSimpleUser user;
}
