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
public class Work {
    private Long id;
    private Long userId;
    private Long workTemplateId;
    private String name;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
