package choi.toi.data.ws.model.transfer;

import choi.toi.data.ws.model.Work;
import choi.toi.data.ws.model.WorkTemplate;
import choi.toi.data.ws.model.WorkTemplateStep;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkTemplateStepTransfer {
    private WorkTemplate workTemplate;
    private List<WorkTemplateStep> workTemplateSteps;
    private Work work;
    private boolean isUploadUser;
}
