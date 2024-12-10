package choi.toi.data.ws.controller;

import choi.toi.data.ws.model.JobStep;
import choi.toi.data.ws.model.transfer.JobStepTransfers;
import choi.toi.data.ws.service.JobStepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/jobs")
public class JobStepController {

    private JobStepService jobStepService;
    @Autowired
    public JobStepController(JobStepService jobStepService) {
        this.jobStepService = jobStepService;
    }

    @PostMapping("/steps")
    public void createJobStep(HttpServletRequest request,
                              @RequestBody JobStep jobStep) {
        jobStepService.createJobStep(jobStep);
    }

    @GetMapping("/{jobId}/steps")
    public List<JobStep> getJobStepsByJobId(HttpServletRequest request,
                                            @PathVariable Long jobId) {
        return jobStepService.getJobStepsByJobId(jobId);
    }

    @GetMapping("/{jobId}/steps/{jobStepNum}")
    public JobStep getJobStep(HttpServletRequest request,
                              @PathVariable Long jobId,
                              @PathVariable Integer jobStepNum) {
        return jobStepService.getJobStep(jobId, jobStepNum);
    }
    @GetMapping("/steps/workTemplateId/{workTemplateId}/workTemplateStepNum/{workTemplateStepNum}")
    public JobStepTransfers getJobStepTransfers(HttpServletRequest request,
                                                @PathVariable Long workTemplateId,
                                                @PathVariable Integer workTemplateStepNum,
                                                @RequestParam(value="userId") Long userId,
                                                @RequestParam(value="page", required=false, defaultValue="1") Integer page,
                                                @RequestParam(value="rowsPerPage", required=false, defaultValue="5") Integer rowsPerPage) {

        return jobStepService.getJobStepTransfers(workTemplateId, workTemplateStepNum, userId, page, rowsPerPage);
    }


//    @PutMapping("/steps")
//    public JobStep modifyJobStep(JobStep jobStep) {
//        return jobStepService.modifyJobStep(jobStep);
//    }

    @DeleteMapping("/{jobId}/steps/{jobStepNum}")
    public void removeJobStep(HttpServletRequest request,
                              @PathVariable Long jobId,
                              @PathVariable Integer jobStepNum) {
        jobStepService.removeJobStep(jobId, jobStepNum);
    }
}
