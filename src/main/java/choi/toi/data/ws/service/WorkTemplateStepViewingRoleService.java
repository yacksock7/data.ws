package choi.toi.data.ws.service;

import choi.toi.data.ws.model.TemplateStep;
import choi.toi.data.ws.model.WorkTemplateStep;
import choi.toi.data.ws.model.WorkTemplateStepViewingRole;
import choi.toi.data.ws.model.support.TemplateStepType;
import choi.toi.data.ws.repository.WorkTemplateStepViewingRoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class WorkTemplateStepViewingRoleService {

    private WorkTemplateStepViewingRoleRepository workTemplateStepViewingRoleRepository;
    private ModelMapper modelMapper;
    @Autowired
    public WorkTemplateStepViewingRoleService(WorkTemplateStepViewingRoleRepository workTemplateStepViewingRoleRepository,
                                              ModelMapper modelMapper) {
        this.workTemplateStepViewingRoleRepository = workTemplateStepViewingRoleRepository;
        this.modelMapper = modelMapper;
    }

    public void createWorkTemplateStepViewingRole(WorkTemplateStepViewingRole workTemplateStepViewingRole) {
        workTemplateStepViewingRoleRepository.insertWorkTemplateStepViewingRole(workTemplateStepViewingRole);
    }

    public void createWorkTemplateStepViewingRole(TemplateStep templateStep) {
        final WorkTemplateStep workTemplateStep =
                modelMapper.map(templateStep, WorkTemplateStep.class)
                        .toBuilder()
                        .workTemplateId(templateStep.getTemplateId())
                        .workTemplateStepNum(templateStep.getTemplateStepNum())
                        .build();


        WorkTemplateStepViewingRole workTemplateStepViewingRole =
                convertWorkTemplateStepToWorkTemplateStepViewingRole(workTemplateStep, workTemplateStep.getWorkTemplateStepNum());
        workTemplateStepViewingRoleRepository.insertWorkTemplateStepViewingRole(workTemplateStepViewingRole);
        if (!templateStep.getType().equals(TemplateStepType.Upload)) {
            workTemplateStepViewingRole =
                    convertWorkTemplateStepToWorkTemplateStepViewingRole(workTemplateStep, workTemplateStep.getWorkTemplateStepNum()-1);
            workTemplateStepViewingRoleRepository.insertWorkTemplateStepViewingRole(workTemplateStepViewingRole);
        }
    }

    public List<WorkTemplateStepViewingRole> getWorkTemplateStepViewingRoles(Long workTemplateId, Integer workTemplateStepNum) {
        return workTemplateStepViewingRoleRepository.selectWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);
    }

    public void removeWorkTemplateStepViewingRoles(Integer workTemplateId, Integer workTemplateStepNum) {
        workTemplateStepViewingRoleRepository.deleteWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);
    }

    public WorkTemplateStepViewingRole convertWorkTemplateStepToWorkTemplateStepViewingRole(WorkTemplateStep workTemplateStep, Integer viewingTemplateStepNum) {
        return WorkTemplateStepViewingRole.builder()
                .workTemplateId(workTemplateStep.getWorkTemplateId())
                .workTemplateStepNum(workTemplateStep.getWorkTemplateStepNum())
                .viewingTemplateStepNum(viewingTemplateStepNum)
                .build();
    }

}
