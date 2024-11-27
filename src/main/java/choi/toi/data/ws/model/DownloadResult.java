package choi.toi.data.ws.model;

import choi.toi.data.ws.model.support.JobStepResultType;
import choi.toi.data.ws.model.support.TemplateStepType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class DownloadResult {
    private Long jobStepTaskResultId;
    private Long preJobStepTaskResultId;
    private Long userId;
    private JobStepResultType resultType;
    private TemplateStepType templateStepType;
    private Integer index;
    private String jobStepTaskTextsText;
    private Long jobStepTaskAudiosAudioObjectId;
    private String jobStepTaskAudiosDownloadUrl;
    private JobStepTaskTag jobStepTaskTag;

}
