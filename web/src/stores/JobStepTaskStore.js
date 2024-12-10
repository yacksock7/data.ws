import {action, flow, makeAutoObservable, observable} from "mobx";
import axios from "axios";
import {HistoryControlType, ResultType} from "./TemplateStore";

const LogPrefix = '[JobStore]';

export const State = {
    Initial: 'Initial',
    Pending: 'Pending',
    Failed: 'Failed',
    Success: 'Success',
};

export const JobStepTaskTextEntity = {
    jobId : 0,
    jobStepNum : 0,
    jobStepTaskNum : 0,
    userId : 0,
    text : '',
    createdDatetime : '',
    updatedDatetime : '',
}

export const StatusTypeColor = {
    Waiting : "#26a646",
    Created : "#26a646",
    Assigned : "#26a646",
    Failed : "#26a646",
    RejectWaiting : "#dcbdff",
    Rejected : "#F27154",
    Completed : "#056cf2",
    Accepted : "#056cf2"
}

export default class JobStepTaskStore {
    constructor(props) {
        this.jobStepTaskRepository = props.jobStepTaskRepository;

        this.jobStepTaskState = State.Initial;
        this.jobStepTaskTransfers = [];
        this.selectedJobStepTaskTransfer = null;

        this.newJobStepTaskText = Object.assign({}, JobStepTaskTextEntity);
        this.textHistory = [];
        this.textHistoryIndex = 0;

        this.selectJobStepEditNum = 0;

        this.rejectTargetStep = null;

        this.getListJobStepTaskTransfers = [];
        this.lastGetListJobStepTaskTransfers = [];
        this.lastGetJobStepTaskTransferNum = null;

        this.searchIntervalState = undefined;
        this.getRequestFlag = false;
        this.getListStartNum = 0;
        this.getJobStepTaskState = State.Initial;
        this.jobStepTasksCount = 0;

        makeAutoObservable(this);
    }

    init = () => {
        this.jobStepTaskState = State.Initial;
        this.selectedJobStepTaskTransfer = null;

        // this.newJobStepTaskText = Object.assign({}, JobStepTaskTextEntity);
        // this.textHistory = [];
        // this.textHistoryIndex = 0;
        this.getListJobStepTaskTransfers = [];
        this.lastGetListJobStepTaskTransfers = [];
        this.lastGetJobStepTaskTransferNum = null;
        this.selectJobStepEditNum = 0;
    }

    initJobStepTaskTransfers = () => {
        this.jobStepTaskTransfers = [];
    }

    rejectComponentInit = () => {
        this.rejectTargetStep = null;
    }

    changeRejectTargetStep = (workTemplateStepNum) => {
        this.rejectTargetStep = workTemplateStepNum;
    }

    initSelectJobStepEditNum = () =>
    {
        this.selectJobStepEditNum = 0;
    }
    changeSelectJobStepEditNum = (number) =>
    {
        this.selectJobStepEditNum = number;
    }

    initGetListJobStepTaskTransfers = () =>{
        this.getListJobStepTaskTransfers = [];
        this.lastGetListJobStepTaskTransfers = [];
    }

    initLastGetJobStepTaskTransferNum =() =>{
        this.lastGetJobStepTaskTransferNum = null;
    }

    pushGetListJobStepTaskTransfers = (item) =>{
        //this.getListJobStepTaskTransfers.push(item);
        this.getListJobStepTaskTransfers.replace([...this.getListJobStepTaskTransfers, item]);
        console.log('getListJobStepTaskTransfers : ', this.getListJobStepTaskTransfers);
    }
    pushLastGetListJobStepTaskTransfers = (item) =>{
        this.lastGetListJobStepTaskTransfers.push(item);
        console.log('getListJobStepTaskTransfers : ', this.getListJobStepTaskTransfers);
    }
    changeGetRequestFlag = (flag) =>{
        this.getRequestFlag = flag;
    }

    changeJobStepTasksCount = (count) =>{
        this.jobStepTasksCount = count;
    }

    *getJobStepTaskTransfers(jobId, jobStepNum, userId) {
        console.log(LogPrefix, `getJobStepTaskTransfers Start... jobId=${jobId}, jobStepNum=${jobStepNum}, userId=${userId}`);
        this.jobStepTaskState = State.Pending;
        try {
            const param = {
                userId : userId
            }
            const jobStepTaskTransfers = yield this.jobStepTaskRepository.getJobStepTaskTransfers(jobId, jobStepNum, param);
            this.jobStepTaskTransfers = jobStepTaskTransfers;

            this.jobStepTaskState = State.Success;
            console.log(LogPrefix, "getJobStepTaskTransfers Success!! jobStepTaskTransfers : ", jobStepTaskTransfers);
        } catch (e) {
            this.jobStepTaskState = State.Failed;
            console.log(LogPrefix, "getJobStepTaskTransfers Failed error : ", e);
        }
    }

    *processNextJobStepTask(jobStepTaskResult,jobStepTaskTransfer) {
        console.log(LogPrefix, `processNextJobStepTask Start... `,jobStepTaskResult);
        this.jobStepTaskState = State.Initial;
        try {
            let jobStepTaskAudio = null;
            let jobStepTaskTag = null;
            const data = {
                jobId : jobStepTaskResult.jobId,
                jobStepNum : jobStepTaskResult.jobStepNum,
                jobStepTaskNum : jobStepTaskResult.jobStepTaskNum,
                index : 1,
                resultType : jobStepTaskResult.resultType,
                userId : jobStepTaskResult.userId,
                jobStepTaskText : {
                    text : jobStepTaskResult.jobStepTaskText.text ?  jobStepTaskResult.jobStepTaskText.text : null
                },
                jobStepTaskAudio : jobStepTaskAudio,
                JobStepTaskTag : jobStepTaskTag
            }
            if(jobStepTaskResult.id)
                data.id = jobStepTaskResult.id;

            //JobStepTaskTransfer
            yield this.jobStepTaskRepository.processNextJobStepTask(data,jobStepTaskTransfer);
            this.jobStepTaskState = State.Success;
            console.log(LogPrefix, "processNextJobStepTask Success!!");
        } catch (e) {
            this.jobStepTaskState = State.Failed;
            console.log(LogPrefix, "processNextJobStepTask Failed error : ", e);
        }
    }

    *getJobStepTasksCount(jobId, jobStepNum, userId) {
        console.log(LogPrefix, `getJobStepTaskCounts Start... jobId=${jobId}, jobStepNum=${jobStepNum}, userId=${userId}`);
        this.jobStepTaskState = State.Pending;
        try {
            const param = {
                userId : userId
            }
            this.jobStepTasksCount = yield this.jobStepTaskRepository.getJobStepTasksCount(jobId, jobStepNum, param);

            this.jobStepTaskState = State.Success;
            console.log(LogPrefix, "getJobStepTaskCounts Success!! jobStepTasksCount : ", this.jobStepTasksCount);
        } catch (e) {
            this.jobStepTaskState = State.Failed;
            console.log(LogPrefix, "getJobStepTaskCounts Failed error : ", e);
        }
    }

    setIntervalForGetJobStepTaskTransfers = (jobId, jobStepNum, userId, judgeDiff) =>{

        if ((this.searchIntervalState === undefined) || (this.searchIntervalState === null)) {
            console.log(LogPrefix, "Starting SearchInterval ...");
            this.searchIntervalState = setInterval(() => this.intervalForGetJobStepTaskTransfers(jobId, jobStepNum, userId,judgeDiff), 200);

        } else {
            console.log(LogPrefix, "SearchInterval already started ...");
        }
    }

    intervalForGetJobStepTaskTransfers = (jobId, jobStepNum, userId, judgeDiff) =>{

        if (this.getListJobStepTaskTransfers.length===0) {
            clearInterval(this.searchIntervalState);
            this.searchIntervalState = undefined;
        } else {
            const uniqueArray = [...new Set(this.getListJobStepTaskTransfers)];
            let flag = false;
            if(Math.abs(uniqueArray[0]-this.lastGetJobStepTaskTransferNum) >= judgeDiff || this.lastGetJobStepTaskTransferNum ===null)
                flag = true;

            if(this.compareArrays(uniqueArray,this.lastGetListJobStepTaskTransfers)){
                console.log(LogPrefix, "compareArray ... ", uniqueArray);
                this.getJobStepTaskTransferByArrayInterval(jobId, jobStepNum, userId, flag);
            } else{
                this.lastGetListJobStepTaskTransfers = uniqueArray;
            }
        }
    }

    compareArrays(arr1,arr2){
        if (arr1.length !== arr2.length) {
            return false;
        }

        return arr1.every((value, index) => value === arr2[index]);
    }
    changeGetJobStepTaskState = (state) =>{
        this.getJobStepTaskState = state;
    }
    *getJobStepTaskTransferByArrayInterval(jobId, jobStepNum, userId, flag) {
        console.log(LogPrefix, `getJobStepTaskTransferByArrayInterval Start... jobId=${jobId}, jobStepNum=${jobStepNum}, userId=${userId}`);
        try {
            let askedList = this.lastGetListJobStepTaskTransfers;

            if(flag){
                this.initJobStepTaskTransfers();
            } else{
                let filteredArr = askedList.filter((element) => {
                    return this.jobStepTaskTransfers[element] === undefined;
                });
                askedList = filteredArr;
            }

            const param = {
                userId : userId,
                startNum : askedList[0],
                dataLength : askedList.length
            }
            this.getJobStepTaskState = State.Pending;
            const jobStepTaskTransfers = yield this.jobStepTaskRepository.getJobStepTaskTransfersByArray(jobId, jobStepNum, param);
            for(let i=0;i<jobStepTaskTransfers.length;i++) {
                this.jobStepTaskTransfers[jobStepTaskTransfers[i].jobStepTaskNum - 1] = jobStepTaskTransfers[i];
                console.log('jobStepTaskTransfers[i]',jobStepTaskTransfers[i]);
            }
            console.log('this.jobStepTaskTransfers',this.jobStepTaskTransfers)
            //this.jobStepTaskTransfers = jobStepTaskTransfers;
            if(this.lastGetListJobStepTaskTransfers[0] !== undefined)
                this.lastGetJobStepTaskTransferNum = this.lastGetListJobStepTaskTransfers[0];
            this.initGetListJobStepTaskTransfers();
            clearInterval(this.searchIntervalState);
            this.searchIntervalState = undefined;

            this.changeGetRequestFlag(false);
            console.log(LogPrefix, "getJobStepTaskTransferByArrayInterval Success!! jobStepTaskTransfers : ", jobStepTaskTransfers);
            this.getJobStepTaskState = State.Success;
        } catch (e) {

            this.getJobStepTaskState = State.Failed;
            this.initGetListJobStepTaskTransfers();
            clearInterval(this.searchIntervalState);
            this.searchIntervalState = undefined;
            this.lastGetJobStepTaskTransferNum = null;
            this.changeGetRequestFlag(false);
            console.log(LogPrefix, "getJobStepTaskTransferByArrayInterval Failed error : ", e);
        }
    }
}