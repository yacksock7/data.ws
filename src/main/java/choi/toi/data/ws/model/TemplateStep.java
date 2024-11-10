package choi.toi.data.ws.model;

import choi.toi.data.ws.model.support.JobStepResultType;
import choi.toi.data.ws.model.support.StepType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateStep {
    private Long templateId;
    private Integer templateStepNum;
    private StepType type;
    private String name;
    private String options;
    private JobStepResultType inputType;
    private JobStepResultType resultType;
    private boolean isRejectPoint;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
