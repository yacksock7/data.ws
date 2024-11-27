package choi.toi.data.ws.model.transfer;

import choi.toi.data.ws.model.CloudObject;
import choi.toi.data.ws.model.Job;
import choi.toi.data.ws.model.JobStepTaskWorker;
import choi.toi.data.ws.model.support.TaskStatusCount;
import choi.toi.data.ws.model.support.TemplateStepType;
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
public class JobStepTransfer {
    private Long jobId;
    private Integer jobStepNum;
    private Long workTemplateId;
    private Integer workTemplateStepNum;
    private TemplateStepType stepType;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
    //todo 작업 상태 읽는 동작 수정 필요.
    private Long userId;

    private TaskStatusCount taskStatusCount;
    private Job job;
    private CloudObject cloudObject;
    private List<JobStepTaskWorker> workers;
}
