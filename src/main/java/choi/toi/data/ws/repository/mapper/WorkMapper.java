package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.Work;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface WorkMapper {
    void insertWork(Work work);
    Work selectWork(Long workId);
    Work selectWorkByWorkTemplateId(Long workTemplateId);
    List<Work> selectWorksByUserId(@Param("userId") Long userId,
                                   @Param("keyword") String keyword);
    void updateWork(Work work);
    void deleteWork(Long workId);
}
