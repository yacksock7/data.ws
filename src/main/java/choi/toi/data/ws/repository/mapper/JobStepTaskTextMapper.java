package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.JobStepTaskText;

public interface JobStepTaskTextMapper {
    void insertJobStepTaskText(JobStepTaskText jobStepTaskText);
    JobStepTaskText selectJobStepTaskText(Long jobStepTaskResultId);
//    List<JobStepTaskText> selectJobStepTaskTextByWorker(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId);
//    List<JobStepTaskText> selectJobStepTaskTexts(Long jobId, Integer jobStepNum, Integer jobStepTaskNum);
//    List<JobStepTaskText> selectJobStepTaskTexts(Long jobId, Integer jobStepNum);
    void updateJobStepTaskText(JobStepTaskText jobStepTaskText);

}
