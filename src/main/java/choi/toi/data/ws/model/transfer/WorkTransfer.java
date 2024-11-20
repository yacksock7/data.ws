package choi.toi.data.ws.model.transfer;

import choi.toi.data.ws.model.Template;
import choi.toi.data.ws.model.TemplateStep;
import choi.toi.data.ws.model.Work;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkTransfer {
    private Template template;
    private List<TemplateStep> templateSteps;
    private Work work;
}
