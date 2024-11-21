package choi.toi.data.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {
    private Long userId;
    private Long avatarImageObject;
    private String name;
    private String gender;
    private LocalDateTime birth;
    private String organization;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
