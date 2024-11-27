package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.JobStepTaskTag;

public interface JobStepTaskTagMapper {

    void insertJobStepTaskTag(JobStepTaskTag jobStepTaskTag);
    JobStepTaskTag selectJobStepTaskTag(Long jobStepTaskResultId);
//    JobStepTaskTag selectJobStepTaskTag(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId);
//    List<JobStepTaskTag> selectJobStepTaskTags(Long jobId, Integer jobStepNum, Integer jobStepTaskNum);
    void updateJobStepTaskTag(JobStepTaskTag jobStepTaskTag);
}
