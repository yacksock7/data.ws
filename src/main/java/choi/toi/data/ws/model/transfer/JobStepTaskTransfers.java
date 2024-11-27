package choi.toi.data.ws.model.transfer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobStepTaskTransfers {
    private List<JobStepTaskTransfer> jobStepTaskTransfers;
    private Integer totalCount;
}
