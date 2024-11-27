package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.JobStepTaskText;
import choi.toi.data.ws.repository.mapper.JobStepTaskTextMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class JobStepTaskTextRepository {

    private JobStepTaskTextMapper jobStepTaskTextMapper;

    @Autowired
    public JobStepTaskTextRepository(JobStepTaskTextMapper jobStepTaskTextMapper) {
        this.jobStepTaskTextMapper = jobStepTaskTextMapper;
    }

    public void insertJobStepTaskText(JobStepTaskText jobStepTaskText) {
        jobStepTaskTextMapper.insertJobStepTaskText(jobStepTaskText);
    }

    public JobStepTaskText selectJobStepTaskText(Long jobStepTaskResultId) {
        return jobStepTaskTextMapper.selectJobStepTaskText(jobStepTaskResultId);
    }

//    public JobStepTaskText selectJobStepTaskTexts(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId) {
//        return jobStepTaskTextMapper.selectJobStepTaskTextByWorker(jobId, jobStepNum, jobStepTaskNum, userId);
//    }
//
//    public List<JobStepTaskText> selectJobStepTaskTexts(Long jobId, Integer jobStepNum, Integer jobStepTaskNum) {
//        return jobStepTaskResultMapper.selectJobStepTaskTexts(jobId, jobStepNum, jobStepTaskNum);
//    }
//
//    public List<JobStepTaskText> selectJobStepTaskTexts(Long jobId, Integer jobStepNum) {
//        return jobStepTaskTextMapper.selectJobStepTaskTexts(jobId, jobStepNum);
//    }

    public void updateJobStepTaskText(JobStepTaskText jobStepTaskText) {
        jobStepTaskTextMapper.updateJobStepTaskText(jobStepTaskText);
    }


}
