package choi.toi.data.ws.service;

import choi.toi.data.ws.model.*;
import choi.toi.data.ws.model.support.JobStepResultStatus;
import choi.toi.data.ws.model.support.JobStepResultType;
import choi.toi.data.ws.model.transfer.JobStepTaskResultTransfer;
import choi.toi.data.ws.model.transfer.JobStepTaskTransfer;
import choi.toi.data.ws.repository.*;
import choi.toi.data.ws.service.common.JobStepTaskCommonService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import choi.toi.data.ws.repository.JobStepTaskTextRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static choi.toi.data.ws.model.support.JobStepResultType.*;

@Slf4j
@Service
public class JobStepTaskService {

    private JobStepTaskRepository jobStepTaskRepository;
    private JobStepTaskBatchRepository jobStepTaskBatchRepository;
    private JobRepository jobRepository;
    private WorkRepository workRepository;
    private WorkTemplateStepRepository workTemplateStepRepository;
    private JobStepTaskWorkerRepository jobStepTaskWorkerRepository;
    private JobStepTaskResultRepository jobStepTaskResultRepository;
    private JobStepTaskResultService jobStepTaskResultService;
    private JobStepTaskTextRepository jobStepTaskTextRepository;
    private JobStepTaskAudioRepository jobStepTaskAudioRepository;
    private JobStepTaskTagRepository jobStepTaskTagRepository;
    private JobStepTaskCommonService jobStepTaskCommonService;
    private MachineService machineService;
    private ObjectMapper objectMapper;

    @Autowired
    public JobStepTaskService(JobStepTaskRepository jobStepTaskRepository,
                              JobStepTaskBatchRepository jobStepTaskBatchRepository,
                              JobRepository jobRepository,
                              WorkRepository workRepository,
                              WorkTemplateStepRepository workTemplateStepRepository,
                              JobStepTaskWorkerRepository jobStepTaskWorkerRepository,
                              JobStepTaskResultRepository jobStepTaskResultRepository,
                              JobStepTaskResultService jobStepTaskResultService,
                              JobStepTaskTextRepository jobStepTaskTextRepository,
                              JobStepTaskAudioRepository jobStepTaskAudioRepository,
                              JobStepTaskTagRepository jobStepTaskTagRepository,
                              JobStepTaskCommonService jobStepTaskCommonService,
                              MachineService machineService,
                              ObjectMapper objectMapper) {
        this.jobStepTaskRepository = jobStepTaskRepository;
        this.jobStepTaskBatchRepository = jobStepTaskBatchRepository;
        this.jobRepository = jobRepository;
        this.workRepository = workRepository;
        this.workTemplateStepRepository = workTemplateStepRepository;
        this.jobStepTaskWorkerRepository = jobStepTaskWorkerRepository;
        this.jobStepTaskResultRepository = jobStepTaskResultRepository;
        this.jobStepTaskResultService = jobStepTaskResultService;
        this.jobStepTaskTextRepository = jobStepTaskTextRepository;
        this.jobStepTaskAudioRepository = jobStepTaskAudioRepository;
        this.jobStepTaskTagRepository = jobStepTaskTagRepository;
        this.jobStepTaskCommonService = jobStepTaskCommonService;
        this.machineService = machineService;
        this.objectMapper = objectMapper;
    }

    public void createJobStepTask(JobStepTask jobStepTask) {
        jobStepTaskRepository.insertJobStepTask(jobStepTask);
    }

    public List<JobStepTask> createJobStepTasks(Long jobId, Integer jobStepNum, JobStepResultType inputType, JobStepResultType resultType, JobStepResultStatus status, int count) {
        final List<JobStepTask> jobStepTasks = new ArrayList<>();

        for (int i = 0; i < count; i++) {
            final JobStepTask jobStepTask = convertJobStepTask(jobId, jobStepNum, i+1, inputType, resultType, status);
            jobStepTasks.add(jobStepTask);
        }

        jobStepTaskBatchRepository.batchInsertJobStepTasks(jobStepTasks);
        return jobStepTasks;
    }

    public List<JobStepTaskTransfer> getJobStepTaskTransfers(Long jobId, Integer jobStepNum, Long userId) {

        final Job job = jobRepository.selectJob(jobId);
        final Work work = workRepository.selectWork(job.getWorkId());
        userId = work.getUserId().equals(userId) ? 0 : userId;

        List<JobStepTaskTransfer> jobStepTaskTransfers = jobStepTaskRepository.selectJobStepTaskTransfers(jobId, jobStepNum, userId);
        jobStepTaskTransfers = getJobStepTaskResultsByJobStepTaskTransfer(jobStepTaskTransfers);
        log.debug("getJobStepTaskResultsByJobStepTaskTransfer Success!!  jobStepTaskTransfers : {}", jobStepTaskTransfers);

        return jobStepTaskTransfers;
    }

    public List<JobStepTaskTransfer> getJobStepTaskTransfersByArray(Long jobId, Integer jobStepNum, Long userId, Integer startNum, Integer dataLength) {

        final Job job = jobRepository.selectJob(jobId);
        final Work work = workRepository.selectWork(job.getWorkId());
        userId = work.getUserId().equals(userId) ? 0 : userId;

        List<JobStepTaskTransfer> jobStepTaskTransfers = jobStepTaskRepository.selectJobStepTaskTransfersByArray(jobId, jobStepNum, userId,startNum,dataLength);
        jobStepTaskTransfers = getJobStepTaskResultsByJobStepTaskTransfer(jobStepTaskTransfers);
        log.debug("getJobStepTaskResultsByJobStepTaskTransfer Success!!  jobStepTaskTransfers : {}", jobStepTaskTransfers);

        return jobStepTaskTransfers;
    }

    public Integer getJobStepTasksCount(Long jobId, Integer jobStepNum, Long userId) {

        final Job job = jobRepository.selectJob(jobId);
        final Work work = workRepository.selectWork(job.getWorkId());
        userId = work.getUserId().equals(userId) ? 0 : userId;

        Integer jobStepTasksCount = jobStepTaskRepository.selectJobStepTasksCount(jobId, jobStepNum, userId);

        return jobStepTasksCount;
    }

    private List<JobStepTaskTransfer> getJobStepTaskResultsByJobStepTaskTransfer(List<JobStepTaskTransfer> jobStepTaskTransfers) {
        log.trace("getJobStepTaskResultsByJobStepTaskTransfer Start...  jobStepTaskTransfers : {}", jobStepTaskTransfers);
        jobStepTaskTransfers = jobStepTaskTransfers.stream().map(jobStepTaskTransfer -> {

            final List<JobStepTaskResultTransfer> jobStepTaskResults =
                    jobStepTaskTransfer.getJobStepTaskResults().stream()
                            .map(jobStepTaskResult ->
                                    jobStepTaskResultService.getJobStepTaskResult(jobStepTaskResult)).collect(Collectors.toList());
            jobStepTaskTransfer.setJobStepTaskResults(jobStepTaskResults);

            if (jobStepTaskTransfer.getPreJobStepTaskResult() != null) {
                final JobStepTaskResultTransfer preJobStepTaskResult = jobStepTaskResultService.getJobStepTaskResult(jobStepTaskTransfer.getPreJobStepTaskResult());
                jobStepTaskTransfer.setPreJobStepTaskResult(preJobStepTaskResult);
            }

            return jobStepTaskTransfer;
        }).collect(Collectors.toList());

        return jobStepTaskTransfers;
    }

    public JobStepTask getJobStepTask(Long jobId, Integer jobStepNum, Integer jobStepTaskNum) {
        return jobStepTaskRepository.selectJobStepTask(jobId, jobStepNum, jobStepTaskNum);
    }
    public List<JobStepTask> getJobStepTasks(Long preJobStepTaskResultId) {
        return jobStepTaskRepository.selectJobStepTasksByPreJobStepTaskResultId(preJobStepTaskResultId);
    }

    public List<JobStepTask> getJobStepTasks(Long jobId, Integer jobStepNum) {
        return jobStepTaskRepository.selectJobStepTasks(jobId, jobStepNum);
    }

    public JobStepTask modifyJobStepTask(JobStepTask jobStepTask) {
        jobStepTaskRepository.updateJobStepTask(jobStepTask);
        return getJobStepTask(jobStepTask.getJobId(), jobStepTask.getJobStepNum(), jobStepTask.getJobStepTaskNum());
    }

    @Transactional
    public void rejectJobStepTask(JobStepTaskReject jobStepTaskReject, Long userId) {
        log.trace("rejectJobStepTask Start... jobStepTaskReject={}, userId={}", jobStepTaskReject, userId);

        JobStepTaskWorker jobStepTaskWorker = jobStepTaskWorkerRepository.selectJobStepTaskWorker(jobStepTaskReject.getJobId(), jobStepTaskReject.getJobStepNum(), jobStepTaskReject.getJobStepTaskNum(),userId);
        if(jobStepTaskWorker == null) {
            return;
        }

        // create JobStepTaskResult
        final JobStepTask jobStepTask = jobStepTaskRepository.selectJobStepTask(jobStepTaskReject.getJobId(), jobStepTaskReject.getJobStepNum(), jobStepTaskReject.getJobStepTaskNum());
        final JobStepTaskResult jobStepTaskResult = jobStepTaskResultService.convertJobStepTaskResult(jobStepTask, userId, 1);
        jobStepTaskResultService.createJobStepTaskResult(jobStepTaskResult);

        // create JobStepTaskResultDetail
        switch (jobStepTaskResult.getResultType()) {
            case Text:
                final JobStepTaskText prevJobStepTaskText = jobStepTaskTextRepository.selectJobStepTaskText(jobStepTask.getPreJobStepTaskResultId());
                prevJobStepTaskText.setJobStepTaskResultId(jobStepTaskResult.getId());
                jobStepTaskTextRepository.insertJobStepTaskText(prevJobStepTaskText);
                break;
            case Audio:
                //jobStepTaskAudioRepository.insertJobStepTaskAudio(jobStepTaskResult.getJobStepTaskAudio());
                break;
            case Tag:
               // jobStepTaskTagRepository.insertJobStepTaskTag(jobStepTaskResult.getJobStepTaskTag());
                break;
        }

        // 반려
        final List<JobStepTask> jobStepTasks =
                jobStepTaskCommonService.getPreJobStepTasks(jobStepTaskResult.getId(), jobStepTaskReject.getTargetStepNum());

        for (JobStepTask preJobStepTask : jobStepTasks) {
            JobStepResultStatus status = JobStepResultStatus.RejectWaiting;
            if (jobStepTaskReject.getTargetStepNum().equals(preJobStepTask.getJobStepNum())) { status = JobStepResultStatus.Rejected; }
            jobStepTaskRepository.updateJobStepTaskForReject(preJobStepTask.getJobId(), preJobStepTask.getJobStepNum(), preJobStepTask.getJobStepTaskNum(), status, jobStepTaskReject.getRejectComment());
        }
    }
    @Transactional
    public void tempRejectJobStepTask(JobStepTaskReject jobStepTaskReject, Long userId) {
        log.trace("rejectJobStepTask Start... jobStepTaskReject={}, userId={}", jobStepTaskReject, userId);

        JobStepTaskWorker jobStepTaskWorker = jobStepTaskWorkerRepository.selectJobStepTaskWorker(jobStepTaskReject.getJobId(), jobStepTaskReject.getJobStepNum(), jobStepTaskReject.getJobStepTaskNum(),userId);
        if(jobStepTaskWorker == null) {
            return;
        }
        //pre_job_step_task_result_id로 target Tasks 구함
        final JobStepTask sourceJobStepTask =
                jobStepTaskCommonService.getPreJobStepTask(jobStepTaskReject.getJobId(), jobStepTaskReject.getJobStepNum(), jobStepTaskReject.getJobStepTaskNum(), jobStepTaskReject.getTargetStepNum());

        sourceJobStepTask.setRejectComment(jobStepTaskReject.getRejectComment());
        jobStepTaskRepository.updateJobStepTaskForReject(sourceJobStepTask.getJobId(),sourceJobStepTask.getJobStepNum(),sourceJobStepTask.getRejectedJobStepTaskNum(),sourceJobStepTask.getStatus(),sourceJobStepTask.getRejectComment());
//        for(JobStepTask sourceJobStepTask : sourceJobStepTasks){
//            //target tasks로 Results 찾기
//            List<JobStepTaskResult> jobStepTaskResults = jobStepTaskResultService.getJobStepTaskResults(sourceJobStepTask.getJobId(), sourceJobStepTask.getJobStepNum(), sourceJobStepTask.getRejectedJobStepTaskNum());
//            for(JobStepTaskResult jobStepTaskResult : jobStepTaskResults){
                //찾은 Results로 prev result id가 찾은 results와 같은 task 찾기
//                List<JobStepTask> tempJobStepTasks = jobStepTaskCommonService.getJobStepTasksByPrevResultId(sourceJobStepTask.getPreJobStepTaskResultId());
//                for(JobStepTask tempJobStepTask : tempJobStepTasks){
//                    //reject로 변경
//                    tempJobStepTask.setStatus(JobStepResultStatus.Rejected);
//                    jobStepTaskRepository.updateJobStepTask(tempJobStepTask);
//                    List<JobStepTask> nextStepJobStepTasks = jobStepTaskCommonService.getJobStepTasksByPrevResultId(tempJobStepTask.getPreJobStepTaskResultId());
// //               }
// //           }
//        }
        rejectJopStepTasks(sourceJobStepTask.getPreJobStepTaskResultId());
        jobStepTaskCommonService.reproduceJobStepTask(sourceJobStepTask,jobStepTaskReject.getRejectComment());
    }

    public void rejectJopStepTasks(Long resultId){
        List<JobStepTask> tempJobStepTasks = jobStepTaskCommonService.getJobStepTasksByPrevResultId(resultId);
        for(JobStepTask tempJobStepTask : tempJobStepTasks){
            tempJobStepTask.setStatus(JobStepResultStatus.Rejected);
            jobStepTaskRepository.updateJobStepTask(tempJobStepTask);
            List<JobStepTaskResult> jobStepTaskResults = jobStepTaskResultRepository.selectJobStepTaskResults(tempJobStepTask.getJobId(), tempJobStepTask.getJobStepNum(), tempJobStepTask.getJobStepTaskNum());
            for(JobStepTaskResult jobStepTaskResult:jobStepTaskResults){
                rejectJopStepTasks(jobStepTaskResult.getId());
            }
        }
    }

    public void modifyJobStepTaskStatus(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, JobStepResultStatus status) {
        jobStepTaskRepository.updateJobStepTask(jobId, jobStepNum, jobStepTaskNum, status);
    }

    public List<JobStepTask> modifyJobStepTasks(Long jobId, Integer jobStepNum, JobStepResultStatus status) {
        jobStepTaskRepository.updateJobStepTasks(jobId, jobStepNum, status);
        return getJobStepTasks(jobId, jobStepNum);
    }


    public void removeJobStepTask(Long jobId, Integer jobStepNum, Integer jobStepTaskNum) {
        jobStepTaskRepository.deleteJobStepTask(jobId, jobStepNum, jobStepTaskNum);
    }

    JobStepTask convertJobStepTask(Long jobId, Integer jobStepNum, Integer index, JobStepResultType inputType, JobStepResultType resultType, JobStepResultStatus status) {
        return JobStepTask.builder()
                .jobId(jobId)
                .jobStepNum(jobStepNum)
                .jobStepTaskNum(index)
                .index(index)
                .inputType(inputType)
                .resultType(resultType)
                .status(status)
                .build();
    }

    @Transactional
    public void processNextJobStepTask(JobStepTaskResult sourceJobStepTaskResult) {
        final JobStepTask jobStepTask =  getJobStepTask(sourceJobStepTaskResult.getJobId(), sourceJobStepTaskResult.getJobStepNum(), sourceJobStepTaskResult.getJobStepTaskNum());
        if(jobStepTask != null && jobStepTask.getStatus() == JobStepResultStatus.Completed) return;

        modifyJobStepTaskStatus(sourceJobStepTaskResult.getJobId(), sourceJobStepTaskResult.getJobStepNum(), sourceJobStepTaskResult.getJobStepTaskNum(), JobStepResultStatus.Completed);

        final JobStepTask nextJobStepTask = jobStepTaskCommonService.postCompleteJobStepTask(sourceJobStepTaskResult);
        final boolean isMachine = machineService.isMachine(nextJobStepTask);
        if (isMachine) {
            List<JobStepTaskResult> jobStepTaskResults = machineService.executeMachineByJobStepTask(nextJobStepTask);
            jobStepTaskResults.stream().forEach(jobStepTaskResult -> processNextJobStepTask(jobStepTaskResult));
        }
    }

    //JobStepTaskResultService에서 여기로 옮김
    @Transactional
    public void inspectAllJobStepTask(Long jobId, Integer jobStepNum, Long userId) {
        log.trace("inspectAllJobStepTask Start... jobId={}, jobStepNum={}, userId={}", jobId, jobStepNum, userId);
        final List<JobStepTask> jobStepTasks = jobStepTaskRepository.selectJobStepTasks(jobId, jobStepNum);
        log.trace("get jobStepTasks Start... {}", jobStepTasks);
        for (JobStepTask jobStepTask : jobStepTasks) {
            //if (jobStepTask.getStatus().equals(JobStepResultStatus.Assigned) || jobStepTask.getStatus().equals(JobStepResultStatus.Rejected)) {
            if (jobStepTask.getStatus().equals(JobStepResultStatus.Assigned)) {
                inspectJobStepTask(jobStepTask, userId);
            }
        }
    }

    private void inspectJobStepTask(JobStepTask jobStepTask, Long userId) {
        final List<JobStepTaskWorker> workers = jobStepTaskWorkerRepository.selectJobStepTaskWorkers(jobStepTask.getJobId(), jobStepTask.getJobStepNum(), jobStepTask.getJobStepTaskNum());
        if (workers != null && workers.size() > 0) {
            final JobStepTaskWorker worker = workers.get(0);
            if (!worker.getUserId().equals(userId))
                return;
            //final List<JobStepTaskResult> jobStepTaskResults = jobStepTaskResultService.getJobStepTaskResults(worker.getJobId(), worker.getJobStepNum() - 1, worker.getJobStepTaskNum());

            //if (jobStepTaskResults != null && jobStepTaskResults.size() > 0) {
            JobStepTaskResult sourceStepTaskResult = JobStepTaskResult.builder().
                    jobId(worker.getJobId()).
                    jobStepNum(worker.getJobStepNum()).
                    jobStepTaskNum(worker.getJobStepTaskNum()).
                    userId(userId).
                    index(1).
                    resultType(jobStepTask.getResultType()).
                    build();

            if(jobStepTask.getResultType().equals(Text)){
                JobStepTaskText sourceText = jobStepTaskTextRepository.selectJobStepTaskText(jobStepTask.getPreJobStepTaskResultId());
                sourceStepTaskResult.setJobStepTaskText(sourceText);
            }else if(jobStepTask.getResultType().equals(Audio)){
                JobStepTaskAudio sourceAudio = jobStepTaskAudioRepository.selectJobStepTaskAudio(jobStepTask.getPreJobStepTaskResultId());
                sourceStepTaskResult.setJobStepTaskAudio(sourceAudio);
            }else if(jobStepTask.getResultType().equals(Tag)) {
                JobStepTaskTag sourceTag = jobStepTaskTagRepository.selectJobStepTaskTag(jobStepTask.getPreJobStepTaskResultId());
                sourceStepTaskResult.setJobStepTaskTag(sourceTag);
            }
                processNextJobStepTask(sourceStepTaskResult);
           // }
        }
    }
}
