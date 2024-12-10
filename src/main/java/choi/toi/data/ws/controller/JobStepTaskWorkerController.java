package choi.toi.data.ws.controller;

import choi.toi.data.ws.model.JobStepTaskWorker;
import choi.toi.data.ws.model.transfer.CreateJobStepTaskRowWorkerTransfer;
import choi.toi.data.ws.model.transfer.CreateJobStepTaskWorkerTransfer;
import choi.toi.data.ws.service.JobStepTaskWorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/jobs")
public class JobStepTaskWorkerController {

    private JobStepTaskWorkerService jobStepTaskWorkerService;
    @Autowired
    public JobStepTaskWorkerController(JobStepTaskWorkerService jobStepTaskWorkerService) {
        this.jobStepTaskWorkerService = jobStepTaskWorkerService;
    }

//    @PostMapping("{jobId}/steps/{jobStepNum}/tasks/{jobStepTaskNum}/workers/{userId}")
//    public void createJobStepTaskWorker(HttpServletRequest request,
//                                        @RequestBody JobStepTaskWorker jobStepTaskWorker) {
//        jobStepTaskWorkerService.createJobStepTaskWorker(jobStepTaskWorker);
//    }

    @PostMapping("/steps/tasks/workers")
    public void createJobStepTaskWorkers(HttpServletRequest request,
                                        @RequestBody CreateJobStepTaskWorkerTransfer jobStepTaskWorkerTransfer) {
        jobStepTaskWorkerService.createJobStepTaskWorkers(jobStepTaskWorkerTransfer);
    }

    @PostMapping("/steps/tasks/rows/workers")
    public void createJobStepTaskRowWorkers(HttpServletRequest request,
                                        @RequestBody CreateJobStepTaskRowWorkerTransfer jobStepTaskRowWorkerTransfer) {
        jobStepTaskWorkerService.createJobStepTaskRowWorkers(jobStepTaskRowWorkerTransfer);
    }

    @GetMapping("/{jobId}/steps/{jobStepNum}/tasks/{jobStepTaskNum}/workers/{userId}")
    public JobStepTaskWorker getJobStepTaskWorker(HttpServletRequest httpServletRequest,
                                                  @PathVariable Long jobId,
                                                  @PathVariable Integer jobStepNum,
                                                  @PathVariable Integer jobStepTaskNum,
                                                  @PathVariable Long userId) {
        return jobStepTaskWorkerService.getJobStepTaskWorker(jobId, jobStepNum, jobStepTaskNum, userId);
    }

    @GetMapping("/{jobId}/steps/{jobStepNum}/tasks/{jobStepTaskNum}/workers")
    public List<JobStepTaskWorker> getJobStepTaskWorkers(HttpServletRequest httpServletRequest,
                                                         @PathVariable Long jobId,
                                                         @PathVariable Integer jobStepNum,
                                                         @PathVariable Integer jobStepTaskNum) {
        return jobStepTaskWorkerService.getJobStepTaskWorkers(jobId, jobStepNum, jobStepTaskNum);
    }

    @GetMapping("/{jobId}/steps/{jobStepNum}/tasks/workers")
    public List<JobStepTaskWorker> getJobStepTaskWorkers(HttpServletRequest httpServletRequest,
                                                         @PathVariable Long jobId,
                                                         @PathVariable Integer jobStepNum) {
        return jobStepTaskWorkerService.selectJobStepWorkersByJobStepId(jobId, jobStepNum);
    }

//    @PutMapping("/steps/tasks/workers")
//    public JobStepTaskWorker modifyJobStepTaskWorker(HttpServletRequest request,
//                                                     @RequestBody JobStepTaskWorker jobStepTaskWorker) {
//        return jobStepTaskWorkerService.modifyJobStepTaskWorker(jobStepTaskWorker);
//    }

    @DeleteMapping("/{jobId}/steps/{jobStepNum}/tasks/{jobStepTaskNum}/workers/{userId}")
    public void removeJobStepTaskWorker(HttpServletRequest request,
                                        @PathVariable Long jobId,
                                        @PathVariable Integer jobStepNum,
                                        @PathVariable Integer jobStepTaskNum,
                                        @PathVariable Long userId) {
        jobStepTaskWorkerService.removeJobStepTaskWorker(jobId, jobStepNum, jobStepTaskNum, userId);
    }
}
