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
public class JobStepTaskAudio {
    private Long jobStepTaskResultId;
    private Long audioObjectId;
    private String downloadUrl;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
