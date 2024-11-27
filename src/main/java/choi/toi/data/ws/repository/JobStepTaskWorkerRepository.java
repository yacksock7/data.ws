package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.JobStepTaskWorker;
import choi.toi.data.ws.repository.mapper.JobStepTaskWorkerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JobStepTaskWorkerRepository {

    private JobStepTaskWorkerMapper jobStepTaskWorkerMapper;

    @Autowired
    public JobStepTaskWorkerRepository(JobStepTaskWorkerMapper jobStepTaskWorkerMapper) {
        this.jobStepTaskWorkerMapper = jobStepTaskWorkerMapper;
    }

    public void insertJobStepTaskWorker(JobStepTaskWorker jobStepTaskWorker) {
        jobStepTaskWorkerMapper.insertJobStepTaskWorker(jobStepTaskWorker);
    }

    public JobStepTaskWorker selectJobStepTaskWorker(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId) {
        return jobStepTaskWorkerMapper.selectJobStepTaskWorker(jobId, jobStepNum, jobStepTaskNum, userId);
    }

    public List<JobStepTaskWorker> selectJobStepTaskWorkers(Long jobId, Integer jobStepNum, Integer jobStepTaskNum) {
        return jobStepTaskWorkerMapper.selectJobStepTaskWorkersByJobStepTaskId(jobId, jobStepNum, jobStepTaskNum);
    }

    public List<JobStepTaskWorker> selectJobStepTaskWorkers(Long jobId, Integer jobStepNum) {
        return jobStepTaskWorkerMapper.selectJobStepTaskWorkersByJobStepId(jobId, jobStepNum);
    }

    public List<JobStepTaskWorker> selectJobStepWorkersByJobStepId(Long jobId, Integer jobStepNum) {
        return jobStepTaskWorkerMapper.selectJobStepWorkersByJobStepId(jobId, jobStepNum);
    }

//    public void updateJobStepTaskWorker(JobStepTaskWorker jobStepTaskWorker) {
//        jobStepTaskWorkerMapper.updateJobStepTaskWorker(jobStepTaskWorker);
//    }

    public void deleteJobStepTaskWorker(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId) {
        jobStepTaskWorkerMapper.deleteJobStepTaskWorker(jobId, jobStepNum, jobStepTaskNum, userId);
    }
}
