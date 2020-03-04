package io.aetherit.thunderstream.rgate.model;

import io.aetherit.thunderstream.rgate.model.support.RGateUserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RGateUser {
    private String id;
    private String password;
    private String name;
    private RGateUserType type;
    private boolean isEnabled;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
