package choi.toi.data.ws.service;

import choi.toi.data.ws.model.Work;
import choi.toi.data.ws.model.WorkTemplate;
import choi.toi.data.ws.model.WorkTemplateStep;
import choi.toi.data.ws.model.transfer.WorkTemplateStepTransfer;
import choi.toi.data.ws.repository.WorkRepository;
import choi.toi.data.ws.repository.WorkTemplateRepository;
import choi.toi.data.ws.repository.WorkTemplateStepRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class WorkService {

    private WorkRepository workRepository;
    private WorkTemplateRepository workTemplateRepository;
    private WorkTemplateStepRepository workTemplateStepRepository;
    private WorkUploadUserService workUploadUserService;

    @Autowired
    public WorkService(WorkRepository workRepository,
                       WorkTemplateRepository workTemplateRepository,
                       WorkTemplateStepRepository workTemplateStepRepository,
                       WorkUploadUserService workUploadUserService) {
        this.workRepository = workRepository;
        this.workTemplateRepository = workTemplateRepository;
        this.workTemplateStepRepository = workTemplateStepRepository;
        this.workUploadUserService = workUploadUserService;
    }

    public void createWork(Work work) {
        workRepository.insertWork(work);
    }

    public Work getWork(Long workId) {
        return workRepository.selectWork(workId);
    }

    public Work getWorkByWorkTemplateId(Long workTemplateId) {
        return workRepository.selectWorkByWorkTemplateId(workTemplateId);
    }

    public List<WorkTemplateStepTransfer> getWorksByUserId(Long userId, String keyword) {
        log.trace("getWorksByUserId Start... userId={}, keyword={}", userId, keyword);

        final List<WorkTemplateStepTransfer> workTemplateStepTransfers = new ArrayList<>();

        final List<Work> works = workRepository.selectWorksByUserId(userId, keyword);

        for (Work work : works) {
            final WorkTemplateStepTransfer workTemplateStepTransfer = getWorkTemplateStepTransfer(userId, work);
            workTemplateStepTransfers.add(workTemplateStepTransfer);
        }

        return workTemplateStepTransfers;
    }

    public WorkTemplateStepTransfer getWorkTemplateStepTransfer(Long userId, Work work) {

        final WorkTemplate workTemplate = workTemplateRepository.selectWorkTemplate(work.getWorkTemplateId());
        final List<WorkTemplateStep> workTemplateSteps = workTemplateStepRepository.selectWorkTemplateSteps(userId, work.getWorkTemplateId());
        final boolean isUploadUser = workUploadUserService.isWorkUploadUser(work.getId(), userId);
        log.trace("workTemplateSteps : {}", workTemplateSteps);

        return WorkTemplateStepTransfer.builder()
                .workTemplate(workTemplate)
                .workTemplateSteps(workTemplateSteps)
                .work(work)
                .isUploadUser(isUploadUser)
                .build();
    }

    public Work modifyWork(Work work) {
        workRepository.updateWork(work);
        return getWork(work.getId());
    }

    public void removeWork(Long workId) {
        workRepository.deleteWork(workId);
    }
}
