import {Repository} from "./Repository";

export default class JobStepRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath + "/api/v1/jobs";
    }

    getJobStepTransfers = (workTemplateId, workTemplateStepNum, param) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix +`/steps/workTemplateId/${workTemplateId}/workTemplateStepNum/${workTemplateStepNum}`, param)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }

    getJobStepTransfersForUpload = (workTemplateId, workTemplateStepNum, param) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix +`/steps/type/UPLOAD/workTemplateId/${workTemplateId}/workTemplateStepNum/${workTemplateStepNum}`, param)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
}