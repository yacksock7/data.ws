package choi.toi.data.ws.model.support;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskStatusCount {
    private int totalCount;
    private int waitingCount;
    private int createdCount;
    private int assignedCount;
    private int completedCount;
    private int rejectedCount;
    private int acceptedCount;
}
