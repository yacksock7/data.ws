import {Repository} from "./Repository";

export default class AuthRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath + "/api/v1/authentications";
        this.requesUsersPrefix = props.serverContextPath + "/api/v1/users";
    }

    signIn = (param) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix + '/signin', '', param)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    this.removeAuthTokenFromStorage();

                    reject(error);
                });
        });
    }


    signCheck = () => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + '/signcheck')
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    this.removeAuthTokenFromStorage()

                    reject(error);
                });
        });
    }

    signOut = () => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requestPrefix + '/signout')
                .then(data => {
                    this.removeAuthTokenFromStorage();

                    resolve(data);
                })
                .catch(error => {
                    this.removeAuthTokenFromStorage();

                    reject(error);
                });
        });
    }
    signUp = (data) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', this.requesUsersPrefix  , {},data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    resendSignUpEmail = (userId) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', `${this.requesUsersPrefix}/${userId}/signup-email`)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    resendPasswordEmail = (userId) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', `${this.requesUsersPrefix}/${userId}/password-email`)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    checkNicknameDuplicate = (nickname) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get',`${this.requesUsersPrefix}/nickname/${nickname}`)
                .then(data => {
                    resolve(data);
                })
                .catch(error =>{
                    console.log(error);
                    reject(error);
                });
        });
    }

    getUserByEmail = (email) => {
        return new Promise((resolve,reject)=>{
            this.getRequestPromise('get',`${this.requesUsersPrefix}/email/${email}`)
                .then(data=>{
                    resolve(data);
                })
                .catch(error=>{
                   console.log(error);
                   reject(error);
                });
        })
    }

    modifyPassword = (token, params) => {
        return new Promise((resolve,reject)=>{
            this.getRequestPromise('put',`${this.requesUsersPrefix}/token/${token}/password`, params)
                .then(data=>{
                    resolve(data);
                })
                .catch(error=>{
                    reject(error);
                });
        })
    }

    createUserProfile = (data) => {
        return new Promise((resolve,reject)=>{
            this.getRequestPromise('get',`${this.requesUsersPrefix}/profiles`, {},data)
                .then(data=>{
                    resolve(data);
                })
                .catch(error=>{
                   console.log(error);
                    console.log('[CreateUserProfile Failed]');
                   reject(error);
                });
        })
    }

    changeUserProfile = (param) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('post', `${this.requesUsersPrefix}/modify`,param)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }


}