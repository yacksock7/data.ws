package choi.toi.data.ws.controller;

import choi.toi.data.ws.model.transfer.TemplateStepTransfer;
import choi.toi.data.ws.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/templates")
public class TemplateController {

    private TemplateService templateService;

    @Autowired
    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @PostMapping
    public TemplateStepTransfer createTemplate(HttpServletRequest request,
                               @RequestBody TemplateStepTransfer templateStepTransfer) {

        return templateService.createTemplate(templateStepTransfer);
    }

//    @PostMapping("/steps/works")
//    public void createTemplate(HttpServletRequest request,
//                                               @RequestBody WorkTransfer workTransfer) {
//        templateService.createTemplate(workTransfer);
//    }
//
//    @GetMapping("/{templateId}")
//    public Template getTemplate(HttpServletRequest request,
//                                @PathVariable Long templateId) {
//        return templateService.getTemplate(templateId);
//    }
//
//    @GetMapping("/userId/{userId}")
//    public List<Template> getTemplates(HttpServletRequest request,
//                                       @PathVariable Long userId,
//                                       @RequestParam(value ="templateType") TemplateType type) {
//        return templateService.getTemplates(userId, type);
//    }
//
//    @PutMapping
//    public Template modifyTemplate(HttpServletRequest request,
//                                   @RequestBody Template template) {
//        return templateService.modifyTemplate(template);
//    }
//
//    @DeleteMapping("/{templateId}")
//    public void removeTemplate(HttpServletRequest request,
//                               @PathVariable Long templateId) {
//        templateService.removeTemplate(templateId);
//    }
}
