package choi.toi.data.ws.service;

import choi.toi.data.ws.model.CloudObject;
import choi.toi.data.ws.model.Job;
import choi.toi.data.ws.model.support.CloudContentsType;
import choi.toi.data.ws.model.support.CloudType;
import choi.toi.data.ws.repository.CloudObjectRepository;
import choi.toi.data.ws.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Slf4j
@Service
public class CloudObjectService {

    private CloudObjectRepository cloudObjectRepository;
    private FileService fileService;
    private FileUtil fileUtil;
    @Autowired
    public CloudObjectService(CloudObjectRepository cloudObjectRepository,
                              FileService fileService,
                              FileUtil fileUtil) {

        this.cloudObjectRepository = cloudObjectRepository;
        this.fileService = fileService;
        this.fileUtil = fileUtil;
    }

    @Value("${data.ws.file.access.aws.bucket-name}")
    private String bucketName;


    @Value("${stt.file.dir}")
    private String fileDir;


    public CloudObject createCloudObject(Job job, MultipartFile mFile) {

        final File file = fileUtil.convertMultipartToFile(fileDir, mFile);
        final String fileType = fileUtil.convertFileType(file.getName());
        final String objectName = UUID.randomUUID() + "." + fileType;

        final CloudContentsType cloudContentsType = CloudContentsType.valueOf(fileType.toUpperCase());

        final CloudType cloudType = CloudType.Oracle;

        final String accessUrl = fileService.fileUpload(job, file, objectName, cloudContentsType, cloudType);
        log.trace("accessUrl={}",accessUrl);

        final LocalDateTime expireDatetime = LocalDateTime.now(ZoneOffset.UTC).plusMonths(3);

        // TODO 여러 cloud type이 생길 수 있습니다.
        final CloudObject cloudObject = CloudObject.builder()
                .cloudType(cloudType)
                .contentsType(cloudContentsType)
                .bucketName(bucketName)
                .objectName(objectName)
                .downloadFromObjectStorage(true)
                .downloadUrl(accessUrl)
                .downloadExpireDatetime(expireDatetime)
                .downloadExpireTimeZone("UTC")
                .build();


        cloudObjectRepository.insertCloudObject(cloudObject);
        return cloudObject;
    }

    public CloudObject getCloudObject(Long id) {
        return cloudObjectRepository.selectCloudObject(id);
    }

}
