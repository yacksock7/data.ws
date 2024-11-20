package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.Work;
import choi.toi.data.ws.repository.mapper.WorkMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
public class WorkRepository {
    private WorkMapper workMapper;
    @Autowired
    public WorkRepository(WorkMapper workMapper) {
        this.workMapper = workMapper;
    }

    public void insertWork(Work work) {
        workMapper.insertWork(work);
    }

    public Work selectWork(Long workId) {
        return workMapper.selectWork(workId);
    }

    public Work selectWorkByWorkTemplateId(Long workTemplateId) {
        return workMapper.selectWorkByWorkTemplateId(workTemplateId);
    }

    public List<Work> selectWorksByUserId(Long userId, String keyword) {
        keyword = "%" + keyword + "%";
        log.trace("keyword : {}", keyword);
        return workMapper.selectWorksByUserId(userId, keyword);
    }

    public void updateWork(Work work) {
        workMapper.updateWork(work);
    }

    public void deleteWork(Long workId) {
        workMapper.deleteWork(workId);
    }
}
