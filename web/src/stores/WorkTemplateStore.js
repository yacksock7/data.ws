import {makeAutoObservable} from "mobx";

const LogPrefix = '[WorkStore]';

export const State = {
    Initial: 'Initial',
    Pending: 'Pending',
    Failed: 'Failed',
    Success: 'Success',
};

export const TemplateStepType = {
    Upload:'Upload',
    Recording:'Recording',
    Machine:'Machine',
    Labeling : 'Labeling',
    Editing : 'Editing',
    Refine:'Refine',
    Inspection : 'Inspection',
    Export : 'Export'
}

const EmptyWorkTemplate = {
    id : 0,
    userId : 0,
    type : 'Private',
    name : '',
    createdDatetime : '',
    updatedDatetime : ''
}


export default class WorkTemplateStore {
    constructor(props) {
        this.workTemplateRepository = props.workTemplateRepository;

        this.workTemplateState = State.Initial;
        this.workTemplate = Object.assign({}, EmptyWorkTemplate);
        this.workTemplateSteps = [];
        this.workTemplateStepTransfer = [];

        this.rejectPoints = [];

        this.preWorkTemplateSteps = [];
        this.workTemplateStepViewingRoles = [];
        this.viewingTemplateStepNums=0;
        makeAutoObservable(this);
    }

    init = () => {
        this.workTemplateState = State.Initial;
        this.workTemplate = Object.assign({}, EmptyWorkTemplate);
        this.workTemplateSteps = [];
        this.workTemplateStepTransfer = [];

        this.rejectPoints = [];
    }

    changeWorkTemplateStepViewingRoles = (workTemplateId, workTemplateStepNum, stepNum) => {
        const stepIndex = this.workTemplateStepViewingRoles.findIndex(role => role.viewingTemplateStepNum === stepNum);
        if (stepIndex === -1) {
            const role = {
                workTemplateId, workTemplateStepNum,
                viewingTemplateStepNum : stepNum
            }
            this.workTemplateStepViewingRoles.push(role);
        } else {
            this.workTemplateStepViewingRoles.splice(stepIndex, 1);
        }
    }

    changeViewingTemplateStepNums = (viewingTemplateStepNums) =>{
        this.viewingTemplateStepNums = viewingTemplateStepNums;
    }

    *getWorkTemplateAndSteps(workId) {
        console.log(LogPrefix, `getWorkTemplateAndSteps Start... workId=${workId}`);
        this.workTemplateState = State.Pending;

        try {
            const response= yield this.workTemplateRepository.getWorkTemplateAndSteps(workId);

            this.workTemplateState = State.Success;
            this.workTemplateStepTransfer = response;

            console.log(LogPrefix, "getWorkTemplateAndSteps Success!! response=", response);

        } catch (e) {
            this.workTemplateState = State.Failed;
            console.log(LogPrefix, "getWorkTemplateAndSteps ERROR! e=", e.data);
        }
    }

    *getWorkTemplateStepByRejectPoint(workTemplateId) {
        console.log(LogPrefix, `getWorkTemplateStepByRejectPoint Start... workTemplateId=${workTemplateId}`);
        this.workTemplateState = State.Pending;

        try {
            const response = yield this.workTemplateRepository.getWorkTemplateStepByRejectPoint(workTemplateId);

            this.rejectPoints = response;

            this.workTemplateState = State.Success;
            console.log(LogPrefix, "getWorkTemplateStepByRejectPoint Success!! response=", response);
        } catch (e) {
            this.workTemplateState = State.Failed;
            console.log(LogPrefix, "getWorkTemplateStepByRejectPoint ERROR! e=", e.data);
        }
    }

    *getPreWorkTemplateSteps(workTemplateId, workTemplateStepNum) {
        console.log(LogPrefix, `getPreWorkTemplateSteps Start... workTemplateId=${workTemplateId}, workTemplateStepNum=${workTemplateStepNum}`);
        this.workTemplateState = State.Pending;

        try {
            const response = yield this.workTemplateRepository.getPreWorkTemplateSteps(workTemplateId, workTemplateStepNum);

            this.preWorkTemplateSteps = response;
            this.workTemplateState = State.Success;

            console.log(LogPrefix, "getPreWorkTemplateSteps Success!! response=", response);
        } catch (e) {
            this.workTemplateState = State.Failed;
            console.log(LogPrefix, "getPreWorkTemplateSteps ERROR! e=", e.data);
        }
    }


    *getWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum) {
        console.log(LogPrefix, `getViewingTemplateStep Start... workTemplateId=${workTemplateId}, workTemplateStepNum=${workTemplateStepNum}`);
        this.workTemplateState = State.Pending;

        try {
            const response = yield this.workTemplateRepository.getWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);

            this.workTemplateStepViewingRoles = response;
            this.workTemplateState = State.Success;

            console.log(LogPrefix, "getViewingTemplateStep Success!! response=", response);
        } catch (e) {
            this.workTemplateState = State.Failed;
            console.log(LogPrefix, "getViewingTemplateStep ERROR! e=", e.data);
        }
    }


    *saveWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum) {
        console.log(LogPrefix, `saveWorkTemplateStepViewingRoles Start... workTemplateId=${workTemplateId}, workTemplateStepNum=${workTemplateStepNum}`);
        this.workTemplateState = State.Pending;

        try {
            const workTemplateStepViewingRoles = this.workTemplateStepViewingRoles;
            yield this.workTemplateRepository.saveWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum, workTemplateStepViewingRoles);

            this.workTemplateState = State.Success;

            console.log(LogPrefix, "saveWorkTemplateStepViewingRoles Success!! ");
        } catch (e) {
            this.workTemplateState = State.Failed;
            console.log(LogPrefix, "saveWorkTemplateStepViewingRoles ERROR! e=", e.data);
        }
    }
}