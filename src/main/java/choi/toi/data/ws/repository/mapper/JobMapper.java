package choi.toi.data.ws.repository.mapper;


import choi.toi.data.ws.model.Job;

import java.util.List;

public interface JobMapper {
    void insertJob(Job job);
    Job selectJob(Long jobId);
    Job selectJobByJobStepTaskResultId(Long jobStepTaskResultId);
    List<Job> selectJobsByWorkId(Long workId);

    void updateJob(Job job);
    void deleteJob(Long jobId);
}
