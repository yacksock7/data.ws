package choi.toi.data.ws.service;

import choi.toi.data.ws.configuration.support.StorageCredentials;
import choi.toi.data.ws.exception.ErrorCode;
import choi.toi.data.ws.exception.ServiceException;
import choi.toi.data.ws.model.Job;
import choi.toi.data.ws.model.support.CloudContentsType;
import choi.toi.data.ws.model.support.CloudType;
import choi.toi.data.ws.service.support.FileUploader;
import choi.toi.data.ws.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

@Slf4j
@Service
public class FileService {

    private FileUtil fileUtil;
    private StorageCredentials storageCredentials;

    @Autowired
    public FileService(FileUtil fileUtil,
                       StorageCredentials storageCredentials) {
        this.fileUtil = fileUtil;
        this.storageCredentials = storageCredentials;
    }

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Transactional
    public String fileUpload(Job job, File file, String objectName, CloudContentsType fileType, CloudType cloudType) {

        final FileUploader fileUploader = FileUploader.getFileUploader(cloudType, storageCredentials);
        String accessUrl = null;

        if(file != null && file.exists()) {
            try {
                String objectPath = getStorageObjectPath(job, objectName);
                InputStream inputStream = new FileInputStream(file);
                accessUrl = fileUploader.uploadFile(contextPath, objectPath, fileType, file.length(), inputStream);
                log.debug("Get object accessUrl = {}", accessUrl);
            } catch (Exception e) {
                log.warn("uploadFiles failed ", e);
            }
        } else {
            throw new ServiceException(ErrorCode.CanNotFoundData, "Can Not Found files. file="+ file);

        }
        return accessUrl;
    }
//
//    @PostConstruct
//    public void test() throws IOException {
//        final GcsUploader fileUploader = new GcsUploader();
//        fileUploader.uploadObject();
//
//    }

    @Transactional
    public String fileUpload(Job job, File file, CloudType cloudType, String uuid) {

        String accessUrl = null;
        if(file != null && file.exists() && file.length() > 0L) {
            try {
                final FileUploader fileUploader = FileUploader.getFileUploader(cloudType, storageCredentials);

                final String fileType = fileUtil.convertFileType(file.getName());
                final String objectName = uuid + "." + fileType;
                final CloudContentsType cloudContentsType = CloudContentsType.valueOf(fileType.toUpperCase());

                final String objectPath = getStorageObjectPath(job, objectName);
                final InputStream inputStream = new FileInputStream(file);

                accessUrl = fileUploader.uploadFile(contextPath, objectPath, cloudContentsType, file.length(), inputStream);
                log.debug("Get object accessUrl = {}", accessUrl);
            } catch (Exception e) {
                log.warn("uploadFiles failed ", e);
            }
        } else {
            throw new ServiceException(ErrorCode.CanNotFoundData, "Can Not Found files");
        }
        return accessUrl;
    }

    @Transactional
    public void deleteFile(String objectPath, CloudType cloudType) {
        final FileUploader fileUploader = FileUploader.getFileUploader(cloudType, storageCredentials);
        fileUploader.delete(objectPath);

    }

    public String getStorageObjectPath(Job job, String fileName) {
        return String.format("%s/%s/%s", job.getWorkId(), job.getId(), fileName.trim());
    }
    public String getStorageObjectPath(Job job, String uuid, String fileType) {
        final String fileName = uuid+"."+fileType;
        return String.format("%s/%s/%s", job.getWorkId(), job.getId(), fileName.trim());
    }

}
