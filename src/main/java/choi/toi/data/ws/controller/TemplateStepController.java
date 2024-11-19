package choi.toi.data.ws.controller;

import choi.toi.data.ws.model.TemplateStep;
import choi.toi.data.ws.service.TemplateStepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/templates")
public class TemplateStepController {
    private TemplateStepService templateStepService;

    @Autowired
    public TemplateStepController(TemplateStepService templateStepService) {
        this.templateStepService = templateStepService;
    }

//    @PostMapping("/steps")
//    public void makeTemplate(HttpServletRequest request,
//                               @RequestBody TemplateStep templateStep) {
//        templateStepService.createTemplateStep(templateStep);
//    }
//
//    @GetMapping("/{templateId}/steps")
//    public List<TemplateStep> getTemplateSteps(HttpServletRequest request,
//                                              @PathVariable Long templateId) {
//        return templateStepService.getTemplateSteps(templateId);
//    }
//
//    @GetMapping("/{templateId}/steps/{templateStepNum}")
//    public TemplateStep getTemplateStep(HttpServletRequest request,
//                                        @PathVariable Long templateId,
//                                        @PathVariable Integer templateStepNum) {
//        return templateStepService.getTemplateStep(templateId, templateStepNum);
//    }

    @PutMapping("/{templateId}/steps")
    public void modify(HttpServletRequest request,
                       @PathVariable Long templateId,
                       @RequestBody List<TemplateStep> templateSteps) {

        templateStepService.removeAndInsert(templateId, templateSteps);
    }

//    @DeleteMapping ("/{templateId}/steps/{templateStepNum}")
//    public void removeTemplateStep(HttpServletRequest request,
//                                           @PathVariable Long templateId,
//                                           @PathVariable Integer templateStepNum) {
//        templateStepService.removeTemplateStep(templateId, templateStepNum);
//    }

}
