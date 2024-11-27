package choi.toi.data.ws.service.support;

import choi.toi.data.ws.exception.ErrorCode;
import choi.toi.data.ws.exception.ServiceException;
import choi.toi.data.ws.model.support.CloudContentsType;
import choi.toi.data.ws.util.FileUtil;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.InputStream;

@Slf4j
public class OCIObjectStorageUploader implements FileUploader {



    private String encoding = "utf-8";
    private String awsUrl  = "https://cnlkg4dnisfp.compat.objectstorage.ap-seoul-1.oraclecloud.com";
    private String ociAccessUrl = "https://objectstorage.ap-seoul-1.oraclecloud.com/p/F0sf8hsmOcMrd1Hbu_gUCt2aWjAbNoW4fKKHNCvDSp8QNwbGntKEMU5nr9pFsBSm";
    private String ociNameSpace = "cnlkg4dnisfp";
    private String regionName = "ap-seoul-1";
    private String bucketName = "basic-contents-develop/";
    private String accessKey = "da4aba775abe4a65066090e8c815eb638209b642";
    private String secretKey = "Rles3o/EC0gAjNCsvt1Oj9FWCc3VikIjxB0QjQVCkeI=";
    private String ociFolderName = "work";

    private AmazonS3 s3;

    private FileUtil fileUtil = new FileUtil();

    public OCIObjectStorageUploader() {
        this.s3 = AmazonS3ClientBuilder.standard()
                .withRegionalUsEast1EndpointEnabled(true)
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(awsUrl, regionName))
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
                .build();
    }

    public OCIObjectStorageUploader(String encoding, String ociAccessUrl, String ociNameSpace, String bucketName, String awsUrl, String regionName, String accessKey, String secretKey, String ociFolderName) {

        this.encoding = encoding;
        this.ociAccessUrl = ociAccessUrl;
        this.ociNameSpace = ociNameSpace;
        this.bucketName = bucketName;
        this.ociFolderName = ociFolderName;
        this.s3 = AmazonS3ClientBuilder.standard()
                .withRegionalUsEast1EndpointEnabled(true)
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(awsUrl, regionName))
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
                .build();


        // TODO OCI CLOUD
    }


    @Override
    public String uploadFile(String contextPath, String objectPath, CloudContentsType cloudContentsType, Long size, InputStream inputStream) {

        ObjectMetadata objectMetadata = new ObjectMetadata();
        final String objectName = String.format("%s/%s", ociFolderName, objectPath);
        log.trace("Upload file object name = {}", objectName);
        objectMetadata.setContentLength(size);

        log.trace("cloudContentsType : {}", cloudContentsType);
        String fileContentType = fileUtil.getFileContentType(cloudContentsType);
        if(fileContentType == null) {
            throw new ServiceException(ErrorCode.NotAllowedExtension, String.format("UploadFile failed [%s] : fileName={%s}, fileType={%s}", ErrorCode.NotAllowedExtension, objectPath, cloudContentsType));
        }

        String accessUrl = null;
        try {
            PutObjectRequest req = new PutObjectRequest(bucketName, objectName, inputStream, objectMetadata);
            s3.putObject(req);
            accessUrl = String.format("%s/n/%s/b/%so//%s", ociAccessUrl, ociNameSpace, bucketName, objectName);
            log.debug("accessUrl : >> {}", accessUrl);
        } catch (Exception e) {
            log.warn("CanNotFoundFile uploadFile failed.. fileName={}, size={}, inputStream={}, error = {}", objectPath, size, inputStream, e);
            throw new ServiceException(ErrorCode.CanNotFoundData, String.format("UploadFile failed [%s] : fileName={%s}, size=%s inputStream={%s}", ErrorCode.CanNotFoundData, objectPath, size, inputStream));
        }
        return accessUrl;
    }

    @Override
    public void delete(String objectPath) {

    }

    @Override
    public String uploadFile(String contextPath, String objectPath, File file) {

        final String objectName = String.format("%s/%s", ociFolderName, objectPath);
        log.trace("Upload file object name = {}", objectName);

        String accessUrl = null;
        try {
            PutObjectRequest req = new PutObjectRequest(bucketName, objectName, file);
            s3.putObject(req);
            accessUrl = String.format("%s/n/%s/b/%so//%s", ociAccessUrl, ociNameSpace, bucketName, objectName);
//            log.debug("accessUrl : >> {}", accessUrl);
        } catch (Exception e) {
            log.warn("CanNotFoundFile uploadFile failed.. fileName={}, file={}, error = {}", objectName, file, e);
            throw new ServiceException(ErrorCode.CanNotFoundData, String.format("UploadFile failed [%s] : fileName={%s}", ErrorCode.CanNotFoundData, file));
        }
        return accessUrl;
    }
}