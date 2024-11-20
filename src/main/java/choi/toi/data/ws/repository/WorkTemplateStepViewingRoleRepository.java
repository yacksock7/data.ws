package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.WorkTemplateStepViewingRole;
import choi.toi.data.ws.repository.mapper.WorkTemplateStepViewingRoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class WorkTemplateStepViewingRoleRepository {

    private WorkTemplateStepViewingRoleMapper workTemplateStepViewingRoleMapper;
    @Autowired
    public WorkTemplateStepViewingRoleRepository(WorkTemplateStepViewingRoleMapper workTemplateStepViewingRoleMapper) {
        this.workTemplateStepViewingRoleMapper = workTemplateStepViewingRoleMapper;
    }

    public void insertWorkTemplateStepViewingRole(WorkTemplateStepViewingRole workTemplateStepViewingRole) {
        workTemplateStepViewingRoleMapper.insertWorkTemplateStepViewingRole(workTemplateStepViewingRole);
    }

    public List<WorkTemplateStepViewingRole> selectWorkTemplateStepViewingRoles(Long workTemplateId, Integer workTemplateStepNum) {
        return workTemplateStepViewingRoleMapper.selectWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);
    }

    public void deleteWorkTemplateStepViewingRoles(Integer workTemplateId, Integer workTemplateStepNum) {
        workTemplateStepViewingRoleMapper.deleteWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);
    }
}
