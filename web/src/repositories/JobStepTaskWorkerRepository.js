import {Repository} from "./Repository";


export default class JobStepTaskWorkerRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath + "/api/v1/jobs";
    }

    createJobStepTaskWorkers = (data) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix +`/steps/tasks/workers`, {}, data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }

    createJobStepTaskRowWorkers = (data) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix +`/steps/tasks/rows/workers`, {}, data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }

    getJobStepTaskWorkers = (jobId, jobStepNum) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix +`/${jobId}/steps/${jobStepNum}/tasks/workers`)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
}