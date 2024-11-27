package choi.toi.data.ws.service;

import choi.toi.data.ws.model.*;
import choi.toi.data.ws.model.support.JobStepResultStatus;
import choi.toi.data.ws.model.support.LangType;
import choi.toi.data.ws.repository.JobStepTaskRepository;
import choi.toi.data.ws.service.common.JobStepTaskCommonService;
import choi.toi.data.ws.service.tranlation.GcpTranslateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class TranslationService {

    private JobStepService jobStepService;
    private JobStepTaskRepository jobStepTaskRepository;
    private JobStepTaskWorkerService jobStepTaskWorkerService;
    private JobStepTaskResultService jobStepTaskResultService;
    private JobStepTaskTextService jobStepTaskTextService;
    private JobStepTaskCommonService jobStepTaskCommonService;

    private GcpTranslateService gcpTranslateService;
    private UserService userService;

    @Autowired
    public TranslationService(JobStepService jobStepService,
                              JobStepTaskRepository jobStepTaskRepository,
                              JobStepTaskWorkerService jobStepTaskWorkerService,
                              JobStepTaskResultService jobStepTaskResultService,
                              JobStepTaskTextService jobStepTaskTextService,
                              JobStepTaskCommonService jobStepTaskCommonService,

                              GcpTranslateService gcpTranslateService,
                              UserService userService) {
        this.jobStepService = jobStepService;
        this.jobStepTaskRepository = jobStepTaskRepository;
        this.jobStepTaskWorkerService = jobStepTaskWorkerService;
        this.jobStepTaskResultService = jobStepTaskResultService;
        this.jobStepTaskTextService = jobStepTaskTextService;
        this.jobStepTaskCommonService = jobStepTaskCommonService;

        this.gcpTranslateService = gcpTranslateService;
        this.userService = userService;
    }

    private String mtUserEmail = "MT@onthelive.kr";

    @Async
    @Transactional
    public void translateBatch(Long jobId, WorkTemplateStep workTemplateStep, List<JobStepTaskResult> preJobStepTaskResults) {
        final User user = userService.getUser(mtUserEmail);
        final MachineOption option = MachineOption.convertStringToMachineOption(workTemplateStep.getOptions());

        // 1. jobStep
        final JobStep jobStep = jobStepService.getJobStepByWorkTemplateId(jobId, workTemplateStep.getWorkTemplateId(), workTemplateStep.getWorkTemplateStepNum());

        // 2. jobStepTask 생성
        final List<JobStepTask> jobStepTasks = jobStepTaskCommonService.createNextJobStepTasks(preJobStepTaskResults);

        // 3. worker 생성
        final List<JobStepTaskWorker> jobStepTaskWorkers = jobStepTaskWorkerService.convertJobStepTasksToJobStepTaskWorkers(jobStepTasks, user.getId());
        jobStepTaskWorkerService.createJobStepTaskWorkers(jobStepTaskWorkers);

        // 4. 기계번역 수행
        final List<JobStepTaskResult> completedJobStepTaskResults = translateByPreJobStepTasks(user.getId(), jobStep.getJobId(), jobStep.getJobStepNum(), option);

        // 7. 다음 step의 Job Status Created로 생성
        jobStepTaskCommonService.createNextJobStepTasks(completedJobStepTaskResults);
    }

    public List<JobStepTaskResult> translateByPreJobStepTasks(Long userId, Long jobId, Integer jobStepNum, MachineOption options) {

        final List<JobStepTaskResult> jobStepTaskResults = new ArrayList<>();

        final List<JobStepTask> jobStepTasks = jobStepTaskRepository.selectJobStepTasks(jobId, jobStepNum);

        for (JobStepTask jobStepTask : jobStepTasks) {
            final JobStepTaskResult preJobStepTaskResult = jobStepTaskResultService.getJobStepTaskResult(jobStepTask.getPreJobStepTaskResultId());
            final String targetText = translateByPreJobStepTask(preJobStepTaskResult.getJobStepTaskText(), options);

            if (targetText == null || targetText.equals("")) {
                jobStepTaskRepository.updateJobStepTask(jobStepTask.getJobId(), jobStepTask.getJobStepNum(), jobStepTask.getJobStepTaskNum(), JobStepResultStatus.Failed);
            } else {
                // jobStepTaskResult 생성.
                final JobStepTaskResult jobStepTaskResult = jobStepTaskResultService.convertJobStepTaskResult(jobStepTask, userId, 1);
                jobStepTaskResultService.createJobStepTaskResult(jobStepTaskResult);

                final JobStepTaskText jobStepTaskText = jobStepTaskTextService.convertJobStepTaskText(jobStepTaskResult.getId(), targetText);
                jobStepTaskResult.setJobStepTaskText(jobStepTaskText);
                jobStepTaskResultService.createJobStepTaskResultDetail(jobStepTaskResult);

                jobStepTaskRepository.updateJobStepTask(jobStepTask.getJobId(), jobStepTask.getJobStepNum(), jobStepTask.getJobStepTaskNum(), JobStepResultStatus.Completed);

                jobStepTaskResults.add(jobStepTaskResult);
            }
        }

        return jobStepTaskResults;
    }


    //@@@@@@@@@@@@@@@@@@@@@@@
    public JobStepTaskResult translateByJobStepTask(Long userId, JobStepTask jobStepTask, MachineOption options) {

        final JobStepTaskResult preJobStepTaskResult = jobStepTaskResultService.getJobStepTaskResult(jobStepTask.getPreJobStepTaskResultId());
        final String targetText = translateByPreJobStepTask(preJobStepTaskResult.getJobStepTaskText(), options);

        JobStepTaskResult jobStepTaskResult = null;
        if (targetText == null || targetText.equals("")) {
            jobStepTaskRepository.updateJobStepTask(jobStepTask.getJobId(), jobStepTask.getJobStepNum(), jobStepTask.getJobStepTaskNum(), JobStepResultStatus.Failed);
        } else {
            // jobStepTaskResult 생성.
            jobStepTaskResult = jobStepTaskResultService.convertJobStepTaskResult(jobStepTask, userId, 1);
            final JobStepTaskText jobStepTaskText = jobStepTaskTextService.convertJobStepTaskText(jobStepTaskResult.getId(), targetText);
            jobStepTaskResult.setJobStepTaskText(jobStepTaskText);

            jobStepTaskRepository.updateJobStepTask(jobStepTask.getJobId(), jobStepTask.getJobStepNum(), jobStepTask.getJobStepTaskNum(), JobStepResultStatus.Completed);
        }

        return jobStepTaskResult;
    }

    private String translateByPreJobStepTask(JobStepTaskText jobStepTaskText, MachineOption options) {
        final String sourceText = jobStepTaskText.getText();
        final LangType langType = options.getTargetLang();

        String targetText;
        try {
            targetText = gcpTranslateService.execute(langType, sourceText);
            log.debug("executeTranslation Success!! targetText : {}", targetText);
        } catch (IOException e) {
            targetText = null;
        }

        return targetText;
    }
}
