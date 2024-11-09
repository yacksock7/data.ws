import {serverContextPath} from "../AppConstants";

import AuthRepository from "../repositories/AuthRepository";
import WorkRepository from "../repositories/WorkRepository";
import TemplateRepository from "../repositories/TemplateRepository";
import WorkTemplateRepository from "../repositories/WorkTemplateRepository";
import WorkUploadUserRepository from "../repositories/WorkUploadUserRepository";
import UserRepository from "../repositories/UserRepository";
import JobRepository from "../repositories/JobRepository";
import DeadlineRepository from "../repositories/DeadlineRepository";

import AuthStore from "./AuthStore";
import WorkStore from "./WorkStore";
import TemplateStore from "./TemplateStore";
import NavigateStore from "./NavigateStore";
import WorkTemplateStore from "./WorkTemplateStore";
import WorkUploadUserStore from "./WorkUploadUserStore";
import UserStore from "./UserStore";
import JobStore from "./JobStore";

import SignUpStore from "./SignUpStore";
import DeadlineStore from "./DeadlineStore";
import JobStepRepository from "../repositories/JobStepRepository";
import JobStepStore from "./JobStepStore";
import JobStepTaskRepository from "../repositories/JobStepTaskRepository";
import JobStepTaskStore from "./JobStepTaskStore";
import JobStepTaskWorkerRepository from "../repositories/JobStepTaskWorkerRepository";
import JobStepTaskWorkerStore from "./JobStepTaskWorkerStore";
import JobStepTaskResultRepository from "../repositories/JobStepTaskResultRepository";
import JobStepTaskResultStore from "./JobStepTaskResultStore";
import JobRejectRepository from "../repositories/JobRejectRepository";
import JobRejectStore from "./JobRejectStore";

const repositoryProps = {
    serverContextPath: serverContextPath,
};

const authRepository = new AuthRepository(repositoryProps);
const workRepository = new WorkRepository(repositoryProps);
const templateRepository = new TemplateRepository(repositoryProps);
const workTemplateRepository = new WorkTemplateRepository(repositoryProps)
const workUploadUserRepository = new WorkUploadUserRepository(repositoryProps);
const userRepository = new UserRepository(repositoryProps);
const deadlineRepository = new DeadlineRepository(repositoryProps);
const jobRepository = new JobRepository(repositoryProps);
const jobStepRepository = new JobStepRepository(repositoryProps);
const jobStepTaskRepository = new JobStepTaskRepository(repositoryProps);
const jobStepTaskResultRepository = new JobStepTaskResultRepository(repositoryProps);
const jobStepTaskWorkerRepository = new JobStepTaskWorkerRepository(repositoryProps);
const jobRejectRepository = new JobRejectRepository(repositoryProps);

const storeProps = {};
const signUpStore = new SignUpStore({...storeProps});

export const stores = {
    signUpStore : signUpStore,
    authStore: new AuthStore({signUpStore, authRepository, ...storeProps}),
    workStore: new WorkStore({workRepository, ...storeProps}),
    templateStore: new TemplateStore({templateRepository, ...storeProps}),
    workTemplateStore: new WorkTemplateStore({workTemplateRepository, ...storeProps}),
    workUploadUserStore: new WorkUploadUserStore({workUploadUserRepository, ...storeProps}),
    userStore: new UserStore({userRepository, ...storeProps}),
    deadlineStore: new DeadlineStore({deadlineRepository, ...storeProps}),
    jobStore: new JobStore({jobRepository, ...storeProps}),
    jobStepStore: new JobStepStore({jobStepRepository, ...storeProps}),
    jobStepTaskStore: new JobStepTaskStore({jobStepTaskRepository, ...storeProps}),
    jobStepTaskResultStore: new JobStepTaskResultStore({jobStepTaskResultRepository, ...storeProps}),
    jobStepTaskWorkerStore: new JobStepTaskWorkerStore({jobStepTaskWorkerRepository, ...storeProps}),
    jobRejectStore: new JobRejectStore({jobRejectRepository, ...storeProps}),

    navigateStore: new NavigateStore({...storeProps})
}

