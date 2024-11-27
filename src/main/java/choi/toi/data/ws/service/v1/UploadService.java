package choi.toi.data.ws.service.v1;

import choi.toi.data.ws.model.*;
import choi.toi.data.ws.model.support.JobStepResultStatus;
import choi.toi.data.ws.model.support.TaskStatusCount;
import choi.toi.data.ws.model.support.TemplateStepType;
import choi.toi.data.ws.model.support.UploadFileType;
import choi.toi.data.ws.model.transfer.JobStepTransfer;
import choi.toi.data.ws.model.transfer.JobStepTransfers;
import choi.toi.data.ws.repository.JobRepository;
import choi.toi.data.ws.repository.WorkTemplateStepRepository;
import choi.toi.data.ws.service.*;
import choi.toi.data.ws.service.common.JobStepTaskCommonService;
import choi.toi.data.ws.util.ExcelUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UploadService {

    private JobRepository jobRepository;
    private JobStepService jobStepService;
    private JobStepTaskService jobStepTaskService;
    private JobStepTaskCommonService jobStepTaskCommonService;
    private JobStepTaskWorkerService jobStepTaskWorkerService;
    private JobStepTaskResultService jobStepTaskResultService;
    private JobStepTaskTextService jobStepTaskTextService;
    private TranslationService translationService;

    private WorkTemplateStepRepository workTemplateStepRepository;
    private ExcelUtil excelUtil;


    @Autowired
    public UploadService(JobRepository jobRepository,
                         JobStepService jobStepService,
                         JobStepTaskService jobStepTaskService,
                         JobStepTaskCommonService jobStepTaskCommonService,
                         JobStepTaskWorkerService jobStepTaskWorkerService,
                         JobStepTaskResultService jobStepTaskResultService,
                         JobStepTaskTextService jobStepTaskTextService,
                         TranslationService translationService,
                         WorkTemplateStepRepository workTemplateStepRepository,
                         ExcelUtil excelUtil) {
        this.jobRepository = jobRepository;
        this.jobStepService = jobStepService;
        this.jobStepTaskService = jobStepTaskService;
        this.jobStepTaskCommonService = jobStepTaskCommonService;
        this.jobStepTaskWorkerService = jobStepTaskWorkerService;
        this.jobStepTaskResultService = jobStepTaskResultService;
        this.jobStepTaskTextService = jobStepTaskTextService;
        this.translationService = translationService;
        this.workTemplateStepRepository = workTemplateStepRepository;
        this.excelUtil = excelUtil;
    }

    @Transactional
    public void createJobs(Long userId, Long workId, Long workTemplateId, Integer workTemplateStepNum, List<MultipartFile> files, UploadFileType inputType) {
        log.trace("createJob Start... userId={}, workId={}, workTemplateId={}, workTemplateStepNum={}, files={}, inputType={}", userId, workId, workTemplateId, workTemplateStepNum, files, inputType);

        for (MultipartFile file : files) {
            createJobByText(userId, workId, workTemplateId, workTemplateStepNum, file);
        }
    }


    public void createJobByText(Long userId, Long workId, Long workTemplateId, Integer workTemplateStepNum, MultipartFile file) {
//
        final List<String> sourceTexts = excelUtil.convertExcelFile(file);
        final Job job = new Job(userId, workId, file.getOriginalFilename(), sourceTexts.size());
        jobRepository.insertJob(job);

        // file 생성
//        jobFileService.createJobFile(job, file);

        // JobStep all 생성
        final List<JobStep> createdJobSteps = jobStepService.createJobSteps(job.getId(), workTemplateId);

        // task 생성
        final JobStep jobStep =
                createdJobSteps.stream()
                        .filter(createdJobStep -> createdJobStep.getWorkTemplateStepNum().equals(workTemplateStepNum))
                        .findFirst()
                        .get();

        final WorkTemplateStep workTemplateStep = workTemplateStepRepository.selectWorkTemplateStep(jobStep.getWorkTemplateId(), jobStep.getWorkTemplateStepNum());
        final JobStepResultStatus status = JobStepResultStatus.Completed;
        final List<JobStepTask> createdJobStepTasks = jobStepTaskService.createJobStepTasks(jobStep.getJobId(), jobStep.getJobStepNum(), workTemplateStep.getInputType(),workTemplateStep.getResultType(), status, sourceTexts.size());

        // workers 생성
        final List<JobStepTaskWorker> jobStepTaskWorkers = jobStepTaskWorkerService.convertJobStepTasksToJobStepTaskWorkers(createdJobStepTasks, userId);
        jobStepTaskWorkerService.createJobStepTaskWorkers(jobStepTaskWorkers);

        // jobStepTaskResult 생성
        final List<JobStepTaskResult> jobStepTaskResults = jobStepTaskResultService.convertJobStepTaskResults(createdJobStepTasks, userId, 1);
        jobStepTaskResultService.createJobStepTaskResults(jobStepTaskResults);

        // text 생성
        final List<JobStepTaskText> jobStepTaskTexts = jobStepTaskTextService.convertJobStepTaskTexts(jobStepTaskResults, sourceTexts);
        jobStepTaskTextService.createJobStepTaskTexts(jobStepTaskTexts);


        // 다음 Step이 MachineTranslation라면 배치시작.
        // TODO 배치 분기처리...
        final WorkTemplateStep nextWorkTemplateStep = workTemplateStepRepository.selectWorkTemplateStep(workTemplateId, workTemplateStepNum+1);
        if (nextWorkTemplateStep.getType().equals(TemplateStepType.Machine)) {

            // TODO Machine => Translation, STT, Speller 3가지 분기처리 필요.
            translationService.translateBatch(job.getId(), nextWorkTemplateStep, jobStepTaskResults);
        } else {
            jobStepTaskCommonService.createNextJobStepTasks(jobStepTaskResults);
        }
    }

    public JobStepTransfers getJobStepTransfers(Long workTemplateId, Integer workTemplateStepNum, Long userId, Integer page, Integer rowsPerPage) {
        return jobStepService.getJobStepTransfers(workTemplateId, workTemplateStepNum, userId, page, rowsPerPage);
    }
}
