import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DateToggleStyle";
import {Box, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";

class DateToggleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: 'all',
        }
    }

    handleClickDate = (event, date) => this.setState({ date });

    render() {
        const { classes } = this.props;

        return (
            <Box display='flex' alignItems='center'>
                <Typography className={classes.textStyle}>조회 기간</Typography>
                <ToggleButtonGroup
                    value={this.state.date}
                    exclusive
                    onChange={this.handleClickDate}
                    className={classes.toggleButton}
                >
                    <ToggleButton value="all" disableRipple>
                        전체 기간
                    </ToggleButton>
                    <ToggleButton value="today" disableRipple>
                        오늘
                    </ToggleButton>
                    <ToggleButton value="week" disableRipple>
                        1주일
                    </ToggleButton>
                    <ToggleButton value="oneMonth" disableRipple>
                        1개월
                    </ToggleButton>
                    <ToggleButton value="threeMonths" disableRipple>
                        3개월
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        );
    }
};

export default withStyles(styles)(DateToggleComponent);