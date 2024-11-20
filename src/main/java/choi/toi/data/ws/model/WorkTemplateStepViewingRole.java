package choi.toi.data.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkTemplateStepViewingRole {
    private Long workTemplateId;
    private Integer workTemplateStepNum;
    private Integer viewingTemplateStepNum;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
