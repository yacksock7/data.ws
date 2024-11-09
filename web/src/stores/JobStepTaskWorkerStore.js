import {makeAutoObservable, toJS} from "mobx";

const LogPrefix = '[JobStepTaskWorkerStore]';

export const State = {
    Initial: 'Initial',
    Pending: 'Pending',
    Failed: 'Failed',
    Success: 'Success',
};

export const JobStepTaskIdEmpty = {
    jobId: 0,
    jobStepNum: 0,
    jobStepTaskNum: 0,
}

export default class JobStepTaskWorkerStore {
    constructor(props) {
        this.jobStepTaskWorkerRepository = props.jobStepTaskWorkerRepository;

        this.jobStepTaskWorkerState = State.Initial;
        this.checkedJobStepIds = [];
        this.selectedWorkers = [];
        this.selectedJobStepTransfer = null;

        makeAutoObservable(this);
    }

    init = () => {
        this.jobStepTaskWorkerState = State.Initial;
        this.selectedWorkers = [];
    }

    changeSelectedJobStepTransfer = (selectedJobStepTransfer) => {
        this.selectedJobStepTransfer = selectedJobStepTransfer;
    }

    addJobStepIdTasks = (jobId, jobStepNum, check) => {
        const jobStepTaskId = {jobId, jobStepNum};
        const idx = this.checkedJobStepIds.findIndex(id => id.jobId === jobId && id.jobStepNum === jobStepNum);
        if (!check) {
            if (idx > -1) {
                this.checkedJobStepIds.splice(idx, 1);
            } else {
                this.checkedJobStepIds.push(jobStepTaskId);
            }
        } else {
            if (idx === -1) {
                this.checkedJobStepIds.push(jobStepTaskId);
            }
        }
    }

    addSelectedWorkers = (user) => {
        const selectedWorker = this.selectedWorkers.find( e => e.id === user.id);
        if (!selectedWorker) {
            this.selectedWorkers.push(user);
        }
        this.selectedWorkers = toJS(this.selectedWorkers);
    }

    removeSelectedWorkers = (userId) => {
        const idx = this.selectedWorkers.findIndex(worker => worker.userId === userId);
        if (idx > -1) {
            this.selectedWorkers.splice(idx, 1);
        }
    }

    *createJobStepTaskWorkers() {
        console.log("createJobStepTaskWorkers Start... this.checkedJobStepIds=", this.checkedJobStepIds)
        this.jobStepTaskWorkerState = State.Pending;

        try {

            const userIds = this.selectedWorkers.map( worker => worker.id);
            const data = {
                jobSteps : this.checkedJobStepIds,
                userIds : userIds,
            }
            yield this.jobStepTaskWorkerRepository.createJobStepTaskWorkers(data);


            this.init();
            this.jobStepTaskWorkerState = State.Success;
            console.log("createJobStepTaskWorkers Success!!");
        } catch (e) {
            this.jobStepTaskWorkerState = State.Failed;
            console.log("createJobStepTaskWorkers Failed. error=", e);
        }
    }

    *createJobStepTaskRowWorkers(jobStepTaskTransfer) {
        console.log("createJobStepTaskRowWorkers Start... ")
        this.jobStepTaskWorkerState = State.Pending;
        console.log(jobStepTaskTransfer);
        const jobStepTaskData = {
            jobId : jobStepTaskTransfer.jobId,
            jobStepNum : jobStepTaskTransfer.jobStepNum,
            jobStepTaskNum : jobStepTaskTransfer.jobStepTaskNum,
            inputType : jobStepTaskTransfer.inputType,
            resultType : jobStepTaskTransfer.resultType,
            status: jobStepTaskTransfer.status,
            createdDatetime:jobStepTaskTransfer.createdDatetime,
            updatedDatetime:jobStepTaskTransfer.updatedDatetime
        }
        try {

            const userIds = this.selectedWorkers.map( worker => worker.id);
            const data = {
                jobStepTask : jobStepTaskData,
                userIds : userIds
            }
            yield this.jobStepTaskWorkerRepository.createJobStepTaskRowWorkers(data);


            this.init();
            this.jobStepTaskWorkerState = State.Success;
            console.log("createJobStepTaskWorkers Success!!");
        } catch (e) {
            this.jobStepTaskWorkerState = State.Failed;
            console.log("createJobStepTaskWorkers Failed. error=", e);
        }
    }

    *getJobStepTaskWorkers(jobId, jobStepNum) {
        console.log("getJobStepTaskWorkers Start... ")
        this.jobStepTaskWorkerState = State.Pending;

        try {
            const checkedJobStepIds = yield this.jobStepTaskWorkerRepository.getJobStepTaskWorkers(jobId, jobStepNum);

            checkedJobStepIds.forEach(checkedJobStepId => this.addJobStepIdTasks(checkedJobStepId.jobId, checkedJobStepId.jobStepNum, true));
            this.selectedWorkers = checkedJobStepIds.map(e => e.user);

            this.jobStepTaskWorkerState = State.Success;
            console.log("getJobStepTaskWorkers Success!! checkedJobStepIds=", checkedJobStepIds);
        } catch (e) {
            this.jobStepTaskWorkerState = State.Failed;
            console.log("getJobStepTaskWorkers Failed. error=", e);
        }
    }
}