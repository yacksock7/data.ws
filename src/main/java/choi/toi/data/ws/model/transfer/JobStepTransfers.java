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
public class JobStepTransfers {
    private List<JobStepTransfer> jobStepTransfers;
    private int totalCount;
    private int completedCount;
    private int createdCount;
}
