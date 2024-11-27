package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.JobFile;
import choi.toi.data.ws.repository.mapper.JobFileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JobFileRepository {

    private JobFileMapper jobFileMapper;
    @Autowired
    public JobFileRepository(JobFileMapper jobFileMapper) {
        this.jobFileMapper = jobFileMapper;
    }

    public void insertJobFile(JobFile jobFile) {
        jobFileMapper.insertJobFile(jobFile);
    }

    public JobFile selectJobFile(Long jobId, Integer jobFileNum) {
        return jobFileMapper.selectJobFile(jobId, jobFileNum);
    }

    public List<JobFile> selectJobFilesByJobId(Long jobId) {
        return jobFileMapper.selectJobFilesByJobId(jobId);
    }

    public void updateJobFile(JobFile jobFile) {
        jobFileMapper.updateJobFile(jobFile);
    }

    public void deleteJobFile(Long jobId, Integer jobFileNum) {
        jobFileMapper.deleteJobFile(jobId, jobFileNum);
    }
}
