package choi.toi.data.ws.repository.mapper;

import choi.toi.data.ws.model.WorkUploadUser;
import choi.toi.data.ws.model.transfer.WorkUploadUserTransfer;

import java.util.List;

public interface WorkUploadUserMapper {
    void insertWorkUploadUser(WorkUploadUser workUploadUser);
    WorkUploadUser selectWorkUploadUser(Long workId, Long userId);
    List<WorkUploadUserTransfer> selectWorkUploadUserTransfersByWorkId(Long workId);
    List<WorkUploadUser> selectWorkUploadUsersByUserId(Long userId);
    void updateWorkUploadUser(WorkUploadUser workUploadUser);
    void deleteWorkUploadUser(Long workId, Long userId);
    void deleteWorkUploadUserByWorkId(Long workId);
}
