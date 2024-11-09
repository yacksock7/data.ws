import {Repository} from "./Repository";

export default class JobStepTaskRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath + "/api/v1/jobs";
        this.requestJobStepTaskTextPrefix = props.serverContextPath + "/api/v1/jobs/steps/tasks/workers";
    }

    getJobStepTaskTransfers = (jobId, jobStepNum, param) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix +`/${jobId}/steps/${jobStepNum}/tasks`, param)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
    getJobStepTaskTransfersByArray = (jobId, jobStepNum, param) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix +`/${jobId}/steps/${jobStepNum}/tasks/taskArray`, param)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }

    getJobStepTasksCount = (jobId, jobStepNum, param) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix +`/${jobId}/steps/${jobStepNum}/tasks/count`, param)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }



    createJobStepTaskText = (data) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestJobStepTaskTextPrefix +`/text`, {}, data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    processNextJobStepTask = (data,jobStepTaskTransfer) => {
        const param = {
            status : jobStepTaskTransfer.status
        }
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix +`/steps/tasks/results`, param, data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

}