package choi.toi.data.ws.model;

import choi.toi.data.ws.model.support.TemplateType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkTemplate {
    private Long id;
    private Long userId;
    private TemplateType type;
    private String name;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
