package choi.toi.data.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class JobStepTaskWorker {
    private Long jobId;
    private Integer jobStepNum;
    private Integer jobStepTaskNum;
    private Long userId;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

    private User user;
}
