import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/NewCreateTemplateStyle";
import {Box, Typography} from "@mui/material";
import {inject, observer} from "mobx-react";

class NewCreateTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { classes, handleChangTextField, textFieldValue } = this.props;

        return (
            <Box className={classes.root}>
                <Typography className={classes.titleText}>템플릿 이름</Typography>
                <textarea id="container"
                          type="text"
                          rows={4}
                          placeholder={'작업제목 (최대 200자)'}
                          value={textFieldValue}
                          onChange={handleChangTextField}
                          className={classes.textareaBox}/>
            </Box>
        );
    }
};


export default withStyles(styles) (
    inject('navigateStore') (
        observer(NewCreateTemplate)
    )
);