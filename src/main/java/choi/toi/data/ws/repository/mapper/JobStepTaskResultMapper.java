package choi.toi.data.ws.repository.mapper;


import choi.toi.data.ws.model.JobStepTaskResult;
import choi.toi.data.ws.model.PreJobStepTaskResult;

import java.util.List;

public interface JobStepTaskResultMapper {
    void insertJobStepTaskResult(JobStepTaskResult jobStepTaskResult);

    JobStepTaskResult selectJobStepTaskResult(Long jobStepTaskResultId);
    List<JobStepTaskResult> selectJobStepTaskResultsByJobStepTask(Long jobId, Integer jobStepNum, Integer jobStepTaskNum);
    List<JobStepTaskResult> selectJobStepTaskResultsByWorker(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId);

    PreJobStepTaskResult selectPreJobTaskResult(Long jobStepTaskResultId);
//
//    void insertJobStepTaskText(JobStepTaskText jobStepTaskText);
//    JobStepTaskText selectJobStepTaskText(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId);
//    List<JobStepTaskText> selectJobStepTaskTexts(Long jobId, Integer jobStepNum, Integer jobStepTaskNum);
//    void updateJobStepTaskText(JobStepTaskText jobStepTaskText);
//
//
//    void insertJobStepTaskAudio(JobStepTaskAudio jobStepTaskAudio);
//    JobStepTaskAudio selectJobStepTaskAudio(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId);
//    List<JobStepTaskAudio> selectJobStepTaskAudios(Long jobId, Integer jobStepNum, Integer jobStepTaskNum);
//    void updateJobStepTaskAudio(JobStepTaskAudio jobStepTaskAudio);
//
//
//    void insertJobStepTaskTag(JobStepTaskTag jobStepTaskTag);
//    JobStepTaskTag selectJobStepTaskTag(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId);
//    List<JobStepTaskTag> selectJobStepTaskTags(Long jobId, Integer jobStepNum, Integer jobStepTaskNum);
//    void updateJobStepTaskTag(JobStepTaskTag jobStepTaskTag);
}
