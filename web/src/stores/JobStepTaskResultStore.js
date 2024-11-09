import {action, flow, makeAutoObservable, observable} from "mobx";
import axios from "axios";
import {HistoryControlType} from "./TemplateStore";

const LogPrefix = '[JobStepTaskResultStore]';

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

export default class JobStepTaskResultStore {
    constructor(props) {
        this.jobStepTaskResultRepository = props.jobStepTaskResultRepository;

        this.jobStepTaskResultState = State.Initial;
        this.preJobResults = [];
        this.selectedJobStepTask = null;

        this.selectedJobStepTaskDetailOpen = false;
        this.selectedJobStepTaskIndex = null;
        this.preSelectedJobStepTaskIndex = null;

        this.jobStepTaskResults = [];

        this.newJobStepTaskText = Object.assign({}, JobStepTaskTextEntity);
        this.textHistory = [];
        this.textHistoryIndex = 0;

        this.checkedJobList = [];
        this.checkedJobStepTaskList = [];
        this.checkedJobId = null;
        makeAutoObservable(this);
    }

    initCheckedList = () => {
        this.checkedJobList = [];
        this.checkedJobStepTaskList = [];
        this.checkedJobId = null;
    }
    initCheckedJobList = () => {
        this.checkedJobList = [];
    }
    initCheckedJobId = () => {
        this.checkedJobId = null;
    }
    initSelectedJobStepTaskDetailOpen = () =>{
        this.selectedJobStepTaskDetailOpen = false;
    }
    changeSelectedJobStepTaskDetailOpen = (flag) =>{
        this.selectedJobStepTaskDetailOpen = flag;
    }

    initSelectedJobStepTaskIndex = () =>{
        this.selectedJobStepTaskIndex = null;
        this.preSelectedJobStepTaskIndex = null;
    }
    changeSelectedJobStepTaskIndex = (listIndex) =>{
        this.preSelectedJobStepTaskIndex = this.selectedJobStepTaskIndex;
        this.selectedJobStepTaskIndex = listIndex;
    }
    changeCheckedJobId = (num) =>{
        this.checkedJobId = num;
    }
    initCheckedJobStepTaskList = () => {
        this.checkedJobStepTaskList = [];
    }
    addCheckedJobList = (checkedJobNum) => {
        this.checkedJobList.replace([...this.checkedJobList,checkedJobNum]);
    }
    addCheckedJobStepTaskList = (checkedJobStepTaskNum) => {
        this.checkedJobStepTaskList.replace([...this.checkedJobStepTaskList,checkedJobStepTaskNum]);
    }
    delCheckedJobList = (checkedJobNum) => {
        const temp = this.checkedJobList.filter(item => item !== checkedJobNum);
        this.checkedJobList= temp;
    }
    delCheckedJobStepTaskList = (checkedJobStepTaskNum) => {
        const temp = this.checkedJobStepTaskList.filter(item => item !== checkedJobStepTaskNum);
        this.checkedJobStepTaskList= temp;
    }


    setNewJobStepTaskText = (jobStepTaskTransfer) => {
        this.selectedJobStepTask = jobStepTaskTransfer;
        if (!jobStepTaskTransfer) {
            this.newJobStepTaskText = Object.assign({}, JobStepTaskTextEntity);
        } else if (
            this.newJobStepTaskText
            && this.newJobStepTaskText.jobId === jobStepTaskTransfer.jobId
            && this.newJobStepTaskText.jobStepNum === jobStepTaskTransfer.jobStepNum
            && this.newJobStepTaskText.jobStepTaskNum === jobStepTaskTransfer.jobStepTaskNum
        ) {
            this.newJobStepTaskText = Object.assign({}, JobStepTaskTextEntity);
        } else {
            this.newJobStepTaskText = {
                jobId : jobStepTaskTransfer.jobId,
                jobStepNum : jobStepTaskTransfer.jobStepNum,
                jobStepTaskNum : jobStepTaskTransfer.jobStepTaskNum,
                userId : 0,
                text : ""
            }
        }
    }

    changeNewJobStepTaskText = (text) => {
        this.newJobStepTaskText.text = text;
        this.addTextHistory(text);
    }

    addTextHistory = (text) => {
        if (this.textHistory.length > 0 && this.textHistoryIndex < this.textHistory.length) {
            this.textHistory.splice(this.textHistoryIndex);
        }
        this.textHistory.push(text);
        this.textHistoryIndex++;
    }

    changeTextHistory = (type) => {
        if (type === HistoryControlType.Previous) {
            this.textHistoryIndex--;
            this.newJobStepTaskText.text = this.textHistory[this.textHistoryIndex-1];
        } else if (type === HistoryControlType.Next) {
            this.textHistoryIndex++;
            this.newJobStepTaskText.text = this.textHistory[this.textHistoryIndex-1];
        }
    }

    changePreJobResult = (list) => {
        this.preJobResults = list;
    }

    changeSelectedJobStepTask = (selectedJobStepTask) => {
        this.selectedJobStepTask = selectedJobStepTask;
    }

    *getJobResults(jobId, jobStepNum, jobStepTaskNum) {
        // console.log(LogPrefix + `getPreJobResults Start... jobId=${jobId}, jobStepNum=${jobStepNum}, jobStepTaskNum=${jobStepTaskNum}`);
        this.jobStepTaskResultState = State.Pending;

        try {
            const data = yield this.jobStepTaskResultRepository.getJobResults(jobId, jobStepNum, jobStepTaskNum);
            this.jobStepTaskResults = data;

            // console.log(LogPrefix + 'getPreJobResults Success!! data=', data);
        } catch(e) {
            console.warn(LogPrefix + 'getPreJobResults Failed. error=', e);
        }
    }

    *getPreJobResults(jobId, jobStepNum, jobStepTaskNum) {
        // console.log(LogPrefix + `getPreJobResults Start... jobId=${jobId}, jobStepNum=${jobStepNum}, jobStepTaskNum=${jobStepTaskNum}`);
        this.jobStepTaskResultState = State.Pending;

        try {
            const data = yield this.jobStepTaskResultRepository.getPreJobResults(jobId, jobStepNum, jobStepTaskNum);
            this.preJobResults = data;

            // console.log(LogPrefix + 'getPreJobResults Success!! data=', data);
        } catch(e) {
            console.warn(LogPrefix + 'getPreJobResults Failed. error=', e);
        }
    }



    *createJobStepTaskText(userId) {
        // console.log(LogPrefix, "createJobStepTaskText Start... userId : ", userId);

        try {
            this.newJobStepTaskText.userId = userId;
            yield this.jobStepTaskResultRepository.createJobStepTaskText(this.newJobStepTaskText);

            this.jobStepTaskState = State.Success;
            // console.log(LogPrefix, "createJobStepTaskText Success!!");
        } catch (e) {
            this.jobStepTaskState = State.Failed;
            // console.log(LogPrefix, "createJobStepTaskText Failed. error : ", e);
        }
    }

    *inspectAllJobStepTask(jobId, jobStepNum, userId) {
        // console.log(LogPrefix, "inspectAllJobStepTask Start...");

        try {
            yield this.jobStepTaskResultRepository.inspectAllJobStepTask(jobId, jobStepNum,userId);

            this.jobStepTaskState = State.Success;
            // console.log(LogPrefix, "inspectAllJobStepTask Success!!");
        } catch (e) {
            this.jobStepTaskState = State.Failed;
            // console.log(LogPrefix, "inspectAllJobStepTask Failed. error : ", e);
        }
    }

    *requestDownload(userId,workTemplateId,maxStepNum){
        console.log(LogPrefix, `requestDownload Start...userId :${userId}, maxStepNum :${maxStepNum}, workTemplateId :${workTemplateId}`);
        try {
          //  let temp;
            const data = yield this.jobStepTaskResultRepository.requestDownload(this.checkedJobId,this.checkedJobList, this.checkedJobStepTaskList,userId,workTemplateId,maxStepNum);

            // yield this.jobStepTaskResultRepository.requestDownload(temp, this.checkedJobStepTaskList,userId,workTemplateId,maxStepNum);
            this.jobStepTaskState = State.Success;
            console.log(LogPrefix, "requestDownload Success!!");
            console.log(data);
            return data;
        } catch (e) {
            this.jobStepTaskState = State.Failed;
            console.log(LogPrefix, "requestDownload Failed. error : ", e);
        }
    }
}