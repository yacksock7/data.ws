package choi.toi.data.ws.controller;

import choi.toi.data.ws.service.WorkTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/works")
public class WorkTemplateController {

    private WorkTemplateService workTemplateService;

    @Autowired
    public WorkTemplateController(WorkTemplateService workTemplateService) {
        this.workTemplateService = workTemplateService;
    }

//    @GetMapping("/{workId}/templates/steps")
//    public WorkTemplateStepTransfer getWorkTemplateAndStep(HttpServletRequest request,
//                                                           @PathVariable Long workId) {
//
//        return workTemplateService.getWorkTemplateStepTransfer(workId);
//    }
}
