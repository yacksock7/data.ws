package choi.toi.data.ws.model;

import choi.toi.data.ws.model.support.CloudContentsType;
import choi.toi.data.ws.model.support.CloudType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CloudObject {
    private Long id;
    private CloudType cloudType;
    private CloudContentsType contentsType;
    private String bucketName;
    private String objectName;
    private boolean downloadFromObjectStorage;
    private String downloadUrl;
    private LocalDateTime downloadExpireDatetime;
    private String downloadExpireTimeZone;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
