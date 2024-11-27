package choi.toi.data.ws.service.support;


import choi.toi.data.ws.configuration.support.StorageCredentials;
import choi.toi.data.ws.exception.ErrorCode;
import choi.toi.data.ws.exception.ServiceException;
import choi.toi.data.ws.model.support.CloudContentsType;
import choi.toi.data.ws.model.support.CloudType;

import java.io.File;
import java.io.InputStream;

public interface FileUploader {


    String uploadFile(String contextPath, String objectPath, File file);
    String uploadFile(String contextPath, String objectPath, CloudContentsType cloudContentsType, Long size, InputStream inputStream);
    void delete(String objectPath);


    static FileUploader getFileUploader(CloudType cloudType, StorageCredentials storageCredentials) {
        switch (cloudType) {
            case Oracle:
                return new OCIObjectStorageUploader();
//            case GCP:
//                return new GcsUploader(storageCredentials);
            default:
                throw new ServiceException(ErrorCode.Unknown, "Can not found CloudType. cloudType="+cloudType);
        }
    }
}
