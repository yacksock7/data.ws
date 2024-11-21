import {makeAutoObservable, toJS} from "mobx";
import {TemplateStepType} from "./WorkTemplateStore";

const LogPrefix = '[WorkStore]';

const searchingInterval = 1000;

export const State = {
    Initial: 'Initial',
    Pending: 'Pending',
    Failed: 'Failed',
    Success: 'Success',
};

export const LangLabel = {
    kr: '한국어',
    en: '영어',
    jp: '일본어',
    zh: '중국어',
    es: '스페인어',
    ru: '러시아어',
    de: '독일어',
    fr: '프랑스어'
}

const EmptyWork = {
    id : '',
    userId : '',
    templateId : '',
    name : '',
    createdDatetime : '',
    updatedDatetime : ''
}

export default class WorkStore {
    constructor(props) {
        this.workRepository = props.workRepository;

        this.workState = State.Initial;
        this.selectedWork = null;
        this.selectedWorkTemplateStep = null;
        this.newWork = Object.assign({}, EmptyWork);
        this.works = [];

        this.isSearchLoading = '';
        this.searchKeyword = undefined;
        this.searchIntervalState = null;
        this.lastSearchKeyword = null;

        makeAutoObservable(this);
    }

    init = () => {
        this.workState = State.Initial;
        this.selectedWork = null;
        this.selectedWorkTemplateStep = null;
        this.newWork = Object.assign({}, EmptyWork);
        this.works = [];

        this.isSearchLoading = '';
        this.searchKeyword = undefined;
        this.searchIntervalState = null;
        this.lastSearchKeyword = null;
    }

    changeNewWorkName = (name) => {
        this.newWork.name = name;
    }

    changeUserIdByNewWork = (userId) => {
        this.newWork.userId = userId;
    }

    changeSelectedWork = (workId, userId) => {
        let workTransfer = this.works.find(transfer => transfer.work.id === workId);

        workTransfer.workTemplateSteps = workTransfer.workTemplateSteps.map(step => {
                let disabled =
                    ((workTransfer.work.userId !== userId) && (step.type === TemplateStepType.Upload && !workTransfer.uploadUser))
                    || ((workTransfer.work.userId !== userId) && (step.type !== TemplateStepType.Upload && step.allocateCount === 0));
                return {...step, disabled, options : JSON.parse(step.options)};
            });

        this.selectedWork = workTransfer;
    }

    changeSelectedWorkStep = ( workTemplateStepNum, state ) => {
        let selectedWorkTemplateStep;
        const workTemplateSteps = toJS(this.selectedWork.workTemplateSteps);
        if (state && state === "PRE") {
            selectedWorkTemplateStep = workTemplateSteps.reverse().find(step => step.workTemplateStepNum < workTemplateStepNum && !step.disabled);
        } else if (state && state === "NEXT") {
            selectedWorkTemplateStep = workTemplateSteps.find(step => step.workTemplateStepNum > workTemplateStepNum && !step.disabled);
        }

        if (!selectedWorkTemplateStep) {
            selectedWorkTemplateStep = this.selectedWork.workTemplateSteps.find(step => step.workTemplateStepNum === workTemplateStepNum);
        }

        this.selectedWorkTemplateStep = selectedWorkTemplateStep;
    }

    searchWorks = (userId, keyword) => {
        this.isSearchLoading = true;
        this.works = [];
        this.searchKeyword = keyword;
        if ((this.searchIntervalState === undefined) || (this.searchIntervalState === null)) {
            console.log(LogPrefix, "Starting SearchInterval ...");
            this.searchIntervalState = setInterval(() => this.getWorks(userId), searchingInterval);
        } else {
            console.log(LogPrefix, "SearchInterval already started ...");
        }
    }

    *getWorks(userId) {
        console.log(LogPrefix, `getWorks Start... userId=${userId}, keyword=${this.searchKeyword}`);
        this.workState = State.Pending;

        if (this.searchKeyword === this.lastSearchKeyword && this.searchIntervalState) {

            console.log(LogPrefix, "Clear SearchInterval ...");
            clearInterval(this.searchIntervalState);
            this.lastSearchKeyword = null;
            this.searchIntervalState = undefined;
            this.isSearchLoading = false;

        } else {
            try {
                this.lastSearchKeyword = this.searchKeyword;
                const params = { keyword : this.lastSearchKeyword }
                const works = yield this.workRepository.getWorks(userId, params);

                this.workState = State.Success;
                this.works = works;
                this.selectedWork = null;

                console.log(LogPrefix, "getWorks Success!! works=", works);
            } catch (e) {
                this.templateState = State.Failed;
                console.log(LogPrefix, "getWorks ERROR! e=", e.data);
            }
        }
    }
}