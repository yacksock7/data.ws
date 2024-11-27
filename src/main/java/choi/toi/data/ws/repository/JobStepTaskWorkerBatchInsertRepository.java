package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.JobStepTaskWorker;
import choi.toi.data.ws.repository.mapper.JobStepTaskWorkerMapper;
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
public class JobStepTaskWorkerBatchInsertRepository {

    private SqlSessionFactory sqlSessionFactory;

    @Autowired
    public JobStepTaskWorkerBatchInsertRepository(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
    }

    @Transactional
    public void batchInsertJobStepTaskWorkers(List<JobStepTaskWorker> jobStepTaskWorkers) {
        log.trace("batchInsertJobStepTaskWorkers Start...");

        List<List<JobStepTaskWorker>> limitedList = Lists.partition(jobStepTaskWorkers, 500);
        for (List<JobStepTaskWorker> list : limitedList) {
            batchInsertJobStepTaskWorkersByLimit(list);
        }
    }

    private void batchInsertJobStepTaskWorkersByLimit(List<JobStepTaskWorker> jobStepTaskWorkers) {

        try (final SqlSession sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH)) {
            final JobStepTaskWorkerMapper mapper = sqlSession.getMapper(JobStepTaskWorkerMapper.class);

            for(JobStepTaskWorker jobStepTaskWorker : jobStepTaskWorkers) {
                mapper.insertJobStepTaskWorker(jobStepTaskWorker);
            }

            sqlSession.flushStatements();
        }
    }
}
