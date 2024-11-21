package choi.toi.data.ws.model.transfer;

import choi.toi.data.ws.model.Group;
import choi.toi.data.ws.model.support.UserAuthType;
import choi.toi.data.ws.model.support.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserGroupTransfer {
    private Long id;
    private String email;
    private String password;
    private String nickname;
    private UserType type;
    private UserAuthType authType;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
    private List<Group> groups;
}
