package choi.toi.data.ws.util;


import choi.toi.data.ws.exception.ErrorCode;
import choi.toi.data.ws.exception.ServiceException;
import choi.toi.data.ws.model.support.CloudContentsType;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URL;

@Slf4j
public class FileUtil {

    public File saveFile(String storedFileUrl, String filePath) {
        try {
            File file = new File(filePath);
            FileUtils.copyURLToFile(new URL(storedFileUrl) , file);
            return file;
        } catch (IOException e) {
            log.warn("Can not saved File. filePath={}", filePath);
            log.warn("storedFileUrl={}", storedFileUrl);
            log.warn("error={}", e);
            throw new ServiceException(ErrorCode.Unknown, "Can not saved File");
        }
    }

    public String getFileContentType(CloudContentsType fileType) {
        String fileContentType = null;
        switch(fileType) {
            case XLS: fileContentType = "application/vnd.ms-excel"; break;
            case XLSX: fileContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; break;
            case WAV: fileContentType = "audio/wav"; break;
//            case "txt": fileContentType = "text/plain"; break;
//            case "pdf": fileContentType = "application/pdf"; break;
//            case "hwp": fileContentType = "application/vnd.hancom.hwp"; break;
//            case "doc": fileContentType = "application/msword"; break;
//            case "docx": fileContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"; break;
//            case "ppt": fileContentType = "application/vnd.ms-powerpoint"; break;
//            case "pptx": fileContentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation"; break;
//            case "gif": fileContentType = "image/gif"; break;
//            case "jpeg": fileContentType = "image/jpeg"; break;
//            case "jpg": fileContentType = "image/jpg"; break;
//            case "png": fileContentType = "image/png"; break;
//            case "mp4": fileContentType = "video/mp4"; break;
//            case "zip": fileContentType = "application/zip"; break;
            default:
                log.warn("NotAllowedExtension uploadFile failed.. fileType={}", fileType);
        }
        return fileContentType;
    }

    public String convertFileType(String fileName) {
        String fileType = "";
        int fileIndex = fileName.lastIndexOf(".");
        if(fileIndex >= 0) {
            fileType = fileName.substring(fileIndex + 1);
        } else {
            fileType = "";
        }
        return fileType;
    }

    public File convertMultipartToFile(String fileDir, MultipartFile mfile) {
        File file = new File(fileDir+ "/" + mfile.getOriginalFilename());
        try {
            mfile.transferTo(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return file;
    }

    public void delete(File file) {
        if (file.exists()) {file.delete();}
    }
}
