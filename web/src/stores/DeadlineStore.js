import {makeAutoObservable} from "mobx";
import {TemplateStepType} from "./TemplateStore";

const LogPrefix = '[DeadlineStore]';

const EmptyDeadline = {

    deadlineDatetime : '',
    stepName : '',
    startDatetime:'',
    unLimitFlag:false
}

const EmptyCalendar = {
    selectedYear : 0,
    selectedMonth : 0,
    selectedDay : 0,
    lastDayOfMonth : 0
}

const unLimitDate = new Date("9999-12-31");

export default class DeadlineStore{
    constructor(props) {
        this.deadlineRepository = props.deadlineRepository;
        this.deadline = Object.assign({},EmptyDeadline);
        this.calendar = Object.assign({},EmptyCalendar);
        this.deadlineArr = [];
        this.deadlineShowArr = [];
        makeAutoObservable(this);
    }

    initDeadlineArr = () =>{
        this.deadlineArr = [];
    }
    initDeadlineShowArr = () =>{
        this.deadlineShowArr = [];
    }
    changeDeadlineShowArr = (arr) => {
        this.deadlineShowArr = arr;
    }

    changeStepName = (str) =>{
        this.deadline.stepName = str;
    }

    changeDeadlineUnlimitFlag = (flag) =>
    {
        this.deadline.unLimitFlag = flag;
    }
    makeDeadlineDeadlineDatetime = (year,month,day) =>
    {
        if(this.deadline.unLimitFlag)
        {
            this.deadline.deadlineDatetime =  unLimitDate;
            this.deadline.startDatetime = unLimitDate;
        }
        else {
            const dateStr = `${year}-${month}-${day}`
            const deadline = new Date(dateStr);
            deadline.setHours(deadline.getHours() +10);
            const now = new Date();
            now.setHours(now.getHours() +10);
            //this.deadline.deadlineDatetime =  new Date(deadline.getTime()) + (9*60*60*1000);
            this.deadline.deadlineDatetime =  deadline;
            //this.deadline.startDatetime = new Date(now.getTime())+ (9*60*60*1000);
            this.deadline.startDatetime = now;
        }
    }
    changeDeadlineDeadlineDatetime = (datetime) =>
    {
        this.deadline.deadlineDatetime = new Date(datetime);
    }
    initCalendarToday = () =>{
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth()+1;
        const Day = today.getDate();

        this.calendar.selectedYear = year;
        this.calendar.selectedMonth = month;
        this.calendar.selectedDay = Day;
        this.calendar.lastDayOfMonth = new Date(year,month,0).getDate();
    }
    getLastDayOfMonth = () =>
    {
        this.calendar.lastDayOfMonth
            = new Date(this.calendar.selectedYear, this.calendar.selectedMonth,0).getDate();
    }
    changeCalendarYear = (year) =>
    {  
        this.calendar.selectedYear = year;
        this.getLastDayOfMonth();
    }
    changeCalendarMonth = (month) =>
    {  
        this.calendar.selectedMonth = month;
        this.getLastDayOfMonth();
    }
    changeCalendarDay = (day) =>
    {  
        this.calendar.selectedDay = day;
        //this.getLastDayOfMonth();
    }

    *getDeadline(workTemplateSteps){
        try{
            const templateDeadline = yield this.deadlineRepository.getWorkTemplateStepDeadlines(workTemplateSteps.workTemplateId,workTemplateSteps.workTemplateStepNum,{});
            console.log(LogPrefix, "getWorkTemplateStepDeadlines ...", templateDeadline);
            if(templateDeadline.length < 1)
            {
                this.deadline.deadlineDatetime = '';
                this.deadline.deadlineDatetime = {... this.deadline.deadlineDatetime};
                return;
            }
            else if(templateDeadline.length === 1)
            {
                this.changeDeadlineDeadlineDatetime(templateDeadline[0].deadlineDatetime);
                return;
            }
            const newestDeadline = templateDeadline.reduce((prev,current) => {
                return (prev.workTemplateStepDeadlineNum > current.workTemplateStepDeadlinNum) ? prev : current;
            });
            //console.log('[getDeadline] GetDeadline Check');
            //console.log(this.deadline);
            //console.log(newestDeadline);
            this.changeDeadlineDeadlineDatetime(newestDeadline.deadlineDatetime);
            //this.deadline = newestDeadline;
            //console.log(this.deadline);
        }
        catch (e) {
            this.deadline.deadlineDatetime = '';
            this.deadline.deadlineDatetime = {... this.deadline.deadlineDatetime};
            console.log(e);
        }

    }

    *getDeadlines(workTemplateId, workTemplateStepNum, stepType) {
        try {
            this.initDeadlineArr();
            const param = { } ;
            
            const templateDeadlines = yield this.deadlineRepository.getWorkTemplateStepDeadlines(workTemplateId,workTemplateStepNum,param);
           // console.log(templateDeadlines);
            const newestDeadline = templateDeadlines.reduce((prev,current) => {
                return (prev.workTemplateStepDeadlineNum > current.workTemplateStepDeadlinNum) ? prev : current;
            });
           // console.log(newestDeadline);
            //console.log(stepType);
            const eventColor = ['#056cf2', '#f2b705','#140cf2','#f25e3d','#5d00c7'];
            //templateDeadlines.map(item =>{
            if(newestDeadline.startDatetime === unLimitDate)
            {
                this.deadline.unLimitFlag = true;
                //console.log(newestDeadline);
                //console.log(unLimitDate);
                return;
            }
                    if(stepType === TemplateStepType.Upload)
                    {
                        this.deadlineArr.push(
                            {
                                start: newestDeadline.startDatetime,
                                end: newestDeadline.deadlineDatetime,
                                colorEvento : eventColor[0],
                                color: '#fff',
                                type : 'upload'
                            }
                        );
                        this.deadlineArr = [...this.deadlineArr];
                    }
                    else if(stepType === TemplateStepType.Machine)
                    {
                        //console.log("Cehck translate");
                        //console.log(newestDeadline);
                        this.deadlineArr.push(
                            {
                                start: newestDeadline.startDatetime,
                                end: newestDeadline.deadlineDatetime,
                                colorEvento : eventColor[1],
                                color: '#fff',
                                type : 'translate'
                            }
                        );
                        this.deadlineArr = [...this.deadlineArr];
                        //console.log("Cehck deadlineArr");
                        //console.log(this.deadlineArr);
                    }
                    else if(stepType === TemplateStepType.Correction)
                    {
                        this.deadlineArr.push(
                            {
                                start: newestDeadline.startDatetime,
                                end: newestDeadline.deadlineDatetime,
                                colorEvento : eventColor[2],
                                color: '#fff',
                                type : 'correction'
                            }
                        );
                        this.deadlineArr = [...this.deadlineArr];
                    }
                    else if(stepType === TemplateStepType.Inspection)
                    {
                        this.deadlineArr.push(
                            {
                                start: newestDeadline.startDatetime,
                                end: newestDeadline.deadlineDatetime,
                                colorEvento : eventColor[3],
                                color: '#fff',
                                type : 'inspection'
                            }
                        );
                        this.deadlineArr = [...this.deadlineArr];
                    }
                    else if(stepType === TemplateStepType.Export)
                    {
                        this.deadlineArr.push(
                            {
                                start: newestDeadline.startDatetime,
                                end: newestDeadline.deadlineDatetime,
                                colorEvento : eventColor[4],
                                color: '#fff',
                                type : 'export'
                            }
                        );
                        this.deadlineArr = [...this.deadlineArr];
                    }

                //}
            //)
            //console.log(LogPrefix, "templateDeadlines", templateDeadlines);
            //console.log(this.deadlineArr);

            if(this.deadline.stepName === 'all')
            {
                this.changeDeadlineShowArr(this.deadlineArr);
            }else {
                this.changeDeadlineShowArr(
                    this.deadlineArr.filter(item => item.type === this.deadline.stepName)
                );
            }

        } catch (error) {
            console.log(LogPrefix, "Cannot Search Template Deadlines ...", error);
        }
    }
    *makeDeadline(selectedWorkTemplateStep,workTemplateSteps){
       try{
           const makeId = selectedWorkTemplateStep.workTemplateId;
           const makeNum = selectedWorkTemplateStep.workTemplateStepNum;
           const data = {
               workTemplateId : makeId,
               workTemplateStepNum : makeNum,
               deadlineDatetime : this.deadline.deadlineDatetime,
               startDatetime : this.deadline.startDatetime
           }
           //console.log("[MAKE DEADLINE!!]");
           //console.log(data);
           const response = yield this.deadlineRepository.makeNewTemplateStepDeadline(data);
           workTemplateSteps.map(item => {
               this.getDeadlines(item.workTemplateId,item.workTemplateStepNum,item.type);
           })
           console.log(LogPrefix, "makeNewDeadline Success!!");
       }
        catch(e)
        {
            console.log(LogPrefix, "makeNewDeadline ERROR! e=", e.data);
        }
    }

}