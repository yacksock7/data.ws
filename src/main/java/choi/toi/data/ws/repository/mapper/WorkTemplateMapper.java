package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.Template;
import choi.toi.data.ws.model.WorkTemplate;

public interface WorkTemplateMapper {
    void insertWorkTemplate(Template workTemplate);
    WorkTemplate selectWorkTemplate(Long workTemplateId);
}
