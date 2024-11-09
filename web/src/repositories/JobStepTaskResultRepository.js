import {Repository} from "./Repository";

export default class JobStepTaskResultRepository extends Repository {
    constructor(props) {
        super();
        this.requestPrefix = props.serverContextPath + "/api/v1/jobs";
        this.requestJobStepTaskTextPrefix = props.serverContextPath + "/api/v1/jobs/steps/tasks/workers";
    }

    getPreJobResults = (jobId, jobStepNum, jobStepTaskNum) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix +`/${jobId}/steps/${jobStepNum}/tasks/${jobStepTaskNum}/pre-results`)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getJobResults = (jobId, jobStepNum, jobStepTaskNum) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix +`/${jobId}/steps/${jobStepNum}/tasks/${jobStepTaskNum}/results`)
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
            this.getRequestPromise('post', this.requestPrefix +`/steps/tasks/workers/text`, {}, data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    inspectAllJobStepTask = (jobId, jobStepNum, userId) => {
        const param = {
            userId : userId
        }
        console.log('param is =',param);
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix +`/${jobId}/steps/${jobStepNum}/tasks/workers/results`,param)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    requestDownload = (jobId,jobList, jobStepTaskList,userId,workTemplateId,maxStepNum) => {
        const data = {
            jobId: jobId,
            jobList : jobList,
            jobStepTaskList : jobStepTaskList,
            userId : userId,
            workTemplateId : workTemplateId,
            maxStepNum : maxStepNum
        }

        console.log('data is =',data);
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix +`/steps/tasks/workers/results/download`, {},data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}