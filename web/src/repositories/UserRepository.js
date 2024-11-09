import {Repository} from "./Repository";

export default class UserRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath + "/api/v1/users";
        this.requestGroupPrefix = props.serverContextPath + "/api/v1/groups";
    }

    getUsers = (params) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix, params)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
    getGroups = (params) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestGroupPrefix, params)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
    getUserProfile = (userId) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/profiles/${userId}`)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }


}