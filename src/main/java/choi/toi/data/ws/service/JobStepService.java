package choi.toi.data.ws.service;

import choi.toi.data.ws.model.JobStep;
import choi.toi.data.ws.model.JobStepTaskWorker;
import choi.toi.data.ws.model.Work;
import choi.toi.data.ws.model.WorkTemplateStep;
import choi.toi.data.ws.model.support.TaskStatusCount;
import choi.toi.data.ws.model.transfer.JobStepTransfer;
import choi.toi.data.ws.model.transfer.JobStepTransfers;
import choi.toi.data.ws.repository.JobStepRepository;
import choi.toi.data.ws.repository.WorkRepository;
import choi.toi.data.ws.repository.WorkTemplateStepRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class JobStepService {

    private JobStepRepository jobStepRepository;
    private JobStepTaskWorkerService jobStepTaskWorkerService;
    private WorkTemplateStepRepository workTemplateStepRepository;
    private WorkRepository workRepository;

    @Autowired
    public JobStepService(JobStepRepository jobStepRepository,
                          WorkTemplateStepRepository workTemplateStepRepository,
                          WorkRepository workRepository,
                          JobStepTaskWorkerService jobStepTaskWorkerService) {
        this.jobStepRepository = jobStepRepository;
        this.workTemplateStepRepository = workTemplateStepRepository;
        this.workRepository = workRepository;
        this.jobStepTaskWorkerService = jobStepTaskWorkerService;
    }

    public void createJobStep(JobStep jobStep) {
        jobStepRepository.insertJobStep(jobStep);
    }

    public List<JobStep> createJobSteps(Long jobId, Long workTemplateId) {
        final List<JobStep> jobSteps = new ArrayList<>();
        final List<WorkTemplateStep> workTemplateSteps = workTemplateStepRepository.selectWorkTemplateSteps(workTemplateId);

        for (WorkTemplateStep workTemplateStep : workTemplateSteps) {
            final JobStep jobStep = JobStep.builder()
                    .jobId(jobId)
                    .stepType(workTemplateStep.getType())
                    .workTemplateId(workTemplateStep.getWorkTemplateId())
                    .workTemplateStepNum(workTemplateStep.getWorkTemplateStepNum())
                    .build();
            jobStepRepository.insertJobStep(jobStep);
            jobSteps.add(jobStep);
        }

        return jobSteps;
    }

    public List<JobStep> getJobStepsByJobId(Long jobId) {
        return jobStepRepository.selectJobStepByJobId(jobId);
    }

    public JobStep getJobStep(Long jobId, Integer jobStepNum) {
        return jobStepRepository.selectJobStep(jobId, jobStepNum);
    }

    public JobStepTransfers getJobStepTransfers(Long workTemplateId, Integer workTemplateStepNum, Long userId, Integer page, Integer rowsPerPage) {

        final Work work = workRepository.selectWorkByWorkTemplateId(workTemplateId);
        userId = work.getUserId().equals(userId) ? 0L : userId;

        final List<JobStepTransfer> jobStepTransfers = jobStepRepository.selectJobStepTransfer(workTemplateId, workTemplateStepNum, userId, page, rowsPerPage);

        final List<JobStepTransfer> jobStepTransfersWithWorkers = jobStepTransfers.stream().map(jobStepTransfer -> {
            final List<JobStepTaskWorker> workers = jobStepTaskWorkerService.getJobStepTaskWorkers(jobStepTransfer.getJobId(), jobStepTransfer.getJobStepNum());
            jobStepTransfer.setWorkers(workers);
            return jobStepTransfer;
        }).collect(Collectors.toList());

        final int totalCount = jobStepRepository.selectJobStepTransferTotalCount(workTemplateId, workTemplateStepNum, userId);
        final List<TaskStatusCount> taskStatusCounts = jobStepRepository.selectJobStepTransferStatusCount(workTemplateId, workTemplateStepNum, userId);

        final int createdCount = taskStatusCounts.stream()
                .map(taskStatusCount -> taskStatusCount.getCreatedCount() + taskStatusCount.getAssignedCount() + taskStatusCount.getRejectedCount())
                .reduce(0, Integer::sum);

        final int completedCount = taskStatusCounts.stream()
                .map(taskStatusCount -> taskStatusCount.getCompletedCount() + taskStatusCount.getAcceptedCount())
                .reduce(0, Integer::sum);

        return JobStepTransfers.builder()
                .jobStepTransfers(jobStepTransfersWithWorkers)
                .totalCount(totalCount)
                .createdCount(createdCount)
                .completedCount(completedCount)
                .build();
    }

    public JobStep getJobStepByWorkTemplateId(Long jobId, Long workTemplateId, Integer workTemplateStepNum) {
        return jobStepRepository.selectJobStepByWorkTemplateId(jobId, workTemplateId, workTemplateStepNum);
    }

//    public JobStep modifyJobStep(JobStep jobStep) {
//        jobStepRepository.updateJobStep(jobStep);
//        return getJobStep(jobStep.getJobId(), jobStep.getJobStepNum());
//    }

    public void removeJobStep(Long jobId, Integer jobStepNum) {
        jobStepRepository.removeJobStep(jobId, jobStepNum);
    }

//    public JobStep convertJobStep(Long jobId, StepType type, Long workTemplateId, Integer workTemplateStepNum) {
//        return JobStep.builder()
//                .jobId(jobId)
//                .stepType(StepType.Upload)
//                .workTemplateId(workTemplateId)
//                .workTemplateStepNum(workTemplateStepNum)
//                .build();
//    }
}
