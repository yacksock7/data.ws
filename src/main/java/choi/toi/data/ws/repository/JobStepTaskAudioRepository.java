package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.JobStepTaskAudio;
import choi.toi.data.ws.repository.mapper.JobStepTaskAudioMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class JobStepTaskAudioRepository {

    private JobStepTaskAudioMapper jobStepTaskAudioMapper;

    @Autowired
    public JobStepTaskAudioRepository(JobStepTaskAudioMapper jobStepTaskAudioMapper) {
        this.jobStepTaskAudioMapper = jobStepTaskAudioMapper;
    };

    public void insertJobStepTaskAudio(JobStepTaskAudio jobStepTaskAudio) {
        jobStepTaskAudioMapper.insertJobStepTaskAudio(jobStepTaskAudio);
    }

    public JobStepTaskAudio selectJobStepTaskAudio(Long jobStepTaskResultId) {
        return jobStepTaskAudioMapper.selectJobStepTaskAudio(jobStepTaskResultId);
    }

//    public JobStepTaskAudio selectJobStepTaskAudio(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId) {
//        return jobStepTaskAudioMapper.selectJobStepTaskAudio(jobId, jobStepNum, jobStepTaskNum, userId);
//    }
//
//    public List<JobStepTaskAudio> selectJobStepTaskAudios(Long jobId, Integer jobStepNum, Integer jobStepTaskNum) {
//        return jobStepTaskAudioMapper.selectJobStepTaskAudios(jobId, jobStepNum, jobStepTaskNum);
//    }

    public void updateJobStepTaskAudio(JobStepTaskAudio jobStepTaskAudio) {
        jobStepTaskAudioMapper.updateJobStepTaskAudio(jobStepTaskAudio);
    }
}
