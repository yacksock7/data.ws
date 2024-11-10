package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.Template;
import choi.toi.data.ws.model.support.TemplateType;

import java.util.List;

public interface TemplateMapper {

    void insertTemplate(Template template);
    Template selectTemplateById(Long templateId);
    List<Template> selectTemplateByUserId(Long userId);
    List<Template> selectTemplateByTemplateType(TemplateType type);
    void updateTemplate(Template template);
    void deleteTemplate(Long templateId);
}
