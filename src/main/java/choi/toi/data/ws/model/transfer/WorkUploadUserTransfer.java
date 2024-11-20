package choi.toi.data.ws.model.transfer;

import choi.toi.data.ws.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkUploadUserTransfer {
    private Long workId;
    private Long userId;
    private Integer viewingOrder;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
    private User user;
}
