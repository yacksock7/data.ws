package choi.toi.data.ws.service;

import choi.toi.data.ws.model.Template;
import choi.toi.data.ws.model.TemplateStep;
import choi.toi.data.ws.repository.WorkTemplateRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class WorkTemplateService {

    private WorkTemplateRepository workTemplateRepository;
    private WorkTemplateStepService workTemplateStepService;

    @Autowired
    public WorkTemplateService(WorkTemplateRepository workTemplateRepository,
                               WorkTemplateStepService workTemplateStepService) {
        this.workTemplateRepository = workTemplateRepository;
        this.workTemplateStepService = workTemplateStepService;
    }

    public void createWorkTemplate(Template template, List<TemplateStep> steps) {
        workTemplateRepository.insertWorkTemplate(template);
        workTemplateStepService.createWorkTemplateSteps(template.getId(), steps);
    }
}
