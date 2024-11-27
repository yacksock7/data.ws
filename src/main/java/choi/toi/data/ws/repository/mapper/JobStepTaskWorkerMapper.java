package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.JobStepTaskWorker;

import java.util.List;

public interface JobStepTaskWorkerMapper {
    void insertJobStepTaskWorker(JobStepTaskWorker jobStepTaskWorker);
    JobStepTaskWorker selectJobStepTaskWorker(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId);
    List<JobStepTaskWorker> selectJobStepTaskWorkersByJobStepTaskId(Long jobId, Integer jobStepNum, Integer jobStepTaskNum);
    List<JobStepTaskWorker> selectJobStepTaskWorkersByJobStepId(Long jobId, Integer jobStepNum);
    List<JobStepTaskWorker> selectJobStepWorkersByJobStepId(Long jobId, Integer jobStepNum);
//    void updateJobStepTaskWorker(JobStepTaskWorker jobStepTaskWorker);
    void deleteJobStepTaskWorker(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId);
}
