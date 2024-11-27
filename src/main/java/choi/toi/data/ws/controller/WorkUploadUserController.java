package choi.toi.data.ws.controller;

import choi.toi.data.ws.model.WorkUploadUser;
import choi.toi.data.ws.model.transfer.WorkUploadUserTransfer;
import choi.toi.data.ws.service.WorkUploadUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/works")
public class WorkUploadUserController {

    private WorkUploadUserService workUploadUserService;
    @Autowired
    public WorkUploadUserController(WorkUploadUserService workUploadUserService) {
        this.workUploadUserService = workUploadUserService;

    }

    @PostMapping("/{workId}/users")
    public List<WorkUploadUserTransfer> createWorkUploadUsers(HttpServletRequest request,
                                                              @PathVariable Long workId,
                                                              @RequestBody List<WorkUploadUser> workUploadUsers) {
        return workUploadUserService.createWorkUploadUsers(workId, workUploadUsers);
    }

    @GetMapping("/{workId}/users/{userId}")
    public WorkUploadUser getWorkUploadUser(HttpServletRequest request,
                                               @PathVariable Long workId,
                                               @PathVariable Long userId) {
        return workUploadUserService.getWorkUploadUser(workId, userId);
    }

    @GetMapping("/{workId}/users")
    public List<WorkUploadUserTransfer> getWorkUploadUserTransfersByWorkId(HttpServletRequest request,
                                                                           @PathVariable Long workId) {
        return workUploadUserService.getWorkUploadUserTransfersByWorkId(workId);
    }

    @GetMapping("/users/{userId}")
    public List<WorkUploadUser> getWorkUploadUsersByUserId(HttpServletRequest request,
                                                              @PathVariable Long userId) {
        return workUploadUserService.getWorkUploadUsersByUserId(userId);
    }

    @PutMapping("/users")
    public WorkUploadUser modifyWorkUploadUser(HttpServletRequest request,
                                               @RequestBody WorkUploadUser workUploadUser) {
        return workUploadUserService.modifyWorkUploadUser(workUploadUser);
    }

    @DeleteMapping("/{workId}/users/{userId}")
    public void removeWorkUploadUser(HttpServletRequest request,
                                     @PathVariable Long workId,
                                     @PathVariable Long userId) {
        workUploadUserService.removeWorkUploadUser(workId, userId);
    }

}
