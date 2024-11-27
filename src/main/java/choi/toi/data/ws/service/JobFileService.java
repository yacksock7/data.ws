package choi.toi.data.ws.service;

import choi.toi.data.ws.model.CloudObject;
import choi.toi.data.ws.model.Job;
import choi.toi.data.ws.model.JobFile;
import choi.toi.data.ws.repository.JobFileRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
public class JobFileService {
    private JobFileRepository jobFileRepository;
    private CloudObjectService cloudObjectService;
    private FileService fileService;

    @Autowired
    public JobFileService(JobFileRepository jobFileRepository,
                          CloudObjectService cloudObjectService,
                          FileService fileService) {
        this.jobFileRepository = jobFileRepository;
        this.cloudObjectService = cloudObjectService;
        this.fileService = fileService;
    }

    public void createJobFile(JobFile jobFile) {
        jobFileRepository.insertJobFile(jobFile);
    }

    public JobFile createJobFile(Job job, MultipartFile file){
        final CloudObject cloudObject = cloudObjectService.createCloudObject(job, file);

        final JobFile jobFile = JobFile.builder()
                .jobId(job.getId())
                .uploadFileObject(cloudObject.getId())
                .uploadFileName(file.getOriginalFilename())
                .userId(job.getUserId())
                .build();

        jobFileRepository.insertJobFile(jobFile);
        return jobFile;
    }

    public JobFile getJobFile(Long jobId, Integer jobFileNum) {
        return jobFileRepository.selectJobFile(jobId, jobFileNum);
    }

    public List<JobFile> getJobFilesByJobId(Long jobId) {
        return jobFileRepository.selectJobFilesByJobId(jobId);
    }

    public JobFile modifyJobFile(JobFile jobFile) {
        jobFileRepository.updateJobFile(jobFile);
        return getJobFile(jobFile.getJobId(), jobFile.getJobFileNum());
    }

    public void removeJobFile(Long jobId, Integer jobFileNum) {
        jobFileRepository.deleteJobFile(jobId, jobFileNum);
    }

}
