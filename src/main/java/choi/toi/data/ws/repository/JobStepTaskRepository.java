package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.JobStepTask;
import choi.toi.data.ws.model.support.JobStepResultStatus;
import choi.toi.data.ws.model.transfer.JobStepTaskTransfer;
import choi.toi.data.ws.repository.mapper.JobStepTaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JobStepTaskRepository {
    private JobStepTaskMapper jobStepTaskMapper;
    @Autowired
    public JobStepTaskRepository(JobStepTaskMapper jobStepTaskMapper) {
        this.jobStepTaskMapper = jobStepTaskMapper;
    }

    public void insertJobStepTask(JobStepTask jobStepTask) {
        jobStepTaskMapper.insertJobStepTask(jobStepTask);
    }

    public List<JobStepTaskTransfer> selectJobStepTaskTransfers(Long jobId, Integer jobStepNum, Long userId) {
        return jobStepTaskMapper.selectJobStepTaskTransfers(jobId, jobStepNum, userId);
    }

    public List<JobStepTaskTransfer> selectJobStepTaskTransfersByArray(Long jobId, Integer jobStepNum, Long userId,Integer startNum,Integer dataLength) {
        return jobStepTaskMapper.selectJobStepTaskTransfersByArray(jobId, jobStepNum, userId,startNum,dataLength);
    }

    public Integer selectJobStepTasksCount(Long jobId, Integer jobStepNum, Long userId) {
        return jobStepTaskMapper.selectJobStepTasksCount(jobId, jobStepNum, userId);
    }

    public List<JobStepTask> selectJobStepTasks(Long jobId, Integer jobStepNum) {
        return jobStepTaskMapper.selectJobStepTasks(jobId, jobStepNum);
    }


    public List<JobStepTask> selectJobStepTasks(Long jobId, Integer jobStepNum, JobStepResultStatus status) {
        return jobStepTaskMapper.selectJobStepTasksByStatus(jobId, jobStepNum, status);
    }

    public JobStepTask selectJobStepTask(Long jobId, Integer jobStepNum, Integer jobStepTaskNum) {
        return jobStepTaskMapper.selectJobStepTask(jobId, jobStepNum, jobStepTaskNum);
    }


    public JobStepTask selectJobStepTask(Long jobStepTaskResultId) {
        return jobStepTaskMapper.selectJobStepTaskByJobStepTaskResultId(jobStepTaskResultId);
    }

    public List<JobStepTask> selectNextJobStepTask(Long jobStepTaskResultId) {
        return jobStepTaskMapper.selectNextJobStepTask(jobStepTaskResultId);
    }

    public List<JobStepTask> selectJobStepTasksByPreJobStepTaskResultId(Long preJobStepTaskResultId) {
        return jobStepTaskMapper.selectJobStepTasksByPreJobStepTaskResultId(preJobStepTaskResultId);
    }

    public void updateJobStepTask(JobStepTask jobStepTask) {
        jobStepTaskMapper.updateJobStepTask(jobStepTask);
    }

    public void updateJobStepTask(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, JobStepResultStatus status) {
        jobStepTaskMapper.updateJobStepTaskStatus(jobId, jobStepNum, jobStepTaskNum, status);
    }

    public void updateJobStepTaskForReject(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, JobStepResultStatus status, String rejectComment) {
        jobStepTaskMapper.updateJobStepTaskForReject(jobId, jobStepNum, jobStepTaskNum, status, rejectComment);
    }
    public void updateJobStepTasks(Long jobId, Integer jobStepNum, JobStepResultStatus status) {
        jobStepTaskMapper.updateJobStepTasksStatus(jobId, jobStepNum, status);
    }

    public void deleteJobStepTask(Long jobId, Integer jobStepNum, Integer jobStepTaskNum) {
        jobStepTaskMapper.deleteJobStepTask(jobId, jobStepNum, jobStepTaskNum);
    }

}
