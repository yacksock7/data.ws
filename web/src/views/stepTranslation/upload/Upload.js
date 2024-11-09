import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "../styles/TranslationStyle";
import {Box, Typography} from "@mui/material";
import UploadControlComponent from "./UploadControlComponent";
import TableComponentUpload from "./TableComponentUpload";
import {inject, observer} from "mobx-react";

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillUnmount() {
        //this.props.jobStepStore.init();
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                {/*작업목록 업로드 버튼 바*/}
                <UploadControlComponent/>

                <TableComponentUpload/>

                {/*<Box className={classes.uploadBox}>*/}
                {/*    <Typography>파일을 추가하여 일감을 동록하면 여기에 표시됩니다.</Typography>*/}
                {/*</Box>*/}
            </div>
        );
    }
};

export default withStyles(styles) (
    inject('jobStepStore') (
        observer(Upload)
    )
);

