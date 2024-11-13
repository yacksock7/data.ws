package choi.toi.data.ws.model.transfer;

import choi.toi.data.ws.model.support.TemplateStepType;
import choi.toi.data.ws.model.support.TemplateType;
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
public class TemplateTableTransfer {
    private Long id;
    private Long userId;
    private String userNickname;
    private TemplateType type;
    private String name;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

    private List<TemplateStepType> templateStepTypes;
}
