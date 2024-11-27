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
public class JobStepTaskTag {
    private Long jobStepTaskResultId;
    private Integer startIndex;
    private Integer endIndex;
    private String tag;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
