import {Repository} from "./Repository";

export default class JobRejectRepository extends Repository {
    constructor(props) {
        super();
        this.requestPrefix = props.serverContextPath + "/api/v1/jobs";
        this.requestWorkPrefix = props.serverContextPath + "/api/v1/works";
    }


    getRejectPoint = (workTemplateId) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestWorkPrefix + `/templates/${workTemplateId}/steps/rejectPoint`)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    saveJobReject = (data, param) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('put', this.requestPrefix + `/steps/tasks/reject`, param, data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}