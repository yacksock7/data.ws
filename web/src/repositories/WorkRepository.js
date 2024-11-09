import {Repository} from "./Repository";


export default class WorkRepository extends Repository {
    constructor(props) {
        super();
    
        this.requestPrefix = props.serverContextPath + "/api/v1/works";
    }


    getWorks = (userId, params) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/userId/${userId}`, params)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
    
}