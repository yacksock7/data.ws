package choi.toi.data.ws.model.transfer;

import choi.toi.data.ws.model.JobStep;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateJobStepTaskWorkerTransfer {
    private List<JobStep> jobSteps;
    private List<Long> userIds;
}
