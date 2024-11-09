import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DatePickerStyle";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import {Box, IconButton, Typography} from "@mui/material";
import {ReactComponent as CalendarIcon} from "../../common/images/CalendarIcon.svg";
import 'dayjs/locale/ko';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

class DatePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locale: 'ko'
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Box display='flex' alignItems='center' className={classes.dateBox}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={this.state.locale}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                            format="YYYY.MM.DD.(dd)"
                            defaultValue={dayjs()}
                            slots={{
                                openPickerButton: (props) => <Box {...props} className={classes.calendarBox}><CalendarIcon /></Box>,
                            }}
                        />
                        <Typography className={classes.waveText}>~</Typography>
                        <DatePicker
                            format="YYYY.MM.DD.(ddd)"
                            defaultValue={dayjs()}
                            slots={{
                                openPickerButton: (props) =><Box {...props} className={classes.calendarBox}><CalendarIcon /></Box>,
                            }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Box>
        );
    }
};

export default withStyles(styles)(DatePickerComponent);