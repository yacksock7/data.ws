package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.TemplateStep;
import choi.toi.data.ws.model.WorkTemplateStep;
import choi.toi.data.ws.repository.mapper.WorkTemplateStepMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class WorkTemplateStepRepository {

    private WorkTemplateStepMapper workTemplateStepMapper;
    @Autowired
    public WorkTemplateStepRepository(WorkTemplateStepMapper workTemplateStepMapper) {
        this.workTemplateStepMapper = workTemplateStepMapper;
    }

    public void insertWorkTemplateStep(TemplateStep workTemplateStep) {
        workTemplateStepMapper.insertWorkTemplateStep(workTemplateStep);
    }

    public List<WorkTemplateStep> selectWorkTemplateSteps(Long workTemplateId) {
        return workTemplateStepMapper.selectWorkTemplateSteps(workTemplateId);
    }

    public List<WorkTemplateStep> selectWorkTemplateSteps(Long userId, Long workTemplateId) {
        return workTemplateStepMapper.selectWorkTemplateStepsWithUserId(userId, workTemplateId);
    }
    public WorkTemplateStep selectWorkTemplateStep(Long workTemplateId, Integer workTemplateStepNum) {
        return workTemplateStepMapper.selectWorkTemplateStep(workTemplateId, workTemplateStepNum);
    }
    public WorkTemplateStep selectWorkTemplateStepByWorkId(Long workId, Integer workTemplateStepNum) {
        return workTemplateStepMapper.selectWorkTemplateStepByWorkId(workId, workTemplateStepNum);
    }

    public WorkTemplateStep selectWorkTemplateStepByJobId(Long jobId, Integer workTemplateStepNum) {
        return workTemplateStepMapper.selectWorkTemplateStepByJobId(jobId, workTemplateStepNum);
    }

    public List<WorkTemplateStep> selectWorkTemplateStepsForRejectPoint (Long workTemplateId) {
        return workTemplateStepMapper.selectWorkTemplateStepsForRejectPoint(workTemplateId);
    }
    public List<WorkTemplateStep> selectPreWorkTemplateSteps (Integer workTemplateId, Integer workTemplateStepNum) {
        return workTemplateStepMapper.selectPreWorkTemplateSteps(workTemplateId, workTemplateStepNum);
    }
}
