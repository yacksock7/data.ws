package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.JobStepTask;
import choi.toi.data.ws.model.support.JobStepResultStatus;
import choi.toi.data.ws.model.transfer.JobStepTaskTransfer;

import java.util.List;

public interface JobStepTaskMapper {
    void insertJobStepTask(JobStepTask jobStepTask);
    void insertJobStepTasks(JobStepTask jobStepTask);
    JobStepTask selectJobStepTask(Long jobId, Integer jobStepNum, Integer jobStepTaskNum);
    JobStepTask selectJobStepTaskByJobStepTaskResultId(Long jobStepTaskResultId);
    List<JobStepTask> selectNextJobStepTask(Long jobStepTaskResultId);
    List<JobStepTask> selectJobStepTasksByPreJobStepTaskResultId(Long preJobStepTaskResultId);
    List<JobStepTaskTransfer> selectJobStepTaskTransfers(Long jobId, Integer jobStepNum, Long userId);
    Integer selectJobStepTasksCount(Long jobId, Integer jobStepNum, Long userId);
    List<JobStepTaskTransfer> selectJobStepTaskTransfersByArray(Long jobId, Integer jobStepNum, Long userId,Integer startNum, Integer dataLength);
    List<JobStepTask> selectJobStepTasks(Long jobId, Integer jobStepNum);
    List<JobStepTask> selectJobStepTasksByStatus(Long jobId, Integer jobStepNum, JobStepResultStatus status);
    void updateJobStepTask(JobStepTask jobStepTask);
    void updateJobStepTaskStatus(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, JobStepResultStatus status);
    void updateJobStepTaskForReject(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, JobStepResultStatus status, String rejectComment);
    void updateJobStepTasksStatus(Long jobId, Integer jobStepNum, JobStepResultStatus status);
    void deleteJobStepTask(Long jobId, Integer jobStepNum, Integer jobStepTaskNum);
}
