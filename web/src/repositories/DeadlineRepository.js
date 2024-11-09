import {Repository} from "./Repository";


export default class DeadlineRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath + "/api/v1/workTemplates";
    }


    //template_id로 templates step의 type, start day,deadline 가져오기
    getWorkTemplateStepDeadlines= (workTemplateId,workTemplateStepNum, params) => {
        return new Promise((resolve, reject) => {
            this.getRequestPromise('get', this.requestPrefix + `/${workTemplateId}/templateSteps/${workTemplateStepNum}/deadlines`, params)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
    makeNewTemplateStepDeadline = (data) =>
    {
        return new Promise((resolve,reject)=>{
            this.getRequestPromise('post',this.requestPrefix+'/templateStepDeadlines',{},data)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {

                    reject(error);
                });
        });
    }
}