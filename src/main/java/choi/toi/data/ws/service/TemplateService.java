package choi.toi.data.ws.service;

import choi.toi.data.ws.model.Template;
import choi.toi.data.ws.model.TemplateStep;
import choi.toi.data.ws.model.support.TemplateType;
import choi.toi.data.ws.model.transfer.TemplateStepTransfer;
import choi.toi.data.ws.model.transfer.TemplateTableTransfer;
import choi.toi.data.ws.model.transfer.TemplateTransfer;
import choi.toi.data.ws.repository.TemplateRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.ListUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
    public void create(TemplateStepTransfer templateStepTransfer) {
        log.trace("createTemplate Start... templateStepTransfer : {}", templateStepTransfer);
        templateRepository.insertTemplate(templateStepTransfer.getTemplate());
        templateStepService.createTemplateSteps(templateStepTransfer.getTemplate().getId(), templateStepTransfer.getTemplateSteps());

    }

    public List<TemplateTableTransfer> getTableTransfers(Long userId) {
        return templateRepository.selectTableTransfers(userId);
    }

    public TemplateTransfer getTransfer(Long templateId) {
        return templateRepository.selectTransfer(templateId);
    }

    public List<TemplateTransfer> getTransfers(Long userId, TemplateType type) {
        return templateRepository.selectTransfers(userId);
    }

    public void remove(Long templateId) {
        templateRepository.delete(templateId);
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
}
