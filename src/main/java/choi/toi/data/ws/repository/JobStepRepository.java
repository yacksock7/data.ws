package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.JobStep;
import choi.toi.data.ws.model.support.TaskStatusCount;
import choi.toi.data.ws.model.transfer.JobStepTransfer;
import choi.toi.data.ws.repository.mapper.JobStepMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JobStepRepository {

    private JobStepMapper jobStepMapper;

    @Autowired
    public JobStepRepository(JobStepMapper jobStepMapper) {
        this.jobStepMapper = jobStepMapper;
    }

    public void insertJobStep(JobStep jobStep) {
        jobStepMapper.insertJobStep(jobStep);
    }

    public List<JobStep> selectJobStepByJobId(Long jobId) {
        return jobStepMapper.selectJobStepsByJobId(jobId);
    }

    public JobStep selectJobStep(Long jobId, Integer jobStepNum) {
        return jobStepMapper.selectJobStep(jobId, jobStepNum);
    }

    public List<JobStepTransfer> selectJobStepTransfer(Long workTemplateId, Integer workTemplateStepNum, Long userId, Integer page, Integer rowsPerPage) {
        final int offset = page > 0 ? rowsPerPage * (page) : 0;
        return jobStepMapper.selectJobsByWorkTemplateStepNum(workTemplateId, workTemplateStepNum, userId, offset, rowsPerPage);
    }

    public int selectJobStepTransferTotalCount(Long workTemplateId, Integer workTemplateStepNum, Long userId) {
        return jobStepMapper.selectJobsTotalCountByWorkTemplateStepNum(workTemplateId, workTemplateStepNum, userId);
    }
    public List<TaskStatusCount> selectJobStepTransferStatusCount(Long workTemplateId, Integer workTemplateStepNum, Long userId) {
        return jobStepMapper.selectJobsStatusCountByWorkTemplateStepNum(workTemplateId, workTemplateStepNum, userId);
    }

    public JobStep selectJobStepByWorkTemplateId(Long jobId, Long workTemplateId, Integer workTemplateStepNum) {
        return jobStepMapper.selectJobStepByWorkTemplateId(jobId, workTemplateId, workTemplateStepNum);
    }

//    public void updateJobStep(JobStep jobStep) {
//        jobStepMapper.updateJobStep(jobStep);
//    }

    public void removeJobStep(Long jobId, Integer jobStepNum) {
        jobStepMapper.deleteJobStep(jobId, jobStepNum);
    }
}
