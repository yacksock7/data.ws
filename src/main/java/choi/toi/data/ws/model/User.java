package choi.toi.data.ws.model;

import choi.toi.data.ws.model.support.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String id;
    private String email;
    private String password;
    private String nickname;
    private UserType type;
    private String authType;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
