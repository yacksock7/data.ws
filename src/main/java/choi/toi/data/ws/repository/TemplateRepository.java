package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.Template;
import choi.toi.data.ws.model.support.TemplateType;
import choi.toi.data.ws.repository.mapper.TemplateMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TemplateRepository {

    private TemplateMapper templateMapper;

    @Autowired
    public TemplateRepository(TemplateMapper templateMapper) {
        this.templateMapper = templateMapper;
    }

    public void insertTemplate(Template template) {
        templateMapper.insertTemplate(template);
    }

    public Template selectTemplate(Long templateId) {
        return templateMapper.selectTemplateById(templateId);
    }

    public List<Template> selectTemplates(Long userId) {
        return templateMapper.selectTemplateByUserId(userId);
    }

    public List<Template> selectTemplates(TemplateType type) {
        return templateMapper.selectTemplateByTemplateType(type);
    }

    public void updateTemplate(Template template) {
        templateMapper.updateTemplate(template);
    }

    public void deleteTemplate(Long templateId) {
        templateMapper.deleteTemplate(templateId);
    }
}
