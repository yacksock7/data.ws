import {action, flow, makeAutoObservable, observable, toJS} from "mobx";
import axios from "axios";

const LogPrefix = "[WorkUploadUserStore]"

export const State = {
    Initial: 'Initial',
    Pending: 'Pending',
    Failed: 'Failed',
    Success: 'Success',
};


export const AssignType = {
    User: 'User',
    Group: 'Group',
};

export default class WorkUploadUserStore {
    constructor(props) {
        this.workUploadUserRepository = props.workUploadUserRepository;

        this.workUploadUserState = State.Initial;
        this.selectedWorkUploadUsers = [];

        makeAutoObservable(this);
    }

    init = () => {
        this.selectedWorkUploadUsers = [];
    }

    addSelectedWorkUploadUser = (user) => {
        const selectedWorkUploadUser = this.selectedWorkUploadUsers.find( e => e.id === user.id);
        if (!selectedWorkUploadUser) {
            this.selectedWorkUploadUsers.push(user);
        }
        this.selectedWorkUploadUsers = toJS(this.selectedWorkUploadUsers);
    }

    removeSelectedWorkUploadUser = (userId) => {
        const index = this.selectedWorkUploadUsers.findIndex( user => user.id === userId);
        if (index > -1) {
            this.selectedWorkUploadUsers.splice(index, 1);
            this.selectedWorkUploadUsers = toJS(this.selectedWorkUploadUsers);
        }
    }

    *getWorkUploadUsers(workId) {
        // console.log(LogPrefix, `getWorkUploadUsers Start... workId=${workId}`);
        this.workUploadUserState = State.Pending;

        try {
            const workUploadUsers = yield this.workUploadUserRepository.getWorkUploadUsers(workId);

            this.workUploadUserState = State.Success;
            this.selectedWorkUploadUsers = workUploadUsers.map(workUploadUser => workUploadUser.user);

            // console.log(LogPrefix, "getWorkUploadUsers Success!! this.selectedWorkUploadUsers=", this.selectedWorkUploadUsers );
            // console.log(LogPrefix, "getWorkUploadUsers Success!! workUploadUsers=", workUploadUsers);
        } catch (e) {
            this.workUploadUserState = State.Failed;
            // console.log(LogPrefix, "getWorkUploadUsers ERROR! e=", e.data);
        }
    }

    *createWorkUploadUsers(workId) {
        // console.log(LogPrefix, `createWorkUploadUsers Start... workId=${workId}`);
        this.workUploadUserState = State.Pending;

        try {

            const workUploadUsers = this.selectedWorkUploadUsers.map( (e, i)=> {
                return {
                    workId : workId,
                    userId : e.id,
                    viewingOrder : i+1,
                    createdDatetime : null,
                    updatedDatetime : null
                }
            });
            const savedWorkUploadUsers = yield this.workUploadUserRepository.createWorkUploadUsers(workId, workUploadUsers);

            this.workUploadUserState = State.Success;
            this.selectedWorkUploadUsers = savedWorkUploadUsers.map(workUploadUser => workUploadUser.user);

            // console.log(LogPrefix, "createWorkUploadUsers Success!! this.selectedWorkUploadUsers=", this.selectedWorkUploadUsers );
        } catch (e) {
            this.workUploadUserState = State.Failed;
            // console.log(LogPrefix, "createWorkUploadUsers ERROR! e=", e.data);
        }
    }
}