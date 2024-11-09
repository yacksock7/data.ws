import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TitleRegistrationStyle";
import {Box, Button, Typography} from "@mui/material";
import { ReactComponent as ArrowRightIcon } from '../../common/images/ArrowRightIcon.svg';
import clsx from "clsx";
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";

class TitleRegistration extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }


    componentWillUnmount() {
    }

    handleChangeWorkName = (e) => {
        this.props.workStore.changeNewWorkName(e.target.value);
    }

    render() {
        const { classes, handleNext} = this.props;
        const { newWork } = this.props.workStore;

        return (
            <Box className={classes.titleBox}>
                <Typography className={classes.textStyle}>작업 제목</Typography>
                <textarea
                    id="container"
                    type="text"
                    rows={4}
                    value={newWork.name}
                    onChange={this.handleChangeWorkName}
                    placeholder={'작업 템플릿 제목을 입력해주세요. (최대 200자)'}
                    className={classes.textareaBox}
                />

                {/* 작업 제목 작성 안할시 */}
                {/*{newWork.name === '' &&*/}
                {/*    <Typography className={classes.textareaError}>작업 템플릿 제목을 입력해주세요.</Typography>*/}
                {/*}*/}

                <Box className={classes.buttonBox}>
                    <Button className={classes.buttonStyle}
                            onClick={handleNext}
                            disabled={newWork.name === ''}
                            disableRipple>
                        <span>템플릿 선택하기</span>
                        <ArrowRightIcon/>
                    </Button>
                </Box>
            </Box>
        );
    }
};

export default
    withStyles(styles) (
        inject('workStore', 'authStore') (
            observer(TitleRegistration)
        )
);