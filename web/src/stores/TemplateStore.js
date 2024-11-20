import {makeAutoObservable} from "mobx";

import {ReactComponent as SmallUploadIcon} from "../common/images/SmallUploadIcon.svg";
import {ReactComponent as SmallRecIcon} from "../common/images/SmallRecIcon.svg";
import {ReactComponent as SmallMachineIcon} from "../common/images/SmallMachineIcon.svg";
import {ReactComponent as SmallLabelingIcon} from "../common/images/SmallLabelingIcon.svg";
import {ReactComponent as SmallCorrectionIcon} from "../common/images/SmallCorrectionIcon.svg";
import {ReactComponent as SmallSwapIcon} from "../common/images/SmallSwapIcon.svg";
import {ReactComponent as SmallInspectionIcon} from "../common/images/SmallInspectionIcon.svg";
import {ReactComponent as SmallDownloadIcon} from "../common/images/SmallDownloadIcon.svg";

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

export const TemplateStepTypeLabel = {
    Upload:'업로드',
    Recording:'녹음',
    Machine:'기계',
    Labeling : '라벨링',
    Editing : '교정',
    Refine:'정제',
    Inspection : '검수',
    Export : '추출',
}

export const ResultType = {
    Text : 'Text',
    Audio : 'Audio',
    Tag : 'Tag'
}

export const FileUploadType={
    Excel : 'Excel',
    Audio : 'Audio'
}

export const InspectionType={
    Record : 'Record',
    Label : 'Label',
    Inspection : 'Inspection'
}
export const RecordType={
    Internal : 'Internal',
    External : 'External'
}

export const LabelType={
    Label1 : 'Label1',
    Label2 : 'Label2'
}

export const MachineType={
    STT : 'STT',
    MachineTranslation : 'Translation',
    GrammarCorrector : 'GrammarCorrector'
}

export const TemplateStepTypeButton = {
    Upload : <SmallUploadIcon/>,
    Recording : <SmallRecIcon/>,
    Machine : <SmallMachineIcon/>,
    Labeling : <SmallLabelingIcon/>,
    Editing : <SmallCorrectionIcon/>,
    Refine : <SmallSwapIcon/>,
    Inspection : <SmallInspectionIcon/>,
    Export : <SmallDownloadIcon/>,
}

export const TemplateStepColor = {
    Upload : '#056cf2',
    Machine : '#f2b705',
    Editing : '#140cf2',
    Inspection : '#f25e3d',
    Export : '#5d00c7'
}



export const HistoryControlType = {
    Previous : 'Previous',
    Next : 'Next'
}


const LogPrefix = '[TemplateStore]';

export const LocalStorageTokenKey = '_DOBEDUB_AUTHENTICATION_TOKEN_';

export const TemplateType = {
    All : "All",
    System : "System",
    Private : "Private"
}

const EmptyTemplate = {
    id : 0,
    userId : 0,
    type : 'Private',
    name : '',
    createdDatetime : '',
    updatedDatetime : ''
}


export default class TemplateStore {
    constructor(props) {
        this.templateRepository = props.templateRepository;

        this.templates = [];
        this.templateTableTransfers = [];
        this.template = Object.assign({}, EmptyTemplate);
        this.newTemplate = Object.assign({}, EmptyTemplate);
        this.templateSteps = [];
        this.templateStepHistories = [];
        this.templateStepHistoryIndex = 0;
        this.templateDeleteIndex = 0;
        this.templateErrorArr = [];
        this.templateState = State.Initial;

        makeAutoObservable(this);
    }

    initCreateTemplate = () => {
        this.newTemplate = Object.assign({}, EmptyTemplate);
        this.templateSteps = [];

        this.templateStepHistories = [];
        this.templateStepHistoryIndex = 0;

        this.templateErrorArr = [];
    }

    initTemplate = () =>{
        this.template = Object.assign({}, EmptyTemplate);
    }

    changeNewTemplateName = (name) => {
        this.newTemplate.name = name;
    }

    changeTemplateSteps = (arr) => {
        this.templateSteps = arr;
        //this.checkTemplateOrder();
        this.checkTemplateIO();
        this.addTemplateStepHistory();
    }

    addStepByTemplate = (step) => {
        console.log("step : ", step);
        this.templateSteps.splice(this.templateSteps.length-1, 0, step);
        this.templateSteps = [...this.templateSteps]; // push로 observer가 작동을 안해...

        this.checkTemplateIO();
        this.addTemplateStepHistory();
    }

    initTemplateErrorArr = () => {
        this.templateErrorArr.splice(0, this.templateErrorArr.length);
    }

    addTemplateErrorArr = (index) => {
        this.templateErrorArr.push(index);
    }

    delTemplateErrorArr = (index) => {
        this.templateErrorArr.splice(index,1);
    }

    checkTemplateIO = () => {
        this.initTemplateErrorArr();
        const arr = this.templateSteps;

        for (let i=0; i<arr.length-1; i++) {
            try {
                if (arr[i].resultType !== arr[i+1].inputType){
                this.addTemplateErrorArr(i);
                this.addTemplateErrorArr(i+1);
                }
            } catch(e) {
                this.addTemplateErrorArr(i);
                this.addTemplateErrorArr(i+1);
            }
        }
    }

    checkTemplateOrder = () =>
    {
        this.initTemplateErrorArr();
        const arr = this.templateSteps;
        //console.log(arr);
        const translateArr = arr.map((_,index) =>index).filter(index=>arr[index].type === TemplateStepType.Machine);
        const correctionArr = arr.map((_,index) =>index).filter(index=>arr[index].type === TemplateStepType.Editing);
        const inspectionArr = arr.map((_,index) =>index).filter(index=>arr[index].type === TemplateStepType.Inspection);

        const correctionTempArr = correctionArr.slice(0);
        const translateTempArr = translateArr.slice(0);
        //console.log(correctionArr);
        //console.log(inspectionArr);
        //console.log(translateArr);
        //교정 확인용
        //console.log("교정");
        for(let i = 0 ; i< correctionArr.length;i++)
        {
            if(translateArr.length === 0)
            {
                console.log("번역 단계 없이 교정 단계만 존재합니다.");
                break;
            }
            else
            {
                if(translateTempArr.findIndex(item=> item < correctionArr[i])>=0)
                {
                    translateTempArr.splice(translateTempArr.findIndex(item=> item < correctionArr[i]),1);

                    for(let j =0 ; j<translateTempArr.length; j++)
                    {
                        if(translateTempArr.findIndex(item=> item < correctionArr[i])>=0)
                        {
                            //console.log(correctionArr[i]);
                            translateTempArr.splice(translateTempArr.findIndex(item=> item < correctionArr[i]),1);
                            --j;
                            //console.log(translateTempArr);
                        }
                        else
                            break;
                    }
                }
                else
                {
                    this.addTemplateErrorArr(correctionArr[i]);
                    console.log("교정 단계 전 번역 단계가 없습니다. num : "+ correctionArr[i]);
                }
            }
        }
        //검수 확인용
        //console.log("검수확인용");
        for(let i =0;i<inspectionArr.length;i++)
        {
            if(correctionArr.length === 0)
            {
                console.log("교정 단계 없이 검수 단계만 존재합니다.");
                break;
            }
            else
            {
                let errCheckIndex = correctionTempArr.findIndex(item=> item < inspectionArr[i]);
                if(errCheckIndex>=0)
                {
                    if(this.templateErrorArr.find(item => item === correctionTempArr[errCheckIndex]))
                    {
                        console.log("검수 단계 전 오류가 있는 교정 단계가 있습니다. num : "+ i);
                        this.addTemplateErrorArr(inspectionArr[i]);
                    }
                    correctionTempArr.splice(correctionTempArr.findIndex(item=> item < inspectionArr[i]),1);
                    //console.log(correctionTempArr);

                    for(let j =0 ; j<correctionTempArr.length; j++)
                    {
                        if(correctionTempArr.findIndex(item=> item < inspectionArr[i])>=0)
                        {
                            //console.log(inspectionArr[i]);
                            correctionTempArr.splice(correctionTempArr.findIndex(item=> item < inspectionArr[i]),1);
                            --j;
                            //console.log(inspectionArr);
                        }
                        else
                            break;
                    }
                }
                else
                {
                    this.addTemplateErrorArr(inspectionArr[i]);
                    console.log("검수 단계 전 교정 단계가 없습니다. num : "+ i);
                }
            }
        }
    }
    deleteTemplateStep = (index) => {
        const errIndex = this.templateErrorArr.findIndex(item => item === index)
        if (errIndex >= 0) {
            this.delTemplateErrorArr(errIndex);
        }
        this.templateSteps.splice(index,1);
        this.addTemplateStepHistory();
    }

    changeMachineTranslationEngine = (value, index) => {
        const mtStep = this.templateSteps[index];

        if(mtStep.type !== TemplateStepType.Machine ) {
            console.log("[Failed] Type error : "+mtStep.type)
        } else {
            mtStep.options = {
                machineType : mtStep.options.machineType,
                engine : value
            };

            this.checkTemplateIO();
            this.addTemplateStepHistory();
        }
    }

    changeMachineTranslationSourceLang = (value, index) => {
        const mtStep = this.templateSteps[index];

        if(mtStep.type !== TemplateStepType.Machine )
        {
            console.log("[Failed] Type error : "+mtStep.type)
        }
        else
        {
            mtStep.options = mtStep.options = {
                machineType : mtStep.options.machineType,
                engine : mtStep.options.engine,
                sourceLang : value
            };
            this.checkTemplateIO();
            this.addTemplateStepHistory();
        }
    }
    changeMachineTranslationSourceTargetLang = (sourceLang, targetLang, index) => {
        const mtStep = this.templateSteps[index];

        if(mtStep.type !== TemplateStepType.Machine )
        {
            console.log("[Failed] Type error : "+mtStep.type)
        }
        else
        {
            mtStep.options = {
                ...mtStep.options,
                sourceLang : sourceLang,
                targetLang : targetLang
            };
            this.checkTemplateIO();
            this.addTemplateStepHistory();
        }
    }

     changeMachineType = (value, index) => {
        const mtStep = this.templateSteps[index];

        if (mtStep.type !== TemplateStepType.Machine ) {
            console.log("[Failed] Type error : "+mtStep.type)
        } else {
            mtStep.options = {machineType : value};

            if ( value === MachineType.STT ) {
                mtStep.inputType=ResultType.Audio;
                mtStep.resultType=ResultType.Text;

            } else if( value === MachineType.MachineTranslation ){
                mtStep.inputType=ResultType.Text;
                mtStep.resultType=ResultType.Text;

            } else if( value === MachineType.GrammarCorrector ){
                mtStep.inputType=ResultType.Text;
                mtStep.resultType=ResultType.Text;
            }

            this.checkTemplateIO();
            this.addTemplateStepHistory();
        }
    }

    changeInspectionType = (value, index) => {
        const mtStep = this.templateSteps[index];

        if(mtStep.type !== TemplateStepType.Inspection )
        {
            console.log("[Failed] Type error : "+mtStep.type)
        }
        else
        {
            mtStep.options = {
                ...mtStep.options,
                inspectionType : value
            };

            if(value === InspectionType.Inspection){
                mtStep.inputType=ResultType.Text;
                mtStep.resultType=ResultType.Text;
            }
            else if(value === InspectionType.Record){
                mtStep.inputType=ResultType.Audio;
                mtStep.resultType=ResultType.Audio;
            }
            else if(value === InspectionType.Label){
                mtStep.inputType=ResultType.Tag;
                mtStep.resultType=ResultType.Tag;
            }
            this.checkTemplateIO();
            this.addTemplateStepHistory();
        }
    }

    changeRecordType = (value, index) => {
        const mtStep = this.templateSteps[index];

        if(mtStep.type !== TemplateStepType.Recording )
        {
            console.log("[Failed] Type error : "+mtStep.type)
        }
        else
        {
            mtStep.options = {
                ...mtStep.options,
                recordType : value
            };
            mtStep.inputType=ResultType.Text;
            mtStep.resultType=ResultType.Audio;
            this.checkTemplateIO();
            this.addTemplateStepHistory();
        }
    }

    changeTagType = (value, index) => {
        const mtStep = this.templateSteps[index];

        if(mtStep.type !== TemplateStepType.Labeling)
        {
            console.log("[Failed] Type error : "+mtStep.type)
        }
        else
        {
            mtStep.options = {
                ...mtStep.options,
                tagType : value
            };
            mtStep.inputType=ResultType.Text;
            mtStep.resultType=ResultType.Tag;
            this.checkTemplateIO();
            this.addTemplateStepHistory();
        }
    }


    changeUploadType = (value, index) => {
        const mtStep = this.templateSteps[index];

        if(mtStep.type !== TemplateStepType.Upload )
        {
            console.log("[Failed] Type error : "+mtStep.type)
        }
        else
        {
            mtStep.options = {
                ...mtStep.options,
                fileUploadType : value
            };
            if(value === FileUploadType.Excel)
            {
                mtStep.resultType = ResultType.Text;
                mtStep.inputType = ResultType.Text;
            }
            else if(value ===FileUploadType.Audio)
            {
                mtStep.resultType = ResultType.Audio;
                mtStep.inputType = ResultType.Audio;
            }
            this.checkTemplateIO();
            this.addTemplateStepHistory();
        }
    }

    changeMachineTranslationTargetLang = (value) => {
        const mtStep = this.templateSteps.find(step => step.type === TemplateStepType.Machine);
        if (mtStep) {
            mtStep.options = mtStep.options = {
                ...mtStep.options,
                targetLang : value
            };
            this.checkTemplateIO();
            this.addTemplateStepHistory();
        }
    }

    // changeMachineTranslationTargetLang = (value, index, addHistory) => {
    //     const mtStep = this.templateSteps[index];
    //
    //     if(mtStep.type !== TemplateStepType.Machine )
    //     {
    //         console.log("[Failed] Type error : "+mtStep.type)
    //     }
    //     else
    //     {
    //         mtStep.options = {
    //             ...mtStep.options,
    //             targetLang : value
    //         };
    //         this.checkTemplateIO();
    //         if(addHistory)
    //             this.addTemplateStepHistory();
    //     }
    // }

    addTemplateStepHistory = () => {
        const templateSteps = JSON.parse(JSON.stringify(this.templateSteps));
        this.templateStepHistories.push(templateSteps);
        this.templateStepHistoryIndex += 1;
    }

    changeTemplateStepFromHistory = (type) => {
        if (type === HistoryControlType.Previous) {
            this.templateStepHistoryIndex -= 1;
            this.templateSteps = JSON.parse(JSON.stringify(this.templateStepHistories[this.templateStepHistoryIndex-1]));
        } else if (type === HistoryControlType.Next) {
            this.templateStepHistoryIndex += 1;
            this.templateSteps = JSON.parse(JSON.stringify(this.templateStepHistories[this.templateStepHistoryIndex-1]));
        }
    }

    initTemplateStepHistoryIndex = () =>{
        this.templateStepHistoryIndex = 0;
    }

    convertTabIndexToTemplateType = (tabIndex) => {
        let templateType;
        if (tabIndex === 0) {
           templateType = TemplateType.All;
        } else if (tabIndex === 1) {
            templateType = TemplateType.System;
        } else if (tabIndex === 2) {
            templateType = TemplateType.Private;
        }
        return templateType;
    }

    initTemplateSteps = () => {
        this.templateSteps = [];
    }
    // *getTemplateSteps(templateId) {
    //     console.log(LogPrefix, `getTemplateSteps Start... templateId=${templateId}`);
    //     this.templateState = State.Pending;
    //
    //     try {
    //         const templateSteps = yield this.templateRepository.getTemplateSteps(templateId);
    //         this.templateState = State.Success;
    //         this.templateSteps = templateSteps.map(step => {
    //             const options = step.options ? JSON.parse(step.options) : null;
    //             return {...step, options}
    //         });
    //
    //         this.addTemplateStepHistory();
    //         console.log(LogPrefix, "getTemplateSteps Success!! templateSteps=", templateSteps);
    //
    //     } catch (e) {
    //         this.templateState = State.Failed;
    //         console.log(LogPrefix, "getTemplateSteps ERROR! e=", e.data);
    //     }
    // }


    *makeNewPrivateTemplate(userId) {
        console.log(LogPrefix, `makeNewTemplate Start...`);
        this.templateState = State.Pending;

        try {
            this.newTemplate.userId = userId;
            const templateSteps =
                this.templateSteps.map(step => {
                    const options = step.options ? JSON.stringify(step.options) : null;
                    return {...step, options};
                });

            const data = {
                template : this.newTemplate,
                templateSteps : templateSteps
            };

            const response = yield this.templateRepository.makeNewTemplate(data);

            this.template = response.template;
            this.templateSteps = response.templateSteps.map(step => {
                return {...step, options : JSON.parse(step.options)}
            });
            this.templateState = State.Success;

            console.log(LogPrefix, "makeNewTemplate Success!!");

        } catch (e) {
            this.templateState = State.Failed;
            console.log(LogPrefix, "makeNewTemplate ERROR! e=", e.data);
        }
    }

    *createWorkTemplateAndWork(userId, newWork, navigate) {
        console.log(LogPrefix, `createWorkTemplateAndWork Start... userId=${userId}, newWork=${newWork}`);
        this.templateState = State.Pending;

        try {
            this.template.userId = userId;
            newWork.userId = userId;

            const templateSteps =
                this.templateSteps.map(step => {
                    const options = step.options ? JSON.stringify(step.options) : null;
                    return {...step, options};
                });
            const data = {
                template : this.template,
                templateSteps : templateSteps,
                work : newWork
            };

            yield this.templateRepository.createWorkTemplateAndWork(data);

            this.templateState = State.Success;
            console.log(LogPrefix, "createWorkTemplateAndWork Success!!");
        } catch (e) {
            this.templateState = State.Failed;
            console.log(LogPrefix, "createWorkTemplateAndWork ERROR! e=", e.data);
        }
    }

    *getTemplatesForTable(userId) {
        console.log(LogPrefix, `getTemplatesByType Start... userId=${userId}`);
        this.templateState = State.Pending;

        try {
            const templateTableTransfers = yield this.templateRepository.getTemplatesForTable(userId);

            this.templateTableTransfers = templateTableTransfers;
            this.templateState = State.Success;
            console.log(LogPrefix, "getTemplatesByType Success!! templateTableTransfers=", templateTableTransfers);

        } catch (e) {
            this.templateState = State.Failed;
            console.log(LogPrefix, "getTemplatesByType ERROR! e=", e.data);
        }
    }

    *getTemplatesByType(userId, templateType) {
        console.log(LogPrefix, `getTemplatesByType Start... userId=${userId}, templateType=${templateType}`);
        this.templateState = State.Pending;

        try {
            const params = { templateType : templateType }
            const templates = yield this.templateRepository.getTemplatesByType(userId, params);
            this.templates = templates;

            this.templateState = State.Success;
            console.log(LogPrefix, "getTemplatesByType Success!! templates=", this.templates);

        } catch (e) {
            this.templateState = State.Failed;
            console.log(LogPrefix, "getTemplatesByType ERROR! e=", e.data);
        }
    }

    *getTemplate(templateId) {
        console.log(LogPrefix, `getTemplate Start... templateId=${templateId}`);
        this.templateState = State.Pending;

        try {
            const template = yield this.templateRepository.getTemplate(templateId);
            this.template = template;
            this.templateSteps = template.steps.map(step => {
                const options = step.options ? JSON.parse(step.options) : null;
                return {...step, options}
            });
            this.addTemplateStepHistory();
            console.log("template.steps: ", template.steps);

            this.templateState = State.Success;
            console.log(LogPrefix, "getTemplate Success!! template=", template);
        } catch (e) {
            this.templateState = State.Failed;
            console.log(LogPrefix, "getTemplate ERROR! e=", e.data);
        }
    }

    *makeNewTemplate(userId, callback) {
        console.log(LogPrefix, `makeNewTemplate Start...`);
        this.templateState = State.Pending;

        try {
            this.newTemplate.userId = userId;
            const templateSteps =
                this.templateSteps.map(step => {
                    const options = step.options ? JSON.stringify(step.options) : null;
                    return {...step, options};
                });

            const data = {
                template : this.newTemplate,
                templateSteps : templateSteps
            };

            yield this.templateRepository.makeNewTemplate(data);
            this.templateState = State.Success;

            console.log(LogPrefix, "makeNewTemplate Success!!");
            callback();
        } catch (e) {
            this.templateState = State.Failed;
            console.log(LogPrefix, "makeNewTemplate ERROR! e=", e.data);
        }
    }

    *modifyTemplateSteps() {
        console.log(LogPrefix, `modifyTemplateSteps Start...`);
        this.templateState = State.Pending;

        try {
            const templateSteps =
                this.templateSteps.map(step => {
                    const options = step.options ? JSON.stringify(step.options) : null;
                    return {...step, options};
                });

            const templateId = this.template.id;
            const data = templateSteps;
            yield this.templateRepository.modifyTemplateSteps(templateId, data);
            this.templateState = State.Success;

            console.log(LogPrefix, "modifyTemplateSteps Success!!");
        } catch (e) {
            this.templateState = State.Failed;
            console.log(LogPrefix, "modifyTemplateSteps ERROR! e=", e.data);
        }
    }

    *removeTemplate(templateId) {
        console.log(LogPrefix, `removeTemplate Start...`);
        this.templateState = State.Pending;

        try {
            yield this.templateRepository.removeTemplate(templateId);
            this.templateState = State.Success;

            console.log(LogPrefix, "removeTemplate Success!!");
        } catch (e) {
            this.templateState = State.Failed;
            console.log(LogPrefix, "removeTemplate ERROR! e=", e.data);
        }
    }
}