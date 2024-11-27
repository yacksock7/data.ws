package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.JobStepTaskAudio;

public interface JobStepTaskAudioMapper {

    void insertJobStepTaskAudio(JobStepTaskAudio jobStepTaskAudio);
    JobStepTaskAudio selectJobStepTaskAudio(Long jobStepTaskResultId);
//    JobStepTaskAudio selectJobStepTaskAudio(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId);
//    List<JobStepTaskAudio> selectJobStepTaskAudios(Long jobId, Integer jobStepNum, Integer jobStepTaskNum);
    void updateJobStepTaskAudio(JobStepTaskAudio jobStepTaskAudio);
}
