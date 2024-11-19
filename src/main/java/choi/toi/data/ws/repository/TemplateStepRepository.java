package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.TemplateStep;
import choi.toi.data.ws.repository.mapper.TemplateStepMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TemplateStepRepository {
    private TemplateStepMapper templateStepMapper;

    @Autowired
    public TemplateStepRepository(TemplateStepMapper templateStepMapper) {
        this.templateStepMapper = templateStepMapper;
    }

    public void insertTemplateStep(TemplateStep templateStep) {
        templateStepMapper.insertTemplateStep(templateStep);
    }

    public TemplateStep selectTemplateStep(Long templateId, Integer templateStepNum) {
        return templateStepMapper.selectTemplateStep(templateId, templateStepNum);
    }

    public List<TemplateStep> selectTemplateSteps(Long templateId) {
        return templateStepMapper.selectTemplateSteps(templateId);
    }

    public void updateTemplateStep(TemplateStep templateStep) {
        templateStepMapper.updateTemplateStep(templateStep);
    }

    public void deleteTemplateStep(Long templateId, Integer templateStepNum) {
        templateStepMapper.deleteTemplateStep(templateId, templateStepNum);
    }

    public void delete(Long templateId) {
        templateStepMapper.deleteTemplateStepsByTemplateId(templateId);
    }
}
