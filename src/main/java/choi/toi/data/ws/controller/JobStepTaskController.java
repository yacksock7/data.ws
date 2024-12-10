package choi.toi.data.ws.controller;

import choi.toi.data.ws.model.JobStepTask;
import choi.toi.data.ws.model.JobStepTaskReject;
import choi.toi.data.ws.model.JobStepTaskResult;
import choi.toi.data.ws.model.support.JobStepResultStatus;
import choi.toi.data.ws.model.transfer.JobStepTaskTransfer;
import choi.toi.data.ws.service.JobStepTaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/jobs")
public class JobStepTaskController {

    private JobStepTaskService jobStepTaskService;

    @Autowired
    public JobStepTaskController(JobStepTaskService jobStepTaskService) {
        this.jobStepTaskService = jobStepTaskService;
    }

    @PostMapping("/steps/tasks")
    public void createJobStepTask(HttpServletRequest request,
                                  @RequestBody JobStepTask jobStepTask) {
        jobStepTaskService.createJobStepTask(jobStepTask);
    }

    @PostMapping("/steps/tasks/results")
    public void processNextJobStepTask(HttpServletRequest request,
                                  @RequestBody JobStepTaskResult jobStepTaskResult,
                                  @RequestParam JobStepResultStatus status) {
        jobStepTaskService.processNextJobStepTask(jobStepTaskResult);
    }

    @GetMapping("/{jobId}/steps/{jobStepNum}/tasks")
    public List<JobStepTaskTransfer> getJobStepTaskTransfers(HttpServletRequest request,
                                                             @PathVariable Long jobId,
                                                             @PathVariable Integer jobStepNum,
                                                             @RequestParam(value="userId") Long userId) {
        return jobStepTaskService.getJobStepTaskTransfers(jobId, jobStepNum, userId);
    }
    @GetMapping("/{jobId}/steps/{jobStepNum}/tasks/taskArray")
    public List<JobStepTaskTransfer> getJobStepTaskTransfersByArray(HttpServletRequest request,
                                                             @PathVariable Long jobId,
                                                             @PathVariable Integer jobStepNum,
                                                             @RequestParam(value="userId") Long userId,
                                                             @RequestParam(value="startNum") Integer startNum,
                                                             @RequestParam(value ="dataLength") Integer dataLength) {
        return jobStepTaskService.getJobStepTaskTransfersByArray(jobId, jobStepNum, userId,startNum, dataLength);
    }
    @GetMapping("/{jobId}/steps/{jobStepNum}/tasks/count")
    public Integer getJobStepTasksCount(HttpServletRequest request,
                                                             @PathVariable Long jobId,
                                                             @PathVariable Integer jobStepNum,
                                                             @RequestParam(value="userId") Long userId) {
        return jobStepTaskService.getJobStepTasksCount(jobId, jobStepNum, userId);
    }

    @GetMapping("/{jobId}/steps/{jobStepNum}/tasks/{jobStepTaskNum}")
    public JobStepTask getJobStep(HttpServletRequest request,
                                  @PathVariable Long jobId,
                                  @PathVariable Integer jobStepNum,
                                  @PathVariable Integer jobStepTaskNum) {
        return jobStepTaskService.getJobStepTask(jobId, jobStepNum, jobStepTaskNum);
    }

    @PutMapping("/steps/tasks")
    public JobStepTask modifyJobStep(HttpServletRequest request,
                                     @RequestBody JobStepTask jobStepTask) {
        return jobStepTaskService.modifyJobStepTask(jobStepTask);
    }

    @PutMapping("/steps/tasks/reject")
    public void rejectJobStepTask(HttpServletRequest request,
                                     @RequestBody JobStepTaskReject jobStepTaskReject,
                                     @RequestParam Long userId) {
        //Todo TEST 중
        //jobStepTaskService.rejectJobStepTask(jobStepTaskReject, userId);
        jobStepTaskService.tempRejectJobStepTask(jobStepTaskReject, userId);
    }

    @DeleteMapping("/{jobId}/steps/{jobStepNum}/tasks/{jobStepTaskNum}")
    public void removeJobStep(HttpServletRequest request,
                              @PathVariable Long jobId,
                              @PathVariable Integer jobStepNum,
                              @PathVariable Integer jobStepTaskNum) {
        jobStepTaskService.removeJobStepTask(jobId, jobStepNum, jobStepTaskNum);
    }

}
