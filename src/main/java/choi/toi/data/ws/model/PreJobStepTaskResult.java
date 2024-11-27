package choi.toi.data.ws.model;

import choi.toi.data.ws.model.support.JobStepResultType;
import choi.toi.data.ws.model.support.TemplateStepType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PreJobStepTaskResult {
    private Long jobStepTaskResultId;
    private Long preJobStepTaskResultId;
    private Long jobId;
    private Integer jobStepNum;
    private Integer jobStepTaskNum;
    private Long userId;
    private JobStepResultType resultType;

    private TemplateStepType templateStepType;
    private String templateStepName;

    private JobStepTaskResult jobStepTaskResult;
}
