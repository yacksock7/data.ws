import {Repository} from "./Repository";

export default class JobRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath + "/api/v1/jobs";
    }

    createUploadJob = (param, contentsType) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix, param, {}, contentsType)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }

    changeUploadJobName = (data) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('put', this.requestPrefix, {}, data )
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
    deleteUploadJob = (jobId) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('delete', this.requestPrefix+`/${jobId}`)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
}