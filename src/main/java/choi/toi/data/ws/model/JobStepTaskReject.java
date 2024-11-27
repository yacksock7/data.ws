package choi.toi.data.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobStepTaskReject {
    private Long jobId;
    private Integer jobStepNum;
    private Integer jobStepTaskNum;
    private Long userId;
    private Integer targetStepNum;
    private String rejectComment;


}