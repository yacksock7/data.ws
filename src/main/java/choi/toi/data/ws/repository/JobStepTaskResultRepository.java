package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.JobStepTaskResult;
import choi.toi.data.ws.model.PreJobStepTaskResult;
import choi.toi.data.ws.repository.mapper.JobStepTaskResultMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JobStepTaskResultRepository {

    private JobStepTaskResultMapper jobStepTaskResultMapper;

    @Autowired
    public JobStepTaskResultRepository(JobStepTaskResultMapper jobStepTaskResultMapper) {
        this.jobStepTaskResultMapper = jobStepTaskResultMapper;
    };

    public void insertJobStepTaskResult(JobStepTaskResult jobStepTaskResult) {
        jobStepTaskResultMapper.insertJobStepTaskResult(jobStepTaskResult);
    }

    public JobStepTaskResult selectJobStepTaskResult(Long jobStepTaskResultId) {
        return jobStepTaskResultMapper.selectJobStepTaskResult(jobStepTaskResultId);
    }

    public List<JobStepTaskResult> selectJobStepTaskResults(Long jobId, Integer jobStepNum, Integer jobStepTaskNum) {
        return jobStepTaskResultMapper.selectJobStepTaskResultsByJobStepTask(jobId, jobStepNum, jobStepTaskNum);
    }

    public List<JobStepTaskResult> selectJobStepTaskResults(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId) {
        return jobStepTaskResultMapper.selectJobStepTaskResultsByWorker(jobId, jobStepNum, jobStepTaskNum, userId);
    }

    public PreJobStepTaskResult selectPreJobStepTaskResult(Long jobStepTaskResultId) {
        return jobStepTaskResultMapper.selectPreJobTaskResult(jobStepTaskResultId);
    }




}
