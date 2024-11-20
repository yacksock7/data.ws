package choi.toi.data.ws.repository;

import choi.toi.data.ws.model.WorkUploadUser;
import choi.toi.data.ws.model.transfer.WorkUploadUserTransfer;
import choi.toi.data.ws.repository.mapper.WorkUploadUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class WorkUploadUserRepository {

    private WorkUploadUserMapper workUploadUserMapper;

    @Autowired
    public WorkUploadUserRepository(WorkUploadUserMapper workUploadUserMapper) {
        this.workUploadUserMapper = workUploadUserMapper;
    }

    public void insertWorkUploadUser(WorkUploadUser workUploadUser) {
        workUploadUserMapper.insertWorkUploadUser(workUploadUser);
    }

    public WorkUploadUser selectWorkUploadUser(Long workId, Long userId) {
        return workUploadUserMapper.selectWorkUploadUser(workId, userId);
    }

    public List<WorkUploadUserTransfer> selectWorkUploadUserTransfersByWorkId(Long workId) {
        return workUploadUserMapper.selectWorkUploadUserTransfersByWorkId(workId);
    }

    public List<WorkUploadUser> selectWorkUploadUsersByUserId(Long userId) {
        return workUploadUserMapper.selectWorkUploadUsersByUserId(userId);
    }

    public void updateWorkUploadUser(WorkUploadUser workUploadUser) {
        workUploadUserMapper.updateWorkUploadUser(workUploadUser);
    }

    public void deleteWorkUploadUser(Long workId, Long userId) {
        workUploadUserMapper.deleteWorkUploadUser(workId, userId);
    }
    public void deleteWorkUploadUser(Long workId) {
        workUploadUserMapper.deleteWorkUploadUserByWorkId(workId);
    }
}
