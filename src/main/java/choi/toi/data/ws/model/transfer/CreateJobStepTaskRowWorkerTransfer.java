package choi.toi.data.ws.model.transfer;

import choi.toi.data.ws.model.JobStepTask;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateJobStepTaskRowWorkerTransfer {
    private JobStepTask jobStepTask;
    private List<Long> userIds;

}

