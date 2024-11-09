import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
// import {styles} from "../styles/TranslationStyle";
import {styles} from "./styles/TableComponentStyle";
import {Box} from "@mui/material";
import DownloadControlComponent from "./DownloadControlComponent";
import TableComponentDownload from "./TableComponentDownload";
import TableComponentDownload2 from "./TableComponentDownload2";

class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                {/*작업목록 업로드 버튼 바*/}
                {/*<TranslationBarDownloadComponent/>*/}
                <DownloadControlComponent/>
                {/*추출1 업로드+번역+추출*/}
                <TableComponentDownload/>
                {/*추출2 업로드+번역+교정+검수+추출*/}
                <TableComponentDownload2/>


            </div>
        );
    }
};

export default withStyles(styles)(Download);