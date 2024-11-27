package choi.toi.data.ws.model;

import choi.toi.data.ws.model.support.JobStepResultStatus;
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
public class JobStepTask {
    private Long jobId;
    private Integer jobStepNum;
    private Integer jobStepTaskNum;
    private Integer index;
    private Integer rejectedJobStepTaskNum;
    private Long preJobStepTaskResultId;
    private JobStepResultType inputType;
    private JobStepResultType resultType;
    private JobStepResultStatus status;
    private String rejectComment;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
