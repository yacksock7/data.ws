package choi.toi.data.ws.model;

import choi.toi.data.ws.model.support.TemplateStepType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobStep {
    private Long jobId;
    private Integer jobStepNum;
    private Long workTemplateId;
    private Integer workTemplateStepNum;
    private TemplateStepType stepType;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
