package choi.toi.data.ws.service.common;

import choi.toi.data.ws.model.JobStepTask;
import choi.toi.data.ws.model.JobStepTaskResult;
import choi.toi.data.ws.model.JobStepTaskWorker;
import choi.toi.data.ws.model.WorkTemplateStep;
import choi.toi.data.ws.model.support.JobStepResultStatus;
import choi.toi.data.ws.repository.JobStepTaskRepository;
import choi.toi.data.ws.repository.JobStepTaskWorkerRepository;
import choi.toi.data.ws.repository.WorkTemplateStepRepository;
import choi.toi.data.ws.service.JobStepTaskResultService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class JobStepTaskCommonService {

    private JobStepTaskRepository jobStepTaskRepository;
    private JobStepTaskWorkerRepository jobStepTaskWorkerRepository;
    private WorkTemplateStepRepository workTemplateStepRepository;
    private JobStepTaskResultService jobStepTaskResultService;

    @Autowired
    public JobStepTaskCommonService(JobStepTaskRepository jobStepTaskRepository,
                                    JobStepTaskWorkerRepository jobStepTaskWorkerRepository,
                                    WorkTemplateStepRepository workTemplateStepRepository,
                                    JobStepTaskResultService jobStepTaskResultService) {
        this.jobStepTaskRepository = jobStepTaskRepository;
        this.jobStepTaskWorkerRepository = jobStepTaskWorkerRepository;
        this.workTemplateStepRepository = workTemplateStepRepository;
        this.jobStepTaskResultService = jobStepTaskResultService;
    }

    public List<JobStepTask> getPreJobStepTasks(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Integer targetJobStepNum ) {
        List<JobStepTask> jobStepTasks = new ArrayList<>();

        JobStepTask jobStepTask = jobStepTaskRepository.selectJobStepTask(jobId, jobStepNum, jobStepTaskNum);
        jobStepTasks.add(jobStepTask);

        while (true) {
            jobStepTask = jobStepTaskRepository.selectJobStepTask(jobStepTask.getPreJobStepTaskResultId());
            jobStepTasks.add(jobStepTask);

            if (jobStepTask.getJobStepNum().equals(targetJobStepNum)) {
                break;
            }
        }

        return jobStepTasks;
    }
    public JobStepTask getPreJobStepTask(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Integer targetJobStepNum ) {
       //List<JobStepTask> jobStepTasks = new ArrayList<>();

        JobStepTask jobStepTask = jobStepTaskRepository.selectJobStepTask(jobId, jobStepNum, jobStepTaskNum);
        //jobStepTasks.add(jobStepTask);

        while (true) {
            jobStepTask = jobStepTaskRepository.selectJobStepTask(jobStepTask.getPreJobStepTaskResultId());
            //jobStepTasks.add(jobStepTask);

            if (jobStepTask.getJobStepNum().equals(targetJobStepNum)) {
                break;
            }
        }

        return jobStepTask;
    }

    public List<JobStepTask> getPreJobStepTasks(Long jobStepTaskResultId, Integer targetJobStepNum ) {
        List<JobStepTask> jobStepTasks = new ArrayList<>();

        while (true) {
            final JobStepTask jobStepTask = jobStepTaskRepository.selectJobStepTask(jobStepTaskResultId);
            jobStepTaskResultId = jobStepTask.getPreJobStepTaskResultId();
            jobStepTasks.add(jobStepTask);

            if (jobStepTask.getJobStepNum().equals(targetJobStepNum)) {
                break;
            }
        }
        return jobStepTasks;
    }

    public List<JobStepTask> getJobStepTasksByPrevResultId(Long jobStepTaskResultId) {
        List<JobStepTask> jobStepTasks = jobStepTaskRepository.selectNextJobStepTask(jobStepTaskResultId);

        return jobStepTasks;
    }


    public List<JobStepTask> createNextJobStepTasks(List<JobStepTaskResult> preJobStepTaskResults) {
        return preJobStepTaskResults.stream().map(preJobStepTaskResult -> createNextJobStepTask(preJobStepTaskResult)).collect(Collectors.toList());
    }
    public JobStepTask createNextJobStepTask(JobStepTaskResult preJobStepTaskResult) {
        final JobStepTask nextJobStepTask = convertNextJobStepTask(preJobStepTaskResult);
        jobStepTaskRepository.insertJobStepTask(nextJobStepTask);
        return nextJobStepTask;
    }
    public JobStepTask convertNextJobStepTask(JobStepTaskResult preJobStepTaskResult) {
        final int nextJobStepNum = preJobStepTaskResult.getJobStepNum() + 1;
        final WorkTemplateStep workTemplateStep = workTemplateStepRepository.selectWorkTemplateStepByJobId(preJobStepTaskResult.getJobId(), nextJobStepNum);
        final JobStepTask jobStepTask = jobStepTaskRepository.selectJobStepTask(preJobStepTaskResult.getJobId(), preJobStepTaskResult.getJobStepNum(), preJobStepTaskResult.getJobStepTaskNum());

        return JobStepTask.builder()
                .jobId(preJobStepTaskResult.getJobId())
                .jobStepNum(nextJobStepNum)
                .jobStepTaskNum(preJobStepTaskResult.getJobStepTaskNum())
                .index(jobStepTask.getIndex())
                .preJobStepTaskResultId(preJobStepTaskResult.getId())
                .inputType(workTemplateStep.getInputType())
                .resultType(workTemplateStep.getResultType())
                .status(JobStepResultStatus.Created)
                .build();
    }

    public JobStepTask postCompleteJobStepTask(JobStepTaskResult sourceJobStepTaskResult) {
        jobStepTaskResultService.createJobStepTaskResult(sourceJobStepTaskResult);
        jobStepTaskResultService.createJobStepTaskResultDetail(sourceJobStepTaskResult);

        return createNextJobStepTask(sourceJobStepTaskResult);
    }

    public void reproduceJobStepTask(JobStepTask sourceJobStepTask, String rejectComment){
        JobStepTask tempJobStepTask = createJobStepTaskForReject(sourceJobStepTask, rejectComment);
        jobStepTaskRepository.insertJobStepTask(tempJobStepTask);
        createJobStepTaskWorkersForReject(sourceJobStepTask, tempJobStepTask);
    }

    public void createJobStepTaskWorkersForReject(JobStepTask sourceJobStepTask,JobStepTask resultJobStepTask){
        List<JobStepTaskWorker> jobStepTaskWorkers = jobStepTaskWorkerRepository.selectJobStepTaskWorkers(sourceJobStepTask.getJobId(), sourceJobStepTask.getJobStepNum(), sourceJobStepTask.getJobStepTaskNum());
        for(JobStepTaskWorker jobStepTaskWorker : jobStepTaskWorkers){
            JobStepTaskWorker createdJobStepTaskWorker = JobStepTaskWorker.builder()
                    .jobId(resultJobStepTask.getJobId())
                    .jobStepNum(resultJobStepTask.getJobStepNum())
                    .jobStepTaskNum(resultJobStepTask.getJobStepTaskNum())
                    .userId(jobStepTaskWorker.getUserId())
                    .build();
            jobStepTaskWorkerRepository.insertJobStepTaskWorker(createdJobStepTaskWorker);
        }
    }

    public JobStepTask createJobStepTaskForReject(JobStepTask jobStepTask, String rejectComment){
        JobStepTask createdJobStepTask = JobStepTask.builder()
                .jobId(jobStepTask.getJobId())
                .jobStepNum(jobStepTask.getJobStepNum())
                .preJobStepTaskResultId(jobStepTask.getPreJobStepTaskResultId())
                .inputType(jobStepTask.getInputType())
                .resultType(jobStepTask.getResultType())
                .status(JobStepResultStatus.Assigned)
                .rejectComment(rejectComment)
                .index(jobStepTask.getIndex())
                .rejectedJobStepTaskNum(jobStepTask.getJobStepTaskNum())
                .build();
        return createdJobStepTask;
    }
}
