package choi.toi.data.ws.repository.mapper;


import choi.toi.data.ws.model.WorkTemplateStepViewingRole;

import java.util.List;

public interface WorkTemplateStepViewingRoleMapper {

    void insertWorkTemplateStepViewingRole(WorkTemplateStepViewingRole workTemplateStepViewingRole);
    List<WorkTemplateStepViewingRole> selectWorkTemplateStepViewingRoles(Long workTemplateId, Integer workTemplateStepNum);
    void deleteWorkTemplateStepViewingRoles(Integer workTemplateId, Integer workTemplateStepNum);
}
