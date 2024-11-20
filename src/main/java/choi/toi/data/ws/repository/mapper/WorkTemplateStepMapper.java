package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.TemplateStep;
import choi.toi.data.ws.model.WorkTemplateStep;

import java.util.List;

public interface WorkTemplateStepMapper {
    void insertWorkTemplateStep(TemplateStep workTemplateStep);
    List<WorkTemplateStep> selectWorkTemplateSteps(Long workTemplateId);
    List<WorkTemplateStep> selectWorkTemplateStepsWithUserId(Long userId, Long workTemplateId);
    WorkTemplateStep selectWorkTemplateStep(Long workTemplateId, Integer workTemplateStepNum);
    WorkTemplateStep selectWorkTemplateStepByWorkId(Long workId, Integer workTemplateStepNum);
    WorkTemplateStep selectWorkTemplateStepByJobId(Long jobId, Integer workTemplateStepNum);
    List<WorkTemplateStep> selectWorkTemplateStepsForRejectPoint(Long workTemplateId);
    List<WorkTemplateStep> selectPreWorkTemplateSteps(Integer workTemplateId, Integer workTemplateStepNum);
}
