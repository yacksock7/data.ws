import {action, flow, makeAutoObservable, observable} from "mobx";
import axios from "axios";
import {HistoryControlType} from "./TemplateStore";

const LogPrefix = '[RejectStore]';

export const State = {
    Initial: 'Initial',
    Pending: 'Pending',
    Failed: 'Failed',
    Success: 'Success',
};

export const JobRejectEntity = {
    jobId : 0,
    jobStepNum : 0,
    jobStepTaskNum : 0,
    userId : 0,
    targetStepNum : 0,
    rejectComment : ""
}
export default class JobRejectStore {
    constructor(props) {
        this.jobRejectRepository = props.jobRejectRepository;

        this.rejectState = State.Initial;

        this.rejectPoints = [];
        this.rejectTarget = Object.assign({}, JobRejectEntity);

        makeAutoObservable(this);
    }

    initRejectTarget = () => {
        this.rejectTarget = Object.assign({}, JobRejectEntity);
    }
    setRejectTarget = (jobId, jobStepNum, jobStepTaskNum, userId) => {
        this.rejectTarget = {jobId ,jobStepNum, jobStepTaskNum, userId, rejectComment: "", targetStepNum: 0}
    }

    changeRejectTargetRejectComment = (rejectComment) => {
        this.rejectTarget.rejectComment = rejectComment;
    }

    changeRejectTargetStepNum = (targetStepNum) => {
        this.rejectTarget.targetStepNum = targetStepNum;
    }

    *getRejectPoint(workTemplateId) {
        console.log(LogPrefix, `getRejectPoint Start... workTemplateId=${workTemplateId}`);
        this.rejectState = State.Pending;

        try {
            const response = yield this.jobRejectRepository.getRejectPoint(workTemplateId);
            this.rejectPoints = response;

            this.rejectState = State.Success;
            console.log(LogPrefix, "getRejectPoint Success!! response=", response);
        } catch (e) {
            this.rejectState = State.Failed;
            console.log(LogPrefix, "getRejectPoint ERROR! e=", e);
        }
    }

    *saveJobReject(userId) {
        console.log(LogPrefix, `createJobReject Start...`);
        this.rejectState = State.Pending;

        try {
            const data = this.rejectTarget;
            const param = {
                userId : userId
            }
            yield this.jobRejectRepository.saveJobReject(data,param);

            this.rejectState = State.Success;
            console.log(LogPrefix, "createJobReject Success!!");
        } catch (e) {
            this.rejectState = State.Failed;
            console.log(LogPrefix, "createJobReject ERROR! e=", e);
        }
    }

}