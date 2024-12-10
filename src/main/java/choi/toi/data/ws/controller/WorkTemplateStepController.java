package choi.toi.data.ws.controller;

import choi.toi.data.ws.model.WorkTemplateStep;
import choi.toi.data.ws.model.WorkTemplateStepViewingRole;
import choi.toi.data.ws.service.WorkTemplateStepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/works")
public class WorkTemplateStepController {

    private WorkTemplateStepService workTemplateStepService;

    @Autowired
    public WorkTemplateStepController(WorkTemplateStepService workTemplateStepService) {
        this.workTemplateStepService = workTemplateStepService;
    }

    @GetMapping("/templates/{workTemplateId}/steps/rejectPoint")
    public List<WorkTemplateStep> getWorkTemplateStepsForRejectPoint(HttpServletRequest request,
                                                                     @PathVariable Long workTemplateId) {

        return workTemplateStepService.getWorkTemplateStepsForRejectPoint(workTemplateId);
    }

    @GetMapping("/templates/{workTemplateId}/steps/{workTemplateStepNum}/pre")
    public List<WorkTemplateStep> getPreWorkTemplateSteps(HttpServletRequest request,
                                                          @PathVariable Integer workTemplateId,
                                                          @PathVariable Integer workTemplateStepNum) {

        return workTemplateStepService.getPreWorkTemplateSteps(workTemplateId, workTemplateStepNum);
    }


    /*    workTemplateStepViewingRole    */
    @GetMapping("/templates/{workTemplateId}/steps/{workTemplateStepNum}/viewing-role")
    public List<WorkTemplateStepViewingRole> getWorkTemplateStepViewingRoles(HttpServletRequest request,
                                                                             @PathVariable Long workTemplateId,
                                                                             @PathVariable Integer workTemplateStepNum) {

        return workTemplateStepService.getWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);
    }

    @PostMapping("/templates/{workTemplateId}/steps/{workTemplateStepNum}/viewing-role")
    public void createWorkTemplateStepViewingRoles(HttpServletRequest request,
                                                   @PathVariable Integer workTemplateId,
                                                   @PathVariable Integer workTemplateStepNum,
                                                   @RequestBody List<WorkTemplateStepViewingRole> workTemplateStepViewingRoles) {
        workTemplateStepService.removeWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);
        workTemplateStepService.createWorkTemplateStepViewingRoles(workTemplateStepViewingRoles);
    }
}
