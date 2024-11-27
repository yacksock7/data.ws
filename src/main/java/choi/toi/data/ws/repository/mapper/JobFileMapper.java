package choi.toi.data.ws.repository.mapper;


import choi.toi.data.ws.model.JobFile;

import java.util.List;

public interface JobFileMapper {
    void insertJobFile(JobFile jobFile);
    JobFile selectJobFile(Long jogId, Integer jobFileNum);
    List<JobFile> selectJobFilesByJobId(Long jobId);
    void updateJobFile(JobFile jobFile);
    void deleteJobFile(Long jobId, Integer jobFileNum);
}
