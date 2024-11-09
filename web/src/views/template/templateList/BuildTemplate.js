import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/BuildTemplateStyle";
import { Box } from "@mui/material";
import StepBox from "./StepBox";
import SearchBox from "./SeachBox";
import ListTable from "./ListTable";
import ListTableEmpty from "./ListTableEmpty";


class BuildTemplate extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Box>
                {/*TODO Template -> StepBox (데이터 연동)*/}
                <StepBox/>

                <SearchBox/>

                {/*TODO Template -> ListTable (데이터 연동)*/}
                <ListTable/>
                {/*데이터 없을때 테이블*/}
                {/*<ListTableEmpty/>*/}
            </Box>
        );
    }
};

export default withStyles(styles)(BuildTemplate);