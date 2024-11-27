package choi.toi.data.ws.controller.v1;

import choi.toi.data.ws.model.support.UploadFileType;
import choi.toi.data.ws.service.v1.UploadService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/jobs/steps/type/upload")
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

    }
}
