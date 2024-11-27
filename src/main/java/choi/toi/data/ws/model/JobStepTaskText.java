package choi.toi.data.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class JobStepTaskText {
    private Long jobStepTaskResultId;
    private String text;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
