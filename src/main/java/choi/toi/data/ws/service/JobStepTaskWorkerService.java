package choi.toi.data.ws.service;

import choi.toi.data.ws.model.JobStep;
import choi.toi.data.ws.model.JobStepTask;
import choi.toi.data.ws.model.JobStepTaskWorker;
import choi.toi.data.ws.model.support.JobStepResultStatus;
import choi.toi.data.ws.model.transfer.CreateJobStepTaskRowWorkerTransfer;
import choi.toi.data.ws.model.transfer.CreateJobStepTaskWorkerTransfer;
import choi.toi.data.ws.repository.JobStepTaskBatchRepository;
import choi.toi.data.ws.repository.JobStepTaskRepository;
import choi.toi.data.ws.repository.JobStepTaskWorkerBatchInsertRepository;
import choi.toi.data.ws.repository.JobStepTaskWorkerRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.ListUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class JobStepTaskWorkerService {

    private JobStepTaskWorkerRepository jobStepTaskWorkerRepository;
    private JobStepTaskWorkerBatchInsertRepository jobStepTaskWorkerBatchInsertRepository;
    private JobStepTaskRepository jobStepTaskRepository;
    private JobStepTaskBatchRepository jobStepTaskBatchRepository;
    private ModelMapper modelMapper;

    @Autowired
    public JobStepTaskWorkerService(JobStepTaskWorkerRepository jobStepTaskWorkerRepository,
                                    JobStepTaskWorkerBatchInsertRepository jobStepTaskWorkerBatchInsertRepository,
                                    JobStepTaskRepository jobStepTaskRepository,
                                    JobStepTaskBatchRepository jobStepTaskBatchRepository,
                                    ModelMapper modelMapper) {
        this.jobStepTaskWorkerRepository = jobStepTaskWorkerRepository;
        this.jobStepTaskWorkerBatchInsertRepository = jobStepTaskWorkerBatchInsertRepository;
        this.jobStepTaskRepository = jobStepTaskRepository;
        this.jobStepTaskBatchRepository = jobStepTaskBatchRepository;
        this.modelMapper = modelMapper;
    }

    public void createJobStepTaskWorker(JobStepTaskWorker jobStepTaskWorker) {
        jobStepTaskWorkerRepository.insertJobStepTaskWorker(jobStepTaskWorker);
    }

    public void createJobStepTaskWorkers(List<JobStepTaskWorker> jobStepTaskWorkers) {
        jobStepTaskWorkerBatchInsertRepository.batchInsertJobStepTaskWorkers(jobStepTaskWorkers);
    }

    public void createJobStepTaskWorkers(CreateJobStepTaskWorkerTransfer jobStepTaskWorkerTransfer) {
        log.trace("createJobStepTaskWorkers Start... jobStepTaskWorkerTransfer={}", jobStepTaskWorkerTransfer);

        final List<JobStepTaskWorker> jobStepTaskWorkers = new ArrayList<>();
        List<JobStepTask> jobStepTasks = new ArrayList<>();

        final List<JobStep> jobSteps = jobStepTaskWorkerTransfer.getJobSteps();
        final List<Long> userIds = jobStepTaskWorkerTransfer.getUserIds();

        for (JobStep jobStep : jobSteps) {
            final List<JobStepTask> selectedJobStepTasks = jobStepTaskRepository.selectJobStepTasks(jobStep.getJobId(), jobStep.getJobStepNum(), JobStepResultStatus.Created);

            for (int i = 0 ; i<selectedJobStepTasks.size() ; i++) {

                final JobStepTask jobStepTask = selectedJobStepTasks.get(i);

                final int userIndex = i % userIds.size();
                final Long userId = userIds.get(userIndex);

                final JobStepTaskWorker jobStepTaskWorker =
                        modelMapper.map(jobStepTask, JobStepTaskWorker.class).toBuilder()
                                .userId(userId)
                                .build();
                jobStepTaskWorkers.add(jobStepTaskWorker);
                jobStepTask.setStatus(JobStepResultStatus.Assigned);
            }
            jobStepTasks = ListUtils.union(jobStepTasks, selectedJobStepTasks);
        }

        jobStepTaskWorkerBatchInsertRepository.batchInsertJobStepTaskWorkers(jobStepTaskWorkers);
        jobStepTaskBatchRepository.batchUpdateJobStepTasks(jobStepTasks);
    }



    public void createJobStepTaskRowWorkers(CreateJobStepTaskRowWorkerTransfer jobStepTaskRowWorkerTransfer) {

        final List<JobStepTaskWorker> jobStepTaskWorkers = new ArrayList<>();
        final List<Long> userIds = jobStepTaskRowWorkerTransfer.getUserIds();
        JobStepTask jobStepTask = jobStepTaskRowWorkerTransfer.getJobStepTask();
        for (Long userId : userIds) {
            final JobStepTaskWorker jobStepTaskWorker =
                    modelMapper.map(jobStepTask, JobStepTaskWorker.class).toBuilder()
                            .userId(userId)
                            .build();
            jobStepTaskWorkers.add(jobStepTaskWorker);
            jobStepTask.setStatus(JobStepResultStatus.Assigned);
        }

        jobStepTaskWorkerBatchInsertRepository.batchInsertJobStepTaskWorkers(jobStepTaskWorkers);
        jobStepTaskRepository.updateJobStepTask(jobStepTask);
    }


    public JobStepTaskWorker getJobStepTaskWorker(Long jobId,
                                                  Integer jobStepNum,
                                                  Integer jobStepTaskNum,
                                                  Long userId) {
        return jobStepTaskWorkerRepository.selectJobStepTaskWorker(jobId, jobStepNum, jobStepTaskNum, userId);
    }

    public List<JobStepTaskWorker> getJobStepTaskWorkers(Long jobId,
                                                         Integer jobStepNum,
                                                         Integer jobStepTaskNum) {
        return jobStepTaskWorkerRepository.selectJobStepTaskWorkers(jobId, jobStepNum, jobStepTaskNum);
    }

    public List<JobStepTaskWorker> getJobStepTaskWorkers(Long jobId,
                                                         Integer jobStepNum) {
        return jobStepTaskWorkerRepository.selectJobStepTaskWorkers(jobId, jobStepNum);
    }
    public List<JobStepTaskWorker> selectJobStepWorkersByJobStepId(Long jobId,
                                                                   Integer jobStepNum) {
        return jobStepTaskWorkerRepository.selectJobStepWorkersByJobStepId(jobId, jobStepNum);
    }

//    public JobStepTaskWorker modifyJobStepTaskWorker(JobStepTaskWorker jobStepTaskWorker) {
//        jobStepTaskWorkerRepository.updateJobStepTaskWorker(jobStepTaskWorker);
//        return getJobStepTaskWorker(jobStepTaskWorker.getJobId(), jobStepTaskWorker.getJobStepNum(), jobStepTaskWorker.getJobStepTaskNum(), jobStepTaskWorker.getUserId());
//    }

    public void removeJobStepTaskWorker(Long jobId,
                                        Integer jobStepNum,
                                        Integer jobStepTaskNum,
                                        Long userId) {
        jobStepTaskWorkerRepository.deleteJobStepTaskWorker(jobId, jobStepNum, jobStepTaskNum, userId);
    }

    public List<JobStepTaskWorker> convertJobStepTasksToJobStepTaskWorkers(List<JobStepTask> jobStepTasks, Long userId) {
        final List<JobStepTaskWorker> jobStepTaskWorkers = new ArrayList<>();

        for (JobStepTask jobStepTask : jobStepTasks) {
            final JobStepTaskWorker jobStepTaskWorker = convertJobStepTaskToJobStepTaskWorker(jobStepTask, userId);
            jobStepTaskWorkers.add(jobStepTaskWorker);
        }

        return jobStepTaskWorkers;
    }
    public JobStepTaskWorker convertJobStepTaskToJobStepTaskWorker(JobStepTask jobStepTask, Long userId) {
        return modelMapper.map(jobStepTask, JobStepTaskWorker.class).toBuilder().userId(userId).build();
    }
}
