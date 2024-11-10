package choi.toi.data.ws.service;

import choi.toi.data.ws.model.TemplateStep;
import choi.toi.data.ws.repository.TemplateStepRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class TemplateStepService {

    private TemplateStepRepository templateStepRepository;

    @Autowired
    public TemplateStepService(TemplateStepRepository templateStepRepository) {
        this.templateStepRepository = templateStepRepository;
    }

    public void createTemplateSteps(Long templateId, List<TemplateStep> templateSteps) {
        for (TemplateStep templateStep :  templateSteps) {
            log.trace("templateStep : {}", templateStep);
            templateStep.setTemplateId(templateId);
            createTemplateStep(templateStep);
        }

    }

    public void createTemplateStep(TemplateStep templateStep) {
        templateStepRepository.insertTemplateStep(templateStep);
    }

    public TemplateStep getTemplateStep(Long templateId, Integer templateStepNum) {
        return templateStepRepository.selectTemplateStep(templateId,templateStepNum);
    }

    public List<TemplateStep> getTemplateSteps(Long templateId) {
        return templateStepRepository.selectTemplateSteps(templateId);
    }

    public TemplateStep modifyTemplateStep(TemplateStep templateStep) {
        templateStepRepository.updateTemplateStep(templateStep);
        return getTemplateStep(templateStep.getTemplateId(), templateStep.getTemplateStepNum());
    }

    public void removeTemplateStep(Long templateId, Integer templateStepNum) {
        templateStepRepository.deleteTemplateStep(templateId, templateStepNum);
    }

    public void removeTemplateStep(Long templateId) {
        templateStepRepository.deleteTemplateStep(templateId);
    }
}
