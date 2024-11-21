package choi.toi.data.ws.model.transfer;

import choi.toi.data.ws.model.UserProfile;
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
public class UserProfileTransfer {
    private Long id;
    private String email;
    private String password;
    private String nickname;
    private UserType type;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
    private UserProfile userProfile;
}
