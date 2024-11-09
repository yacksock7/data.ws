import {Repository} from "./Repository";

export default class WorkUploadUserRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath + "/api/v1/works";
    }

    getWorkUploadUsers = (workId) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/${workId}/users`)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
    createWorkUploadUsers = (workId, data) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix + `/${workId}/users`, {}, data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
}