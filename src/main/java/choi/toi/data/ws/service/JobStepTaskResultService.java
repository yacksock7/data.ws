package choi.toi.data.ws.service;

import choi.toi.data.ws.model.*;
import choi.toi.data.ws.model.support.JobStepResultStatus;
import choi.toi.data.ws.model.support.JobStepResultType;
import choi.toi.data.ws.model.transfer.JobStepTaskResultTransfer;
import choi.toi.data.ws.model.transfer.JobStepTaskTransfer;
import choi.toi.data.ws.repository.*;
import lombok.extern.slf4j.Slf4j;
import choi.toi.data.ws.repository.JobStepTaskTextRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class JobStepTaskResultService {

    private JobStepTaskRepository jobStepTaskRepository;
    private JobStepTaskResultRepository jobStepTaskResultRepository;
    private JobStepTaskWorkerRepository jobStepTaskWorkerRepository;

    private JobStepTaskTextRepository jobStepTaskTextRepository;
    private JobStepTaskTextService jobStepTaskTextService;
    private JobStepTaskService jobStepTaskService;
    private JobStepTaskAudioRepository jobStepTaskAudioRepository;
    private JobStepTaskTagRepository jobStepTaskTagRepository;

    private ModelMapper modelMapper;

    @Autowired
    public JobStepTaskResultService(JobStepTaskRepository jobStepTaskRepository,
                                    JobStepTaskResultRepository jobStepTaskResultRepository,
                                    JobStepTaskWorkerRepository jobStepTaskWorkerRepository,

                                    JobStepTaskTextRepository jobStepTaskTextRepository,
                                    JobStepTaskTextService jobStepTaskTextService,
                                    JobStepTaskAudioRepository jobStepTaskAudioRepository,
                                    JobStepTaskTagRepository jobStepTaskTagRepository,
                                    ModelMapper modelMapper) {
        this.jobStepTaskRepository = jobStepTaskRepository;
        this.jobStepTaskResultRepository = jobStepTaskResultRepository;
        this.jobStepTaskWorkerRepository = jobStepTaskWorkerRepository;

        this.jobStepTaskTextRepository = jobStepTaskTextRepository;
        this.jobStepTaskTextService = jobStepTaskTextService;
        this.jobStepTaskAudioRepository = jobStepTaskAudioRepository;

        this.jobStepTaskTagRepository = jobStepTaskTagRepository;

        this.modelMapper = modelMapper;
    }

    public void createJobStepTaskResults(List<JobStepTaskResult> jobStepTaskResults) {
        jobStepTaskResults.stream().forEach(jobStepTaskResult -> createJobStepTaskResult(jobStepTaskResult));
    }
    public void createJobStepTaskResult(JobStepTaskResult jobStepTaskResult) {
        log.trace("createJobStepTaskResult Start... jobStepTaskResult={}", jobStepTaskResult);
        jobStepTaskResultRepository.insertJobStepTaskResult(jobStepTaskResult);
    }

    public void createJobStepTaskResultDetail(JobStepTaskResult jobStepTaskResult) {
        log.trace("createJobStepTaskResultDetail Start... jobStepTaskResult={}", jobStepTaskResult);
        switch (jobStepTaskResult.getResultType()) {
            case Text:
                final JobStepTaskText jobStepTaskText = jobStepTaskTextService.convertJobStepTaskText(jobStepTaskResult.getId(), jobStepTaskResult.getJobStepTaskText().getText());
                jobStepTaskTextRepository.insertJobStepTaskText(jobStepTaskText);
                break;
            case Audio:
                jobStepTaskAudioRepository.insertJobStepTaskAudio(jobStepTaskResult.getJobStepTaskAudio());
                break;
            case Tag:
                jobStepTaskTagRepository.insertJobStepTaskTag(jobStepTaskResult.getJobStepTaskTag());
                break;
        }
    }



    public JobStepTaskResult getJobStepTaskResult(Long jobStepTaskResultId) {
        log.trace("getJobStepTaskResult Start... jobStepTaskResultId={}", jobStepTaskResultId);
        final JobStepTaskResult jobStepTaskResult = jobStepTaskResultRepository.selectJobStepTaskResult(jobStepTaskResultId);

        switch (jobStepTaskResult.getResultType()) {
            case Text:
                final JobStepTaskText jobStepTaskText = jobStepTaskTextRepository.selectJobStepTaskText(jobStepTaskResult.getId());
                jobStepTaskResult.setJobStepTaskText(jobStepTaskText);
                break;

            case Audio:
                final JobStepTaskAudio jobStepTaskAudio = jobStepTaskAudioRepository.selectJobStepTaskAudio(jobStepTaskResult.getId());
                jobStepTaskResult.setJobStepTaskAudio(jobStepTaskAudio);
                break;

            case Tag:
                final JobStepTaskTag jobStepTaskTag = jobStepTaskTagRepository.selectJobStepTaskTag(jobStepTaskResult.getId());
                jobStepTaskResult.setJobStepTaskTag(jobStepTaskTag);
                break;
        }
        return jobStepTaskResult;
    }

    public JobStepTaskResultTransfer getJobStepTaskResult(JobStepTaskResultTransfer jobStepTaskResult) {
        log.trace("getJobStepTaskResult Start... jobStepTaskResult={}", jobStepTaskResult);

        switch (jobStepTaskResult.getResultType()) {
            case Text:
                final JobStepTaskText jobStepTaskText = jobStepTaskTextRepository.selectJobStepTaskText(jobStepTaskResult.getId());
                jobStepTaskResult.setJobStepTaskText(jobStepTaskText);
                break;

            case Audio:
                final JobStepTaskAudio jobStepTaskAudio = jobStepTaskAudioRepository.selectJobStepTaskAudio(jobStepTaskResult.getId());
                jobStepTaskResult.setJobStepTaskAudio(jobStepTaskAudio);
                break;

            case Tag:
                final JobStepTaskTag jobStepTaskTag = jobStepTaskTagRepository.selectJobStepTaskTag(jobStepTaskResult.getId());
                jobStepTaskResult.setJobStepTaskTag(jobStepTaskTag);
                break;
        }
        return jobStepTaskResult;
    }

    public JobStepTaskResult getJobStepTaskResult(JobStepTaskResult jobStepTaskResult) {
        log.trace("getJobStepTaskResult Start... jobStepTaskResult={}", jobStepTaskResult);

        switch (jobStepTaskResult.getResultType()) {
            case Text:
                final JobStepTaskText jobStepTaskText = jobStepTaskTextRepository.selectJobStepTaskText(jobStepTaskResult.getId());
                jobStepTaskResult.setJobStepTaskText(jobStepTaskText);
                break;

            case Audio:
                final JobStepTaskAudio jobStepTaskAudio = jobStepTaskAudioRepository.selectJobStepTaskAudio(jobStepTaskResult.getJobId());
                jobStepTaskResult.setJobStepTaskAudio(jobStepTaskAudio);
                break;

            case Tag:
                final JobStepTaskTag jobStepTaskTag = jobStepTaskTagRepository.selectJobStepTaskTag(jobStepTaskResult.getJobId());
                jobStepTaskResult.setJobStepTaskTag(jobStepTaskTag);
                break;
        }
        return jobStepTaskResult;
    }



    public void modifyJobStepTaskResult(JobStepTaskResult jobStepTaskResult) {
        switch (jobStepTaskResult.getResultType()) {
            case Text:
                final JobStepTaskText jobStepTaskText = jobStepTaskTextService.convertJobStepTaskText(jobStepTaskResult.getId(), jobStepTaskResult.getJobStepTaskText().getText());
                jobStepTaskTextRepository.updateJobStepTaskText(jobStepTaskText);
                break;
            case Audio:
               // jobStepTaskResultRepository.updateJobStepTaskAudio(jobStepTaskResult.getJobStepTaskAudio());
                break;
            case Tag:
               // jobStepTaskResultRepository.updateJobStepTaskTag(jobStepTaskResult.getJobStepTaskTag());
                break;
        }
    }


    @Transactional
    public void inspectAllJobStepTask(Long jobId, Integer jobStepNum,Long userId) {
        log.trace("inspectAllJobStepTask Start... jobId={}, jobStepNum={}, userId={}", jobId, jobStepNum,userId);
        final List<JobStepTask> jobStepTasks = jobStepTaskRepository.selectJobStepTasks(jobId, jobStepNum);
        log.trace("get jobStepTasks Start... {}",jobStepTasks);
        for (JobStepTask jobStepTask : jobStepTasks) {
            if (jobStepTask.getStatus().equals(JobStepResultStatus.Assigned) || jobStepTask.getStatus().equals(JobStepResultStatus.Rejected)) {
                inspectJobStepTask(jobStepTask, userId);
            }
        }
    }

    private void inspectJobStepTask(JobStepTask jobStepTask, Long userId) {
        final List<JobStepTaskWorker> workers = jobStepTaskWorkerRepository.selectJobStepTaskWorkers(jobStepTask.getJobId(), jobStepTask.getJobStepNum(), jobStepTask.getJobStepTaskNum());
        if (workers != null && workers.size() > 0 ) {
            final JobStepTaskWorker worker = workers.get(0);
            if(worker.getUserId() != userId)
                return;
            final List<JobStepTaskResult> jobStepTaskResults = getJobStepTaskResults(worker.getJobId(), worker.getJobStepNum()-1, worker.getJobStepTaskNum());
            if(jobStepTaskResults != null && jobStepTaskResults.size()>0)
            {
               // jobStepTaskService.processNextJobStepTask(jobStepTaskResults.get(0),jobStepTask.getStatus());
            }
        }
//        if (workers != null && workers.size() > 0 ) {
//
//            final JobStepTaskWorker worker = workers.get(0);
//            final JobStepTaskResult jobStepTaskResult = getJobStepTaskResult(worker.getJobId(), worker.getJobStepNum(), worker.getJobStepTaskNum(), worker.getUserId());
//            switch (jobStepTaskResult.getResultType()) {
//                case Text:
//                    jobStepTaskResult.getJobStepTaskText().setJobStepNum(jobStepTask.getJobStepNum());
//                    final List<JobStepTaskText> jobStepTaskTexts = jobStepTaskResultRepository.selectJobStepTaskTexts(jobStepTask.getJobId(), jobStepTask.getJobStepNum(), jobStepTask.getJobStepTaskNum());
//                    if (jobStepTaskTexts != null && jobStepTaskTexts.size() > 0) {
//                        modifyJobStepTaskResult(jobStepTaskResult);
//                    } else {
//                        createJobStepTaskResult(jobStepTaskResult);
//
//                    }
//                    break;
//                case Audio:
//                    jobStepTaskResult.getJobStepTaskAudio().setJobStepNum(jobStepTask.getJobStepNum());
//                    final List<JobStepTaskAudio> jobStepTaskAudios = jobStepTaskResultRepository.selectJobStepTaskAudios(jobStepTask.getJobId(), jobStepTask.getJobStepNum(), jobStepTask.getJobStepTaskNum());
//                    if (jobStepTaskAudios != null && jobStepTaskAudios.size() > 0) {
//                        modifyJobStepTaskResult(jobStepTaskResult);
//                    } else {
//                        createJobStepTaskResult(jobStepTaskResult);
//                    }
//                    break;
//                case Tag:
//                    jobStepTaskResult.getJobStepTaskTag().setJobStepNum(jobStepTask.getJobStepNum());
//                    final List<JobStepTaskTag> jobStepTaskTags = jobStepTaskResultRepository.selectJobStepTaskTags(jobStepTask.getJobId(), jobStepTask.getJobStepNum(), jobStepTask.getJobStepTaskNum());
//                    if (jobStepTaskTags != null && jobStepTaskTags.size() > 0) {
//                        modifyJobStepTaskResult(jobStepTaskResult);
//                    } else {
//                        createJobStepTaskResult(jobStepTaskResult);
//                    }
//                    break;
//                default: break;
//            }
//
//
//            jobStepTaskRepository.updateJobStepTask(jobStepTask.getJobId(), jobStepTask.getJobStepNum(), jobStepTask.getJobStepTaskNum(), JobStepResultStatus.Completed);
//            jobStepTaskRepository.updateJobStepTask(jobStepTask.getJobId(), jobStepTask.getJobStepNum()+1, jobStepTask.getJobStepTaskNum(), JobStepResultStatus.Created);
//
//        }
    }



    public List<JobStepTaskResult> getJobStepTaskResults(Long jobId, Integer jobStepNum, Integer jobStepTaskNum) {
        log.trace("getPreJobStepTaskResults Start... jobId={}, jobStepNum={}, jobStepTaskNum={}", jobId, jobStepNum, jobStepTaskNum);

        final List<JobStepTaskResult> jobStepTaskResults = jobStepTaskResultRepository.selectJobStepTaskResults(jobId, jobStepNum, jobStepTaskNum);
        return jobStepTaskResults.stream().map(jobStepTaskResult -> getJobStepTaskResult(jobStepTaskResult)).collect(Collectors.toList());
    }

    public List<PreJobStepTaskResult> getPreJobStepTaskResults(Long jobId, Integer jobStepNum, Integer jobStepTaskNum) {
        log.trace("getPreJobStepTaskResults Start... jobId={}, jobStepNum={}, jobStepTaskNum={}", jobId, jobStepNum, jobStepTaskNum);

        final JobStepTask jobStepTask = jobStepTaskRepository.selectJobStepTask(jobId, jobStepNum, jobStepTaskNum);
        if (jobStepTask.getPreJobStepTaskResultId() != null) {
            return getPreJobStepTaskResults(jobStepTask.getPreJobStepTaskResultId());
        } else {
            return null;
        }

    }

    public List<PreJobStepTaskResult> getPreJobStepTaskResults(Long jobStepTaskResultId) {
        final  List<PreJobStepTaskResult> preJobStepTaskResults = new ArrayList<>();

        boolean isDone = false;
        while(!isDone){
            final PreJobStepTaskResult preJobStepTaskResult = jobStepTaskResultRepository.selectPreJobStepTaskResult(jobStepTaskResultId);
            final JobStepTaskResult jobStepTaskResult = getJobStepTaskResult(jobStepTaskResultId);
            preJobStepTaskResult.setJobStepTaskResult(jobStepTaskResult);
            preJobStepTaskResults.add(preJobStepTaskResult);

            if (preJobStepTaskResult.getPreJobStepTaskResultId() == null || preJobStepTaskResult.getPreJobStepTaskResultId().equals(0L)) {
                isDone = true;
            } else {
                jobStepTaskResultId = preJobStepTaskResult.getPreJobStepTaskResultId();
            }
        }
        Collections.reverse(preJobStepTaskResults);
        return preJobStepTaskResults;
    }

    public List<JobStepTaskResult> convertJobStepTaskResults(List<JobStepTask> jobStepTasks, Long userId, Integer index){
        return jobStepTasks.stream().map(jobStepTask -> convertJobStepTaskResult(jobStepTask, userId, index)).collect(Collectors.toList());
    }

    public JobStepTaskResult convertJobStepTaskResult(JobStepTask jobStepTask, Long userId, Integer index){
        return modelMapper.map(jobStepTask, JobStepTaskResult.class).toBuilder()
                .userId(userId)
                .index(index)
                .build();
    }

    public List<DownloadResult> convertDownloadResult(List<PreJobStepTaskResult> results) {
        List<DownloadResult> downloadResults = new ArrayList<>();
        for (PreJobStepTaskResult result : results) {
            DownloadResult downloadResult = DownloadResult.builder()
                    .jobStepTaskResultId(result.getJobStepTaskResultId())
                    .preJobStepTaskResultId(result.getPreJobStepTaskResultId())
                    .templateStepType(result.getTemplateStepType())
                    .userId(result.getUserId())
                    .resultType(result.getResultType())
                    .index(result.getJobStepTaskResult().getIndex())
                    .build();
            if (result.getResultType().equals(JobStepResultType.Text)) {
                downloadResult.setJobStepTaskTextsText(result.getJobStepTaskResult().getJobStepTaskText().getText());
            } else if (result.getResultType().equals(JobStepResultType.Audio)) {
                downloadResult.setJobStepTaskAudiosAudioObjectId(result.getJobStepTaskResult().getJobStepTaskAudio().getAudioObjectId());
                downloadResult.setJobStepTaskAudiosDownloadUrl(result.getJobStepTaskResult().getJobStepTaskAudio().getDownloadUrl());
            } else {
                downloadResult.setJobStepTaskTag(result.getJobStepTaskResult().getJobStepTaskTag());
            }
            downloadResults.add(downloadResult);
        }
        return downloadResults;
    }

    @Transactional
    public List<List<DownloadResult>> requestDownload(DownloadRequest downloadRequest){
        //SelectworkTemplateId
        //List<PreJobStepTaskResult> preJobStepTaskResults = new ArrayList<>();
        List<List<DownloadResult>> downloadResults = new ArrayList<>();
        int maxStepNum = downloadRequest.getMaxStepNum();
        if(downloadRequest.getJobId() != null) {
            for (Integer stepTaskNum : downloadRequest.getJobStepTaskList()) {
                List<PreJobStepTaskResult> results = getPreJobStepTaskResults(downloadRequest.getJobId(), maxStepNum, stepTaskNum);
                List<DownloadResult> downloadResultList = convertDownloadResult(results);
                downloadResults.add(downloadResultList);
                //preJobStepTaskResults.addAll(results);
            }
        }
        //boolean result = Arrays.stream(downloadRequest.getJobList()).noneMatch(jobId -> jobId.equals(downloadRequest.getJobId()));

        for(Long jobId : downloadRequest.getJobList()) {
            if(jobId.equals(downloadRequest.getJobId()))
                continue;
            List<JobStepTaskTransfer> jobStepTasksTransfers = jobStepTaskRepository.selectJobStepTaskTransfers(jobId, maxStepNum,downloadRequest.getUserId());

            for(JobStepTaskTransfer jobStepTaskTransfer : jobStepTasksTransfers)
            {
                List<PreJobStepTaskResult> results = getPreJobStepTaskResults(jobId, maxStepNum,jobStepTaskTransfer.getJobStepTaskNum());
                List<DownloadResult> downloadResultList = convertDownloadResult(results);
                downloadResults.add(downloadResultList);
                //preJobStepTaskResults.addAll(results);
            }
        }

        return downloadResults;
        //return preJobStepTaskResults;
        //
    }

}
