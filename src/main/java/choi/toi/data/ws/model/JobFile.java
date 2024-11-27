package choi.toi.data.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobFile {
    private Long jobId;
    private Integer jobFileNum;
    private Long uploadFileObject;
    private String uploadFileName;
    private Long userId;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
