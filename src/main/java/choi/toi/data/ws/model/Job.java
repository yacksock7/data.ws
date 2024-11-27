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
public class Job {
    private Long id;
    private Long workId;
    private Long userId;
    private String name;
    private int jobTaskCount;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;

    public Job convertJob(Long userId, Long workId, String fileName, int jobTaskCount) {
        return Job.builder()
                .userId(userId)
                .workId(workId)
                .name(fileName)
                .jobTaskCount(jobTaskCount)
                .build();
    }

    public Job(Long userId, Long workId, String fileName, int jobTaskCount) {
        this.userId = userId;
        this.workId = workId;
        this.name = fileName;
        this.jobTaskCount = jobTaskCount;
    }
}
