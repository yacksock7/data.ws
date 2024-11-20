package choi.toi.data.ws.model;

import choi.toi.data.ws.model.support.UserAuthType;
import choi.toi.data.ws.model.support.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimpleUser implements Serializable {
    public static final long serialVersionUID = 1L;

    private Long id;
    private String email;
    private String nickname;
    private UserType type;
    private UserAuthType authType;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;


    public static SimpleUser convert(User user) {
        return SimpleUser.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .type(user.getType())
                .authType(user.getAuthType())
                .createdDatetime(user.getCreatedDatetime())
                .updatedDatetime(user.getUpdatedDatetime())
                .build();
    }
}
