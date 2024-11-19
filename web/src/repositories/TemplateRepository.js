import {Repository} from "./Repository";


export default class TemplateRepository extends Repository {
    constructor(props) {
        super();
    
        this.requestPrefix = props.serverContextPath + "/api/v1/templates";
    }

    getTemplatesForTable = (userId) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/userId/${userId}/table`)
                .then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        });
    }
    getTemplatesByType = (userId, params) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/userId/${userId}`, params)
                .then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        });
    }
    getTemplate = (templateId) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/${templateId}`)
                .then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        });
    }
    createWorkTemplateAndWork = (data) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix+`/steps/works`, {}, data)
                .then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        });
    }

    getTemplateSteps = (templateId) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/${templateId}/steps`)
                .then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        });
    }

    makeNewTemplate = (data) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix, {}, data)
                .then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        });
    }
    modifyTemplateSteps = (templateId, data) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('put', this.requestPrefix+`/${templateId}/steps`, {}, data)
                .then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        });
    }

    removeTemplate = (templateId) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('delete', this.requestPrefix + `/${templateId}`)
                .then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        });
    }

    
}