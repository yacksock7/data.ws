package choi.toi.data.ws.service;

import choi.toi.data.ws.model.Template;
import choi.toi.data.ws.model.TemplateStep;
import choi.toi.data.ws.model.transfer.TemplateStepTransfer;
import choi.toi.data.ws.repository.TemplateRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
public class TemplateService {

    private TemplateRepository templateRepository;
    private TemplateStepService templateStepService;

    @Autowired
    public TemplateService(TemplateRepository templateRepository,
                           TemplateStepService templateStepService) {

        this.templateRepository = templateRepository;
        this.templateStepService = templateStepService;
    }

    @Transactional
    public TemplateStepTransfer createTemplate(TemplateStepTransfer templateStepTransfer) {
        log.trace("createTemplate Start... templateStepTransfer : {}", templateStepTransfer);
        templateRepository.insertTemplate(templateStepTransfer.getTemplate());
        templateStepService.createTemplateSteps(templateStepTransfer.getTemplate().getId(), templateStepTransfer.getTemplateSteps());

        final Template template = templateRepository.selectTemplate(templateStepTransfer.getTemplate().getId());
        final List<TemplateStep> templateSteps = templateStepService.getTemplateSteps(templateStepTransfer.getTemplate().getId());

        return TemplateStepTransfer.builder()
                .template(template)
                .templateSteps(templateSteps)
                .build();
    }

//    @Transactional
//    public void createTemplate(WorkTransfer workTransfer) {
//        log.trace("createTemplate Start... workTransfer : {}",  workTransfer);
//
////        templateRepository.updateTemplate(workTransfer.getTemplate());
//        if (workTransfer.getTemplate().getType().equals(TemplateType.Private)) {
//            templateStepService.removeTemplateStep(workTransfer.getTemplate().getId());
//            templateStepService.createTemplateSteps(workTransfer.getTemplate().getId(), workTransfer.getTemplateSteps());
//        }
//
//        workTemplateService.createWorkTemplate(workTransfer.getTemplate());
//        workTemplateStepService.createWorkTemplateSteps(workTransfer.getTemplate().getId(), workTransfer.getTemplateSteps());
//
//        workTransfer.getWork().setWorkTemplateId(workTransfer.getTemplate().getId());
//        workService.createWork(workTransfer.getWork());
//
//        log.trace("createTemplate Success!!");
//    }

//    public List<Template> getTemplates(Long userId, TemplateType type) {
//        log.trace("getTemplates Start... userId={}, templateType={}", userId, type);
//
//        List<Template> templates = null;
//        if (type.equals(TemplateType.All)) {
//            final List<Template> systemTemplates = getTemplates(type);
//            final List<Template> privateTemplates = getTemplates(userId);
//            templates = ListUtils.union(systemTemplates, privateTemplates);
//
//        } else if (type.equals(TemplateType.System)) {
//            templates = getTemplates(type);
//
//        } else {
//            templates = getTemplates(userId);
//        }
//
//        return templates;
//    }
//
//    public Template getTemplate(Long templateId) {
//        return templateRepository.selectTemplate(templateId);
//    }
//
//    public List<Template> getTemplates(Long userId) {
//        return templateRepository.selectTemplates(userId);
//    }
//
//    public List<Template> getTemplates(TemplateType type){
//        return templateRepository.selectTemplates(type);
//    }
//
//    public Template modifyTemplate(Template template) {
//        templateRepository.updateTemplate(template);
//        return getTemplate(template.getId());
//    }
//
//    public void removeTemplate(Long templateId) {
//        templateRepository.deleteTemplate(templateId);
//    }
}
