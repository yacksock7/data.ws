package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.JobStep;
import choi.toi.data.ws.model.support.TaskStatusCount;
import choi.toi.data.ws.model.transfer.JobStepTransfer;

import java.util.List;

public interface JobStepMapper {
    void insertJobStep(JobStep jobStep);
    List<JobStep> selectJobStepsByJobId(Long jobId);
    JobStep selectJobStep(Long jobId, Integer jobStepNum);
    JobStep selectJobStepByWorkTemplateId(Long jobId, Long workTemplateId, Integer workTemplateStepNum);

    List<JobStepTransfer> selectJobsByWorkTemplateStepNum(Long workTemplateId, Integer workTemplateStepNum, Long userId, Integer offset, Integer rowsPerPage);
    int selectJobsTotalCountByWorkTemplateStepNum(Long workTemplateId, Integer workTemplateStepNum, Long userId);
    List<TaskStatusCount> selectJobsStatusCountByWorkTemplateStepNum(Long workTemplateId, Integer workTemplateStepNum, Long userId);

//    void updateJobStep(JobStep jobStep);
    void deleteJobStep(Long jobId, Integer jobStepNum);
}
