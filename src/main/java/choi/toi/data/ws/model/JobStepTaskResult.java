package choi.toi.data.ws.model;

import choi.toi.data.ws.model.support.JobStepResultType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class JobStepTaskResult {
    private Long id;
    private Long jobId;
    private Integer jobStepNum;
    private Integer jobStepTaskNum;
    private Long userId;
    private Integer index;
    private JobStepResultType resultType;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

    private JobStepTaskText jobStepTaskText;
    private JobStepTaskAudio jobStepTaskAudio;
    private JobStepTaskTag jobStepTaskTag;

}
