package choi.toi.data.ws.service;

import choi.toi.data.ws.model.support.TemplateType;
import choi.toi.data.ws.model.transfer.TemplateStepTransfer;
import choi.toi.data.ws.model.transfer.TemplateTableTransfer;
import choi.toi.data.ws.model.transfer.TemplateTransfer;
import choi.toi.data.ws.model.transfer.WorkTransfer;
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
    private WorkTemplateService workTemplateService;
    private WorkService workService;

    @Autowired
    public TemplateService(TemplateRepository templateRepository,
                           TemplateStepService templateStepService,
                           WorkTemplateService workTemplateService,
                           WorkService workService) {

        this.templateRepository = templateRepository;
        this.templateStepService = templateStepService;
        this.workTemplateService = workTemplateService;
        this.workService = workService;
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

    @Transactional
    public void createTemplate(WorkTransfer workTransfer) {
        log.trace("createTemplate Start... workTransfer : {}",  workTransfer);

//        if (workTransfer.getTemplate().getType().equals(TemplateType.Private)) {
//            templateStepService.remove(workTransfer.getTemplate().getId());
//            templateStepService.createTemplateSteps(workTransfer.getTemplate().getId(), workTransfer.getTemplateSteps());
//        }

        workTemplateService.createWorkTemplate(workTransfer.getTemplate(), workTransfer.getTemplateSteps());

        workTransfer.getWork().setWorkTemplateId(workTransfer.getTemplate().getId());
        workService.createWork(workTransfer.getWork());

        log.trace("createTemplate Success!!");
    }
}
