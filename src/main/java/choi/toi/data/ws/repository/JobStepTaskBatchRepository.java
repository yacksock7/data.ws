package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.JobStepTask;
import choi.toi.data.ws.repository.mapper.JobStepTaskMapper;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Repository
public class JobStepTaskBatchRepository {
    private SqlSessionFactory sqlSessionFactory;

    @Autowired
    public JobStepTaskBatchRepository(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
    }

    @Transactional
    public void batchInsertJobStepTasks(List<JobStepTask> jobStepTasks) {
        log.trace("batchInsertJobStepTasks Start...");

        List<List<JobStepTask>> limitedList = Lists.partition(jobStepTasks, 500);
        for (List<JobStepTask> list : limitedList) {
            batchInsertJobStepTasksByLimit(list);
        }
    }

    private void batchInsertJobStepTasksByLimit(List<JobStepTask> jobStepTasks) {
        try (final SqlSession sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH)) {
            final JobStepTaskMapper mapper = sqlSession.getMapper(JobStepTaskMapper.class);

            for(JobStepTask jobStepTask : jobStepTasks) {
                mapper.insertJobStepTasks(jobStepTask);
            }

            sqlSession.flushStatements();
        }
    }

    @Transactional
    public void batchUpdateJobStepTasks(List<JobStepTask> jobStepTasks) {
        log.trace("batchInsertJobStepTasks Start...");

        List<List<JobStepTask>> limitedList = Lists.partition(jobStepTasks, 500);
        for (List<JobStepTask> list : limitedList) {
            batchUpdateJobStepTasksByLimit(list);
        }
    }

    private void batchUpdateJobStepTasksByLimit(List<JobStepTask> jobStepTasks) {
        try (final SqlSession sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH)) {
            final JobStepTaskMapper mapper = sqlSession.getMapper(JobStepTaskMapper.class);

            for(JobStepTask jobStepTask : jobStepTasks) {
                mapper.updateJobStepTask(jobStepTask);
            }

            sqlSession.flushStatements();
        }
    }
}
