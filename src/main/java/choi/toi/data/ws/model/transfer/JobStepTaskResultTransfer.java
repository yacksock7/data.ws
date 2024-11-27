package choi.toi.data.ws.model.transfer;

import choi.toi.data.ws.model.JobStepTaskAudio;
import choi.toi.data.ws.model.JobStepTaskTag;
import choi.toi.data.ws.model.JobStepTaskText;
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
public class JobStepTaskResultTransfer {
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

    private JobStepTaskWorkerTransfer worker;

}
