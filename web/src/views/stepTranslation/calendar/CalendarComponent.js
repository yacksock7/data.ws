import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/CalendarComponentStyle";
import Toolbar from "./CalendarToolbar";
import DateHeader from "./CalendarDateHeader";
import {Typography} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {inject, observer} from "mobx-react";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const DnDCalendar = withDragAndDrop(Calendar);

require('moment/locale/ko.js')

const localizer = momentLocalizer(moment);
//업로드, 번역, 교정, 검수, 추출
const eventColor = ['#056cf2', '#f2b705','#140cf2','#f25e3d','#5d00c7'];

class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
                {
                    start: moment().toDate(),
                    end: moment().add(1, "days").toDate(),
                    title: "",
                    colorEvento:'#056cf2',
                    color: '#fff'
                },
                {
                    start: moment().toDate(),
                    end: moment().add(2, "days").toDate(),
                    title: "",
                    colorEvento:'#f2b705',
                    color: '#fff'
                },
                {
                    start: moment().toDate(),
                    end: moment().add(1, "days").toDate(),
                    title: "",
                    colorEvento:'#5d00c7',
                    color: '#fff'
                },
                {
                    start: moment().toDate(),
                    end: moment().add(5, "days").toDate(),
                    title: "",
                    colorEvento:'#f25e3d',
                    color: '#fff'
                },
                {
                    start: moment().toDate(),
                    end: moment().add(4, "days").toDate(),
                    title: "",
                    colorEvento:'#140cf2',
                    color: '#fff'
                }
            ]
        }

        //this.props.deadlineStore.getDeadlines();
    }

    onEventResize = (data) => {
        // const { start, end } = data;
        //
        // this.setState((state) => {
        //     state.events[0].start = start;
        //     state.events[0].end = end;
        //     return { events: [...state.events] };
        // });
    };

    // createEventArr = () => {
    //     for(let i =0;i<this.props.deadlineStore.deadlineArr.length;i++)
    //     {
    //
    //     }
    // }
    componentDidMount() {
        this.props.deadlineStore.initDeadlineArr();
        this.props.deadlineStore.initDeadlineShowArr();
        //console.log(this.props.workStore.selectedWork.workTemplateSteps);
        this.props.workStore.selectedWork.workTemplateSteps.map(item => {
            this.props.deadlineStore.getDeadlines(item.workTemplateId,item.workTemplateStepNum,item.type);
        })
    }

    onEventDrop = (data) => {
    };

    render() {
        const { classes } = this.props;
        const { workTemplateSteps } = this.props.workStore.selectedWork;
        const { deadlineArr,deadlineShowArr } = this.props.deadlineStore;

        return (
            <div className={classes.root}>
                <Typography className={classes.titleText} >기한 지정</Typography>
                <Calendar
                    defaultDate={moment().toDate()}
                    views={["month"]}
                    startAccessor="start"
                    endAccessor="end"
                    events={deadlineShowArr}
                    localizer={localizer}
                    eventPropGetter={(myEventsList) => {
                        const backgroundColor = myEventsList.colorEvento ? myEventsList.colorEvento : 'blue';
                        const color = myEventsList.color ? myEventsList.color : 'blue';
                        return { style: { backgroundColor ,color} }
                    }}
                    components={{
                        toolbar: Toolbar,
                        month: {
                            dateHeader: DateHeader,
                        },
                    }}

                    onEventDrop={this.onEventDrop}
                    onEventResize={this.onEventResize}
                    resizable
                    onShowMore={true}
                    style={{ height: "530px" }}
                />
            </div>
        );
    }
}

export default withStyles(styles) (
    (inject)('deadlineStore','templateStore','workStore')((observer)(CalendarComponent)));