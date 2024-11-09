import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/BuildTemplateStyle";
import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import {withRouter} from "../../../components/WithRouter";
import dayjs from "dayjs";

const SEARCH_TERM_LIST = [
    {label:"전체 기간", type: null, term: 0},
    {label:"오늘", type: "d", term: 0},
    {label:"일주일", type: "w", term: 1},
    {label:"1개월", type: "M", term: 1},
    {label:"3개월", type: "M", term: 3},
]
class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: SEARCH_TERM_LIST[0],
            today : new Date(),
        }
    }

    handleClickDate = (event, date) => {
        if (date == null) {
            date = SEARCH_TERM_LIST[0];
        }
        this.setState({ date });
    }

    goToTemplateCreatPage = () => {
        this.props.navigate('/template/create');
    }

    render() {
        const { classes } = this.props;
        const { date, today } = this.state;

        return (
            <Box className={classes.searchBoxOuter}>
                <Box>
                    <Box display='flex' alignItems='center'>
                        <Typography className={classes.textStyle}> 조회 기간 </Typography>
                        <ToggleButtonGroup className={classes.toggleButton}
                                           value={date}
                                           onChange={this.handleClickDate}
                                           exclusive>
                            {SEARCH_TERM_LIST.map((term) =>
                                <ToggleButton key={`toggle-button_${term.label}`} value={term} disableRipple>
                                    {term.label}
                                </ToggleButton>
                            )}
                        </ToggleButtonGroup>
                    </Box>

                    <Box display='flex' justifyContent='flex-end'>
                        <Typography className={classes.dateText}>
                            {(date.type) && dayjs(today).subtract(date.term, date.type).format(`YYYY-MM-DD (ddd)`)}
                            ~ {dayjs(today).format(`YYYY-MM-DD (ddd)`)}
                        </Typography>
                    </Box>
                </Box>

                <Box>
                    <Button className={classes.buildTemplateBtn}
                            onClick={this.goToTemplateCreatPage}
                            disableRipple>
                        <Typography>템플릿 만들기</Typography>
                    </Button>
                </Box>
            </Box>
        );
    }
};

export default withRouter(
    withStyles(styles)(SearchBox)
);