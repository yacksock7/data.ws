package choi.toi.data.ws.controller;

import choi.toi.data.ws.model.Template;
import choi.toi.data.ws.model.support.TemplateType;
import choi.toi.data.ws.model.transfer.TemplateStepTransfer;
import choi.toi.data.ws.model.transfer.TemplateTableTransfer;
import choi.toi.data.ws.model.transfer.TemplateTransfer;
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
    public void create(HttpServletRequest request,
                       @RequestBody TemplateStepTransfer templateStepTransfer) {
        templateService.create(templateStepTransfer);
    }

    @GetMapping("/userId/{userId}/table")
    public List<TemplateTableTransfer> getTransfers(HttpServletRequest request,
                                                    @PathVariable Long userId) {
        return templateService.getTableTransfers(userId);
    }

    @GetMapping("/{templateId}")
    public TemplateTransfer getTransfer(HttpServletRequest request,
                                        @PathVariable Long templateId) {
        return templateService.getTransfer(templateId);
    }

    @GetMapping("/userId/{userId}")
    public List<TemplateTransfer> getTransfers(HttpServletRequest request,
                                       @PathVariable Long userId,
                                       @RequestParam(value ="templateType") TemplateType type) {
        return templateService.getTransfers(userId, type);
    }

    @DeleteMapping("/{templateId}")
    public void removeTemplate(HttpServletRequest request,
                               @PathVariable Long templateId) {
        templateService.remove(templateId);
    }

//    @PostMapping("/steps/works")
//    public void createTemplate(HttpServletRequest request,
//                                               @RequestBody WorkTransfer workTransfer) {
//        templateService.createTemplate(workTransfer);
//    }
//
}
