package choi.toi.data.ws.model;

import choi.toi.data.ws.model.support.JobStepResultType;
import choi.toi.data.ws.model.support.TemplateStepType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class WorkTemplateStep {
    private Long workTemplateId;
    private Integer workTemplateStepNum;
    private TemplateStepType type;
    private String name;
    private String options;
    private boolean isRejectPoint;
    private JobStepResultType inputType;
    private JobStepResultType resultType;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

    private Long userId;
    private Integer allocateCount;
}
