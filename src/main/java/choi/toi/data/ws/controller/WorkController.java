package choi.toi.data.ws.controller;

import choi.toi.data.ws.model.Work;
import choi.toi.data.ws.model.transfer.WorkTemplateStepTransfer;
import choi.toi.data.ws.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/works")
public class WorkController {

    private WorkService workService;
    @Autowired
    public WorkController(WorkService workService) {
        this.workService = workService;
    }

    @PostMapping
    public void createWork(HttpServletRequest request,
                           @RequestBody Work work) {
        workService.createWork(work);
    }

    @GetMapping("/{workId}")
    public Work getWork(HttpServletRequest request,
                        @PathVariable Long workId) {
        return workService.getWork(workId);
    }

    @GetMapping("/workTemplateId/{workTemplateId}")
    public Work getWorkByWorkTemplateId(HttpServletRequest request,
                                        @PathVariable Long workTemplateId) {
        return workService.getWorkByWorkTemplateId(workTemplateId);
    }

    @GetMapping("/userId/{userId}")
    public List<WorkTemplateStepTransfer> getWorksByUserId(HttpServletRequest request,
                                                           @PathVariable Long userId,
                                                           @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword) {
        return workService.getWorksByUserId(userId,keyword);
    }


    @PutMapping
    public Work modifyWork(HttpServletRequest request,
                           @RequestBody Work work) {
        return workService.modifyWork(work);
    }

    @DeleteMapping("/{workId}")
    public void removeWork(HttpServletRequest request,
                           @PathVariable Long workId) {
        workService.removeWork(workId);
    }
}
