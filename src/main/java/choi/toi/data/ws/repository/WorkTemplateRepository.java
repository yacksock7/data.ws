package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.Template;
import choi.toi.data.ws.model.WorkTemplate;
import choi.toi.data.ws.repository.mapper.WorkTemplateMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class WorkTemplateRepository {

    private WorkTemplateMapper workTemplateMapper;
    @Autowired
    public WorkTemplateRepository(WorkTemplateMapper workTemplateMapper) {
        this.workTemplateMapper = workTemplateMapper;
    }

    public void insertWorkTemplate(Template workTemplate) {
        workTemplateMapper.insertWorkTemplate(workTemplate);
    }

    public WorkTemplate selectWorkTemplate(Long workTemplateId) {
        return workTemplateMapper.selectWorkTemplate(workTemplateId);
    }
}
