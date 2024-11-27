package choi.toi.data.ws.service;

import choi.toi.data.ws.model.*;
import choi.toi.data.ws.model.support.TemplateStepType;
import choi.toi.data.ws.repository.UserRepository;
import choi.toi.data.ws.repository.WorkTemplateStepRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class MachineService {

    private WorkTemplateStepRepository workTemplateStepRepository;
    private JobStepTaskWorkerService jobStepTaskWorkerService;
    private TranslationService translationService;
    private UserRepository userRepository;
    @Autowired
    public MachineService(WorkTemplateStepRepository workTemplateStepRepository,
                          JobStepTaskWorkerService jobStepTaskWorkerService,
                          TranslationService translationService,
                          UserRepository userRepository) {
        this.workTemplateStepRepository = workTemplateStepRepository;
        this.jobStepTaskWorkerService = jobStepTaskWorkerService;
        this.translationService = translationService;
        this.userRepository = userRepository;
    }

    private String mtUserEmail = "MT@onthelive.kr";

    //@@@@@@@@@@@@@@@@@@@@@@@
    public List<JobStepTaskResult> executeMachineByJobStepTask(JobStepTask jobStepTask) {
        final WorkTemplateStep workTemplateStep = workTemplateStepRepository.selectWorkTemplateStepByJobId(jobStepTask.getJobId(), jobStepTask.getJobStepNum());
        final MachineOption options = MachineOption.convertStringToMachineOption(workTemplateStep.getOptions());

        List<JobStepTaskResult> jobStepTaskResults = new ArrayList<>();
        switch (options.getMachineType()) {
            case Translation:
                final JobStepTaskResult jobStepTaskResult = translate(jobStepTask, options);
                if (jobStepTaskResult != null) {
                    jobStepTaskResults.add(jobStepTaskResult);
                }
                break;
            case STT:
                jobStepTaskResults = stt(jobStepTask, options);
                break;
            case Speller: break;
        }

        return jobStepTaskResults;
    }

    public boolean isMachine(JobStepTask nextJobStepTask) {
        final WorkTemplateStep workTemplateStep = workTemplateStepRepository.selectWorkTemplateStepByJobId(nextJobStepTask.getJobId(), nextJobStepTask.getJobStepNum());
        return workTemplateStep.getType().equals(TemplateStepType.Machine);
    }

    public JobStepTaskResult translate(JobStepTask jobStepTask, MachineOption options) {
        final User user = userRepository.selectUser(mtUserEmail);

        final JobStepTaskWorker jobStepTaskWorker = jobStepTaskWorkerService.convertJobStepTaskToJobStepTaskWorker(jobStepTask, user.getId());
        jobStepTaskWorkerService.createJobStepTaskWorker(jobStepTaskWorker);

        return translationService.translateByJobStepTask(user.getId(), jobStepTask, options);
    }
    public List<JobStepTaskResult> stt(JobStepTask jobStepTask, MachineOption options) {
//        final User user = userRepository.selectUser(mtUserEmail);
//
//        final JobStepTaskWorker jobStepTaskWorker = jobStepTaskWorkerService.convertJobStepTaskToJobStepTaskWorker(jobStepTask, user.getId());
//        jobStepTaskWorkerService.createJobStepTaskWorker(jobStepTaskWorker);
//
//        return translationService.translateByJobStepTask(user.getId(), jobStepTask, options);
        return null;
    }


}
