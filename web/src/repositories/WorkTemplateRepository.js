import {Repository} from "./Repository";


export default class WorkTemplateRepository extends Repository {
    constructor(props) {
        super();
    
        this.requestPrefix = props.serverContextPath + "/api/v1/works";
    }


    // getWorks = (userId) => {
    //     return new Promise((resolve, reject) => {
    //         this.getRequestPromise('get', this.requestPrefix + `/userId/${userId}`)
    //             .then(data => {
    //                 resolve(data);
    //             })
    //             .catch(error => {
    //                 this.removeAuthTokenFromStorage()
    //
    //                 reject(error);
    //             });
    //     });
    // }

    getWorkTemplateStepByRejectPoint = (workTemplateId) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/templates/${workTemplateId}/steps/rejectPoint`)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    this.removeAuthTokenFromStorage()

                    reject(error);
                });
        });
    }
    getPreWorkTemplateSteps = (workTemplateId, workTemplateStepNum) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/templates/${workTemplateId}/steps/${workTemplateStepNum}/pre`)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    this.removeAuthTokenFromStorage()

                    reject(error);
                });
        });
    }

    getWorkTemplateStepViewingRoles = (workTemplateId, workTemplateStepNum) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/templates/${workTemplateId}/steps/${workTemplateStepNum}/viewing-role`)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    this.removeAuthTokenFromStorage()

                    reject(error);
                });
        });
    }

    saveWorkTemplateStepViewingRoles = (workTemplateId, workTemplateStepNum, workTemplateStepViewingRoles) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix + `/templates/${workTemplateId}/steps/${workTemplateStepNum}/viewing-role`, {}, workTemplateStepViewingRoles)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    this.removeAuthTokenFromStorage()

                    reject(error);
                });
        });
    }

}