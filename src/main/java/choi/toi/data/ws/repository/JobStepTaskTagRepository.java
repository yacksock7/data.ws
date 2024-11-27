package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.JobStepTaskTag;
import choi.toi.data.ws.repository.mapper.JobStepTaskTagMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class JobStepTaskTagRepository {

    private JobStepTaskTagMapper jobStepTaskTagMapper;

    @Autowired
    public JobStepTaskTagRepository(JobStepTaskTagMapper jobStepTaskTagMapper) {
        this.jobStepTaskTagMapper = jobStepTaskTagMapper;
    };

    public void insertJobStepTaskTag(JobStepTaskTag jobStepTaskTag) {
        jobStepTaskTagMapper.insertJobStepTaskTag(jobStepTaskTag);
    }

    public JobStepTaskTag selectJobStepTaskTag(Long jobStepTaskResultId) {
        return jobStepTaskTagMapper.selectJobStepTaskTag(jobStepTaskResultId);
    }

//    public JobStepTaskTag selectJobStepTaskTag(Long jobId, Integer jobStepNum, Integer jobStepTaskNum, Long userId) {
//        return jobStepTaskTagMapper.selectJobStepTaskTag(jobId, jobStepNum, jobStepTaskNum, userId);
//    }
//    public List<JobStepTaskTag> selectJobStepTaskTags(Long jobId, Integer jobStepNum, Integer jobStepTaskNum) {
//        return jobStepTaskTagMapper.selectJobStepTaskTags(jobId, jobStepNum, jobStepTaskNum);
//    }

    public void updateJobStepTaskTag(JobStepTaskTag jobStepTaskTag) {
        jobStepTaskTagMapper.updateJobStepTaskTag(jobStepTaskTag);
    }


}
