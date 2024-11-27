import {action, flow, makeAutoObservable, observable} from "mobx";
import axios from "axios";

const LogPrefix = '[JobStore]';

export const State = {
    Initial: 'Initial',
    Pending: 'Pending',
    Failed: 'Failed',
    Success: 'Success',
};

export default class JobStore {
    constructor(props) {
        this.jobRepository = props.jobRepository;

        this.jobState = State.Initial;

        makeAutoObservable(this);
    }

    *createUploadJob(userId, workId, workTemplateStep, files, inputType) {
        console.log(`createUploadJob Start... userId=${userId}, workId=${workId}, workTemplateStep=${workTemplateStep}, files=${files}, inputType=${inputType}`);
        this.jobState = State.Pending;

        try {
            const param = {
                userId: userId,
                workId: workId,
                workTemplateId: workTemplateStep.workTemplateId,
                workTemplateStepNum: workTemplateStep.workTemplateStepNum,
                files: files
            }


            const formData = new FormData();

            formData.append("inputType", inputType);
            formData.append("userId", userId);
            formData.append("workId", workId);
            formData.append("workTemplateId", workTemplateStep.workTemplateId);
            formData.append("workTemplateStepNum", workTemplateStep.workTemplateStepNum);
            files.forEach( e => {formData.append("files", e)});
            
            yield axios.post('/api/v1/jobs/steps/type/UPLOAD', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
                'Authorization': 'JWT ' + sessionStorage.getItem('token')
            });

        } catch (e) {
            console.log("e : ", e);
        }
    }

    *changeUploadJobName(jobId, jobName, callback){
        try {
            const data = {
                id: jobId,
                name : jobName
            }
            const response = yield this.jobRepository.changeUploadJobName(data);
            if(response) callback();
        }
        catch (e)
        {
            console.log(e);
        }
    }
    *deleteUploadJob(jobId){
        try {
            const response = yield this.jobRepository.deleteUploadJob(jobId);
        }
        catch (e)
        {
            console.log(e);
        }
    }
}