package choi.toi.data.ws.model.transfer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class JobStepTaskWorkerTransfer {
    private Long jobId;
    private Integer jobStepNum;
    private Integer jobStepTaskNum;
    private Long userId;
    private String email;
    private String nickname;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

}
