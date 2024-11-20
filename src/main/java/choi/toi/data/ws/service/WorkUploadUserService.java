package choi.toi.data.ws.service;

import choi.toi.data.ws.model.WorkUploadUser;
import choi.toi.data.ws.model.transfer.WorkUploadUserTransfer;
import choi.toi.data.ws.repository.WorkUploadUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class WorkUploadUserService {

    private WorkUploadUserRepository workUploadUserRepository;

    @Autowired
    public WorkUploadUserService(WorkUploadUserRepository workUploadUserRepository) {
        this.workUploadUserRepository = workUploadUserRepository;
    }

    public List<WorkUploadUserTransfer> createWorkUploadUsers(Long workId, List<WorkUploadUser> workUploadUsers) {
        log.trace("createWorkUploadUsers Start... workUploadUsers={}, workId={}", workUploadUsers, workId);

        removeWorkUploadUser(workId);
        for (WorkUploadUser workUploadUser : workUploadUsers) {
            createWorkUploadUser(workUploadUser);
        }
        final List<WorkUploadUserTransfer> workUploadUserTransfers = getWorkUploadUserTransfersByWorkId(workId);
        log.trace(" workUploadUserTransfers : {}", workUploadUserTransfers);

        return workUploadUserTransfers;
    }

    public void createWorkUploadUser(WorkUploadUser workUploadUser) {
        workUploadUserRepository.insertWorkUploadUser(workUploadUser);
    }

    public WorkUploadUser getWorkUploadUser(Long workId, Long userId) {
        return workUploadUserRepository.selectWorkUploadUser(workId, userId);
    }

    public boolean isWorkUploadUser(Long workId, Long userId) {
        final WorkUploadUser workUploadUser = workUploadUserRepository.selectWorkUploadUser(workId, userId);

        return workUploadUser != null;
    }

    public List<WorkUploadUserTransfer> getWorkUploadUserTransfersByWorkId(Long workId) {
        List<WorkUploadUserTransfer> workUploadUserTransfers = workUploadUserRepository.selectWorkUploadUserTransfersByWorkId(workId);
        log.trace("workUploadUserTransfers : {}", workUploadUserTransfers );
        return workUploadUserTransfers;
    }

    public List<WorkUploadUser> getWorkUploadUsersByUserId(Long userId) {
        return workUploadUserRepository.selectWorkUploadUsersByUserId(userId);
    }

    public WorkUploadUser modifyWorkUploadUser(WorkUploadUser workUploadUser) {
        workUploadUserRepository.updateWorkUploadUser(workUploadUser);
        return getWorkUploadUser(workUploadUser.getWorkId(), workUploadUser.getUserId());
    }

    public void removeWorkUploadUser(Long workId, Long userId) {
        workUploadUserRepository.deleteWorkUploadUser(workId, userId);
    }

    public void removeWorkUploadUser(Long workId) {
        workUploadUserRepository.deleteWorkUploadUser(workId);
    }
}
