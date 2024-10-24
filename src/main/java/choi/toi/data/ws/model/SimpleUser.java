package choi.toi.data.ws.model;

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

    private String id;
    private String email;
    private String nickname;
    private UserType type;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
