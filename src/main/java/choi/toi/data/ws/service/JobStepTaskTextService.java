package choi.toi.data.ws.service;


import choi.toi.data.ws.model.JobStepTaskResult;
import choi.toi.data.ws.model.JobStepTaskText;
import choi.toi.data.ws.repository.JobStepTaskRepository;
import choi.toi.data.ws.repository.JobStepTaskTextBatchRepository;
import choi.toi.data.ws.repository.WorkTemplateStepRepository;
import lombok.extern.slf4j.Slf4j;
import choi.toi.data.ws.repository.JobStepTaskTextRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class JobStepTaskTextService {

    private JobStepTaskTextRepository jobStepTaskTextRepository;
    private JobStepTaskTextBatchRepository jobStepTaskTextBatchRepository;
    private JobStepTaskRepository jobStepTaskRepository;
    private WorkTemplateStepRepository workTemplateStepRepository;
    private ModelMapper modelMapper;


    @Autowired
    public JobStepTaskTextService(JobStepTaskTextRepository jobStepTaskTextRepository,
                                  JobStepTaskTextBatchRepository jobStepTaskTextBatchRepository,
                                  JobStepTaskRepository jobStepTaskRepository,
                                  WorkTemplateStepRepository workTemplateStepRepository,
                                  ModelMapper modelMapper) {
        this.jobStepTaskTextRepository = jobStepTaskTextRepository;
        this.jobStepTaskTextBatchRepository = jobStepTaskTextBatchRepository;
        this.jobStepTaskRepository = jobStepTaskRepository;
        this.workTemplateStepRepository = workTemplateStepRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public void createJobStepTaskText(JobStepTaskText jobStepTaskText) {
//        log.trace("createJobStepTaskText Start... jobStepTaskText={}", jobStepTaskText);
//
//        final JobStepTask jobStepTask = jobStepTaskRepository.selectJobStepTask(jobStepTaskText.getJobId(), jobStepTaskText.getJobStepNum(), jobStepTaskText.getJobStepTaskNum());
//
//        if (jobStepTask.getStatus().equals(JobStepResultStatus.Rejected)) {
//            jobStepTaskRepository.updateJobStepTask(jobStepTaskText.getJobId(), jobStepTaskText.getJobStepNum(), jobStepTaskText.getJobStepTaskNum(), JobStepResultStatus.Completed);
//            jobStepTaskTextRepository.updateJobStepTaskText(jobStepTaskText);
//
//            final int nextJobStepNum = jobStepTaskText.getJobStepNum()+1;
//            final JobStepTask nextJobStepTask = jobStepTaskRepository.selectJobStepTask(jobStepTaskText.getJobId(), nextJobStepNum, jobStepTaskText.getJobStepTaskNum());
//
//            if (nextJobStepTask != null && nextJobStepTask.getStatus().equals(JobStepResultStatus.RejectWaiting)) {
//                jobStepTaskRepository.updateJobStepTask(jobStepTaskText.getJobId(), jobStepTaskText.getJobStepNum()+1, jobStepTaskText.getJobStepTaskNum(), JobStepResultStatus.Rejected);
//            } else {
//                createNextJobStepTask(jobStepTask);
//            }
//
//        } else {
//            jobStepTaskRepository.updateJobStepTask(jobStepTaskText.getJobId(), jobStepTaskText.getJobStepNum(), jobStepTaskText.getJobStepTaskNum(), JobStepResultStatus.Completed);
//            jobStepTaskTextRepository.insertJobStepTaskText(jobStepTaskText);
//
//            createNextJobStepTask(jobStepTask);
//        }

    }

    public void createJobStepTaskTexts(List<JobStepTaskText> jobStepTaskTexts) {
        jobStepTaskTextBatchRepository.batchInsertJobStepTaskTexts(jobStepTaskTexts);
    }

    public List<JobStepTaskText> getJobStepTaskTexts(Long jobId, Integer jobStepNum) {
//        return jobStepTaskTextRepository.selectJobStepTaskTexts(jobId, jobStepNum);
        return null;
    }


    public List<JobStepTaskText> convertJobStepTaskTexts(List<JobStepTaskResult> jobStepTaskResults, List<String> sourceTexts) {
        final List<JobStepTaskText> jobStepTaskTexts = new ArrayList<>();

        for (int i=0; i < jobStepTaskResults.size() ; i++) {
            final JobStepTaskText jobStepTaskText = convertJobStepTaskText(jobStepTaskResults.get(i).getId(), sourceTexts.get(i));
            jobStepTaskTexts.add(jobStepTaskText);
        }
        return jobStepTaskTexts;
    }
    public JobStepTaskText convertJobStepTaskText(Long jobStepTaskResultId, String sourceText) {
        return JobStepTaskText.builder()
                .jobStepTaskResultId(jobStepTaskResultId)
                .text(sourceText)
                .build();
    }
}
