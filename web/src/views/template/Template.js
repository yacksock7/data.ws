import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TemplateStyle";

import {drawerCloseWidth, drawerOpenWidth, totalDrawerOpenWidth, totalDrawerCloseWidth} from "../../App";

import StepBox from "./templateList/StepBox";
import SearchBox from "./templateList/SeachBox";
import ListTable from "./templateList/ListTable";

class Template extends Component {

    render() {
        const { classes} = this.props;
        const { open, menuValue,  sideBar } = this.props.navigateStore;

        return (
            <div className={classes.root}
                 style={ open ? menuValue === 1 && sideBar ? {marginLeft: totalDrawerOpenWidth} : {marginLeft: drawerOpenWidth}
                     : menuValue === 1 && sideBar ? {marginLeft: totalDrawerCloseWidth} : {marginLeft: drawerCloseWidth}}>

                {/*TODO Template -> StepBox (데이터 연동)*/}
                {/*<StepBox/>*/}

                <SearchBox/>

                {/*TODO Template -> ListTable (데이터 연동)*/}
                <ListTable/>
                {/*데이터 없을때 테이블*/}
                {/*<ListTableEmpty/>*/}

            </div>
        );
    }
};

export default withStyles(styles) (
    inject( 'navigateStore') (
        observer(Template)
    )
);