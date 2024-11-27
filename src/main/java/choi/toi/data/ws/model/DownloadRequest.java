package choi.toi.data.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class DownloadRequest {
    private Long jobId;
    private Long[] jobList;
    private Integer[] jobStepTaskList;
    private Long userId;
    private Integer workTemplateId;
    private Integer maxStepNum;
}
