package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.JobStepTaskText;
import choi.toi.data.ws.repository.mapper.JobStepTaskTextMapper;
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
public class JobStepTaskTextBatchRepository {

    private SqlSessionFactory sqlSessionFactory;

    @Autowired
    public JobStepTaskTextBatchRepository(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
    }

    @Transactional
    public void batchInsertJobStepTaskTexts(List<JobStepTaskText> jobStepTaskTexts) {
        log.trace("batchInsertJobStepTaskTexts Start...");

        List<List<JobStepTaskText>> limitedList = Lists.partition(jobStepTaskTexts, 500);
        for (List<JobStepTaskText> list : limitedList) {
            batchInsertJobStepTaskTextsByLimit(list);
        }
    }

    private void batchInsertJobStepTaskTextsByLimit(List<JobStepTaskText> jobStepTaskTexts) {
        try (final SqlSession sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH)) {
            final JobStepTaskTextMapper mapper = sqlSession.getMapper(JobStepTaskTextMapper.class);

            for(JobStepTaskText jobStepTaskText : jobStepTaskTexts) {
                mapper.insertJobStepTaskText(jobStepTaskText);
            }

            sqlSession.flushStatements();
        }
    }

}
