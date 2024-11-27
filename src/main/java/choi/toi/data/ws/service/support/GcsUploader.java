package choi.toi.data.ws.service.support;

import choi.toi.data.ws.configuration.support.StorageCredentials;
import choi.toi.data.ws.model.support.CloudContentsType;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import io.grpc.Context;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Slf4j
public class GcsUploader implements FileUploader {
    private String projectId = "skillful-eon-349406";
    private String bucketName = "onthelive_basic_bucket";

    private String credentialsKey;
    private Storage storage;

    public GcsUploader(StorageCredentials storageCredentials) {
        this.credentialsKey = storageCredentials.getGoogle();
        try {
            final GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(credentialsKey));
            this.storage = StorageOptions.newBuilder().setCredentials(credentials).setProjectId(projectId).build().getService();
        } catch (IOException e) {
            log.trace("Can not initial Google Cloud Storage.");
            log.trace("Error={}", e);
        }
    }

    @Override
    public String uploadFile(String contextPath, String objectPath, File file) {
        return null;
    }

    @Override
    public String uploadFile(String contextPath, String objectPath, CloudContentsType cloudContentsType, Long size, InputStream inputStream) {

        BlobId blobId = BlobId.of(bucketName, objectPath);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();

        // Optional: set a generation-match precondition to avoid potential race
        // conditions and data corruptions. The request returns a 412 error if the
        // preconditions are not met.
        Storage.BlobWriteOption precondition;
        if (this.storage.get(bucketName, objectPath) == null) {
            // For a target object that does not yet exist, set the DoesNotExist precondition.
            // This will cause the request to fail if the object is created before the request runs.
            precondition = Storage.BlobWriteOption.doesNotExist();
        } else {
            // If the destination already exists in your bucket, instead set a generation-match
            // precondition. This will cause the request to fail if the existing object's generation
            // changes before the request runs.
            precondition =
                    Storage.BlobWriteOption
                            .generationMatch(storage.get(bucketName, objectPath).getGeneration());
        }

        try {
            storage.createFrom(blobInfo, inputStream, precondition);
        } catch (IOException e) {
            e.printStackTrace();
        }

        final String gsUtilUrl = "gs://" + bucketName + "/" + objectPath;
        return gsUtilUrl;
    }

    @Override
    public void delete(String objectPath) {
        Blob blob = this.storage.get(bucketName, objectPath);
        if (blob == null) {
            System.out.println("The object " + objectPath + " wasn't found in " + bucketName);
            return;
        }

        // Optional: set a generation-match precondition to avoid potential race
        // conditions and data corruptions. The request to upload returns a 412 error if
        // the object's generation number does not match your precondition.
        Storage.BlobSourceOption precondition =
                Storage.BlobSourceOption.generationMatch(blob.getGeneration());

        storage.delete(bucketName, objectPath, precondition);

        System.out.println("Object " + objectPath + " was deleted from " + bucketName);
    }
}
