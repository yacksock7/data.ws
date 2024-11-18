import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TemplateStyle";

import {drawerCloseWidth, drawerOpenWidth, totalDrawerOpenWidth, totalDrawerCloseWidth} from "../../App";
import SearchBox from "./templateList/SeachBox";
import TemplateList from "./templateList/TemplateList";

import {TemplateType} from "../../stores/TemplateStore";

class Template extends Component {

    componentDidMount() {
        this.getTemplates();
    }

    getTemplates = () => {
        const { loginUser } = this.props.authStore;
        this.props.templateStore.getTemplates(loginUser.id, TemplateType.Private);
    }

    render() {
        const { classes} = this.props;
        const { open, menuValue, sideBar } = this.props.navigateStore;
        const { templateTableTransfers } = this.props.templateStore;

        return (
            <div className={classes.root}
                 style={ open ? menuValue === 1 && sideBar ? {marginLeft: totalDrawerOpenWidth} : {marginLeft: drawerOpenWidth}
                     : menuValue === 1 && sideBar ? {marginLeft: totalDrawerCloseWidth} : {marginLeft: drawerCloseWidth}}>

                {/*TODO Template -> StepBox (데이터 연동)*/}
                {/*<StepBox/>*/}

                <SearchBox/>

                {/*TODO Template -> ListTable (데이터 연동)*/}
                <TemplateList templates={templateTableTransfers}
                              getTemplates={this.getTemplates}/>
                {/*데이터 없을때 테이블*/}
                {/*<ListTableEmpty/>*/}

            </div>
        );
    }
};

export default withStyles(styles) (
    inject( 'authStore', 'navigateStore', 'templateStore') (
        observer(Template)
    )
);