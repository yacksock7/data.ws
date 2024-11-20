package choi.toi.data.ws.service;


import choi.toi.data.ws.model.TemplateStep;
import choi.toi.data.ws.model.WorkTemplateStep;
import choi.toi.data.ws.model.WorkTemplateStepViewingRole;
import choi.toi.data.ws.repository.WorkTemplateStepRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class WorkTemplateStepService {

    private WorkTemplateStepRepository workTemplateStepRepository;
    private WorkTemplateStepViewingRoleService  workTemplateStepViewingRoleService;
    private ModelMapper modelMapper;

    @Autowired
    public WorkTemplateStepService(WorkTemplateStepRepository workTemplateStepRepository,
                                   WorkTemplateStepViewingRoleService  workTemplateStepViewingRoleService,
                                   ModelMapper modelMapper) {
        this.workTemplateStepRepository = workTemplateStepRepository;
        this.workTemplateStepViewingRoleService = workTemplateStepViewingRoleService;
        this.modelMapper = modelMapper;
    }

    public void createWorkTemplateSteps(Long workTemplateId, List<TemplateStep> workTemplateSteps) {
        for (TemplateStep templateStep : workTemplateSteps) {
            templateStep.setTemplateId(workTemplateId);
            createWorkTemplateStep(templateStep);

            workTemplateStepViewingRoleService.createWorkTemplateStepViewingRole(templateStep);
        }
    }

    public void createWorkTemplateStep(TemplateStep workTemplateStep) {
        workTemplateStepRepository.insertWorkTemplateStep(workTemplateStep);
    }

    public WorkTemplateStep getWorkTemplateStep(Long workTemplateId, Integer workTemplateStepNum) {
        return workTemplateStepRepository.selectWorkTemplateStep(workTemplateId, workTemplateStepNum);
    }
    public List<WorkTemplateStep> getWorkTemplateStepsForRejectPoint(Long workTemplateId) {
        return workTemplateStepRepository.selectWorkTemplateStepsForRejectPoint(workTemplateId);
    }
    public List<WorkTemplateStep> getPreWorkTemplateSteps(Integer workTemplateId, Integer workTemplateStepNum) {
        return workTemplateStepRepository.selectPreWorkTemplateSteps(workTemplateId, workTemplateStepNum);
    }


/*    workTemplateStepViewingRole    */
    public void createWorkTemplateStepViewingRoles(List<WorkTemplateStepViewingRole> workTemplateStepViewingRoles) {
        for (WorkTemplateStepViewingRole workTemplateStepViewingRole : workTemplateStepViewingRoles) {
            createWorkTemplateStepViewingRole(workTemplateStepViewingRole);
        }
    }

    public void createWorkTemplateStepViewingRole(WorkTemplateStepViewingRole workTemplateStepViewingRole) {
        workTemplateStepViewingRoleService.createWorkTemplateStepViewingRole(workTemplateStepViewingRole);
    }

    public List<WorkTemplateStepViewingRole> getWorkTemplateStepViewingRoles(Long workTemplateId, Integer workTemplateStepNum) {
        return workTemplateStepViewingRoleService.getWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);
    }

    public void removeWorkTemplateStepViewingRoles(Integer workTemplateId, Integer workTemplateStepNum) {
        workTemplateStepViewingRoleService.removeWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);
    }
}
