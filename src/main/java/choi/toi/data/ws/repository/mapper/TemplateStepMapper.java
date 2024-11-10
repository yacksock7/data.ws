package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.TemplateStep;

import java.util.List;

public interface TemplateStepMapper {
    void insertTemplateStep(TemplateStep templateStep);
    TemplateStep selectTemplateStep(Long templateId, Integer templateStepNum);
    List<TemplateStep> selectTemplateSteps(Long templateId);
    void updateTemplateStep(TemplateStep templateStep);
    void deleteTemplateStep(Long templateId, Integer templateStepNum);
    void deleteTemplateStepByTemplateId(Long templateId);
}
