import {Repository} from "./Repository";


export default class TemplateRepository extends Repository {
    constructor(props) {
        super();
    
        this.requestPrefix = props.serverContextPath + "/api/v1/templates";
    }

    getTemplates = (userId, param) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/userId/${userId}`, param)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
    getTemplate = (templateId) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/${templateId}`)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
    getTemplateSteps = (templateId) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/${templateId}/steps`)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }

    makeNewTemplate = (data) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix, {}, data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }

    createWorkTemplateAndWork = (data) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix+`/steps/works`, {}, data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
    
    
}