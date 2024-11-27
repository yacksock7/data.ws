package choi.toi.data.ws.service;


import choi.toi.data.ws.model.JobStepTaskAudio;
import choi.toi.data.ws.repository.JobStepTaskAudioRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class JobStepTaskAudioService {


    private JobStepTaskAudioRepository jobStepTaskAudioRepository;
    private ModelMapper modelMapper;


    @Autowired
    public JobStepTaskAudioService(JobStepTaskAudioRepository jobStepTaskAudioRepository,
                                   ModelMapper modelMapper) {
        this.jobStepTaskAudioRepository = jobStepTaskAudioRepository;
        this.modelMapper = modelMapper;
    }

    public void createJobStepTaskAudio(JobStepTaskAudio jobStepTaskAudio) {
        jobStepTaskAudioRepository.insertJobStepTaskAudio(jobStepTaskAudio);
    }

    public JobStepTaskAudio getJobStepTaskAudio(Long jobStepTaskResultId) {
        return jobStepTaskAudioRepository.selectJobStepTaskAudio(jobStepTaskResultId);
    }

    public JobStepTaskAudio convertJobStepTaskAudio(Long jobStepTaskResultId, Long audioObjectId) {
        return JobStepTaskAudio.builder()
                .jobStepTaskResultId(jobStepTaskResultId)
                .audioObjectId(audioObjectId)
                .build();
    }

}
