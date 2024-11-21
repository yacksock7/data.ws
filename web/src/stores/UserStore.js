import {action, flow, makeAutoObservable, observable} from "mobx";
import axios from "axios";

const LogPrefix = '[UserStore]';

const searchingInterval = 1000;

export const State = {
    Authenticated: 'Authenticated',
    NotAuthenticated: 'NotAuthenticated',
    Pending: 'Pending',
    Failed: 'Failed',
};

const EmptyUserProfile = {
    id: '',
    name: '',
    gender :'',
    birth : '',
    organization : '',
};

export default class UserStore {
    constructor(props) {
        this.userRepository = props.userRepository;
        this.users = [];

        this.searchedUsers = [];
        this.searchedGroups = [];

        this.userProfile = Object.assign({},EmptyUserProfile);

        this.isSearchLoading = false;
        this.searchKeyword = '';
        this.searchIntervalState = undefined;

        makeAutoObservable(this);
    }

    init = () => {
        this.users = [];

        this.searchedUsers = [];
        this.searchedGroups = [];

        this.isSearchLoading = false;
        this.searchKeyword = '';
        this.searchIntervalState = undefined;

        this.userProfile = Object.assign({},EmptyUserProfile);
    }

    initUserProfile = () =>{
        this.userProfile = Object.assign({},EmptyUserProfile);
    }

    changeUserProfileGender = (gender) =>{
        this.userProfile.gender = gender;
    }

    *getUserProfile(userId){
        try {
            this.userProfile = yield this.userRepository.getUserProfile(userId);
            console.log(LogPrefix, "userProfile", this.userProfile);
        } catch (e) {
            console.log(LogPrefix, "Cannot get User Profile ...", e);
        }
    }

    searchUsers = (keyword) => {
        this.isSearchLoading = true;
        this.users = [];
        this.searchKeyword = keyword;
        if ((this.searchIntervalState === undefined) || (this.searchIntervalState === null)) {
            console.log(LogPrefix, "Starting SearchInterval ...");
            this.searchIntervalState = setInterval(() => this.getUsers(), searchingInterval);
        } else {
            console.log(LogPrefix, "SearchInterval already started ...");
        }
    }

    *getUsers() {
        if (this.searchKeyword === '') {
            this.lastSearchKeyword = '';
            // console.log(LogPrefix, "Clear SearchInterval ...");
            clearInterval(this.searchIntervalState);
            this.searchIntervalState = undefined;
            this.isSearchLoading = false;
        } else {

            if (this.searchKeyword !== this.lastSearchKeyword) {
                try {
                    this.lastSearchKeyword = this.searchKeyword;

                    const param = { keyword : this.lastSearchKeyword} ;
                    const users = yield this.userRepository.getUsers(param);
                    this.searchedUsers = users;

                    const groups = yield this.userRepository.getGroups(param);
                    this.searchedGroups = groups;

                    this.isSearchLoading = false;

                    console.log(LogPrefix, "users", users);
                } catch (error) {
                    console.log(LogPrefix, "Cannot Search Teams or Users ...", error);
                }
            } else {
                // console.log(LogPrefix, "Clear SearchInterval ...");
                clearInterval(this.searchIntervalState);
                this.searchIntervalState = undefined;
                this.lastSearchKeyword = '';
                this.isSearchLoading = false;
            }
        }
    }



}