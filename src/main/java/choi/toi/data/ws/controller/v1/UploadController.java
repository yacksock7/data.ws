package choi.toi.data.ws.controller.v1;

import choi.toi.data.ws.model.support.UploadFileType;
import choi.toi.data.ws.model.transfer.JobStepTransfers;
import choi.toi.data.ws.service.v1.UploadService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/jobs/steps/type/UPLOAD")
public class UploadController {

    private UploadService uploadService;

    public UploadController(UploadService uploadService) {
        this.uploadService = uploadService;
    }

    @PostMapping
    public void uploadExcel(HttpServletRequest request,
                            @RequestParam(value = "userId") Long userId,
                            @RequestParam(value = "workId") Long workId,
                            @RequestParam(value = "workTemplateId") Long workTemplateId,
                            @RequestParam(value = "workTemplateStepNum") Integer workTemplateStepNum,
                            @RequestParam(value = "inputType") UploadFileType inputType,
                            @RequestParam(value = "files") List<MultipartFile> files) {
        uploadService.createJobs(userId, workId, workTemplateId, workTemplateStepNum, files, inputType);
    }

    @GetMapping("/workTemplateId/{workTemplateId}/workTemplateStepNum/{workTemplateStepNum}")
    public JobStepTransfers getJobStepTransfers(HttpServletRequest request,
                                                @PathVariable Long workTemplateId,
                                                @PathVariable Integer workTemplateStepNum,
                                                @RequestParam(value="userId") Long userId,
                                                @RequestParam(value="page", required=false, defaultValue="1") Integer page,
                                                @RequestParam(value="rowsPerPage", required=false, defaultValue="5") Integer rowsPerPage) {

        return uploadService.getJobStepTransfers(workTemplateId, workTemplateStepNum, userId, page, rowsPerPage);
    }
}
