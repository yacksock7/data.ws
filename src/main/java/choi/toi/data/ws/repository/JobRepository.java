package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.Job;
import choi.toi.data.ws.repository.mapper.JobMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JobRepository {

    private JobMapper jobMapper;
    @Autowired
    public JobRepository(JobMapper jobMapper) {
        this.jobMapper = jobMapper;
    }

    public void insertJob(Job job) {
        jobMapper.insertJob(job);
    }

    public Job selectJob(Long jobId) {
        return jobMapper.selectJob(jobId);
    }

    public Job selectJobByJobStepTaskResultId(Long jobStepTaskResultId) {
        return jobMapper.selectJobByJobStepTaskResultId(jobStepTaskResultId);
    }

    public List<Job> selectJobsByWorkId(Long workId) {
        return jobMapper.selectJobsByWorkId(workId);
    }

    public void updateJob(Job job) {
        jobMapper.updateJob(job);
    }

    public void deleteJob(Long jobId) {
        jobMapper.deleteJob(jobId);
    }
}
