import {action, flow, makeAutoObservable, observable, toJS} from "mobx";
import axios from "axios";

const LogPrefix = '[JobStore]';

export const State = {
    Initial: 'Initial',
    Pending: 'Pending',
    Failed: 'Failed',
    Success: 'Success',
};

export const JobTaskStatus = {
    Waiting : "Waiting",
    Created : "Created",
    Assigned : "Assigned",
    Failed : "Failed",
    Completed : "Completed",
    RejectWaiting : "RejectWaiting",
    Rejected : "Rejected",
    Accepted : "Accepted"
}

export const JobTaskStatusLabel = {
    Waiting : "대기중",
    Created : "진행전",
    Assigned : "진행중",
    Failed : "재작업",
    Completed : "완료",
    RejectWaiting : "반려대기",
    Rejected : "반려",
    Accepted : "마감"
    // Created : "진행전",
    // Assigned : "진행중",
    // Completed : "완료",
    // Rejected : "반려",
    // Accepted : "마감"
}

export default class JobStepStore {
    constructor(props) {
        this.jobStepRepository = props.jobStepRepository;

        this.jobStepState = State.Initial;
        this.jobStepTransfers = [];
        this.selectedJobStepTransfer = null;
        this.page = 0;
        this.rowsPerPage = 5;

        this.totalCount = 0;
        this.createdCount = 0;
        this.completedCount = 0;

        makeAutoObservable(this);
    }

    init = () => {
        this.jobStepState = State.Initial;
        this.jobStepTransfers = [];
        this.selectedJobStepTransfer = null;
        this.page = 0;
        this.rowsPerPage = 5;

        this.totalCount = 0;
        this.createdCount = 0;
        this.completedCount = 0;
    }

    changeSelectedJobStepTransfer = (jobId, jobStepNum) => {
        if (this.selectedJobStepTransfer
            && this.selectedJobStepTransfer.jobId === jobId
            && this.selectedJobStepTransfer.jobStepNum === jobStepNum) {
            this.selectedJobStepTransfer = null;
        } else {
            this.selectedJobStepTransfer =
                this.jobStepTransfers.find(jobStepTransfer =>
                    jobStepTransfer.jobId === jobId && jobStepTransfer.jobStepNum === jobStepNum
                );
        }
    }

    changePage = (value) => {
        this.page = value;
    }

    changeRowsPerPage = (value) => {
        this.rowsPerPage = value;
    }

    getTaskStatus = (jobStepTransfer) => {
        //todo 작업 상태 조건 수정해야함.(재확인)
        const {taskStatusCount} = jobStepTransfer;
        let status = '';
        //console.log('##taskStatusCount', taskStatusCount);
        if (taskStatusCount.totalCount === 0
            || taskStatusCount.totalCount === (taskStatusCount.createdCount + taskStatusCount.waitingCount)) {
            status = JobTaskStatus.Created;
        //} else if (taskStatusCount.totalCount !== 0 && taskStatusCount.createdCount === 0 && taskStatusCount.assignedCount === 0 && taskStatusCount.rejectedCount === 0) {
        } else if (taskStatusCount.completedCount > 0 && taskStatusCount.totalCount === (taskStatusCount.rejectedCount + taskStatusCount.completedCount)) {
            status = JobTaskStatus.Completed;
        //} else if (taskStatusCount.rejectedCount > 0) {
        } else if (taskStatusCount.rejectedCount > 0 && taskStatusCount.totalCount !== (taskStatusCount.rejectedCount + taskStatusCount.completedCount)) {
            status = JobTaskStatus.Rejected;
        } else if (taskStatusCount.totalCount !== 0 && taskStatusCount.totalCount === taskStatusCount.Accepted) {
            status = JobTaskStatus.Accepted;
        } else  {
            status = JobTaskStatus.Assigned;
        }
        return status;
    }

    *getJobStepTransfers(workTemplateId, workTemplateStepNum, userId) {
        // this.jobStepState = State.Pending;
        try {

            const param = {
                userId : userId,
                page : this.page,
                rowsPerPage : this.rowsPerPage
            }
            let response = yield this.jobStepRepository.getJobStepTransfers(workTemplateId, workTemplateStepNum, param);

            this.totalCount = response.totalCount;
            this.createdCount = response.createdCount;
            this.completedCount = response.completedCount;
            this.jobStepTransfers = response.jobStepTransfers.map((jobStepTransfer, index) => {
                const status = this.getTaskStatus(jobStepTransfer);
                return {...jobStepTransfer, status}
            });

            this.jobStepState = State.Success;
            console.log(LogPrefix, "getJobStepTransfers Success!! response  : ", response );
        } catch (e) {
            this.jobStepState = State.Failed;
            console.log(LogPrefix, "getJobStepTransfers Failed. e : ", e);
        }
    }


}