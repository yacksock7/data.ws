import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TemplateStyle";
import {drawerCloseWidth, drawerOpenWidth, totalDrawerOpenWidth, totalDrawerCloseWidth} from "../../App";
import {inject, observer} from "mobx-react";
import BuildTemplate from "./templateList/BuildTemplate";

class Template extends Component {

    render() {
        const { classes} = this.props;
        const { open, menuValue,  sideBar } = this.props.navigateStore;

        return (
            <div className={classes.root}
                 style={ open ? menuValue === 1 && sideBar ? {marginLeft: totalDrawerOpenWidth} : {marginLeft: drawerOpenWidth}
                     : menuValue === 1 && sideBar ? {marginLeft: totalDrawerCloseWidth} : {marginLeft: drawerCloseWidth}}>
                <BuildTemplate />
            </div>
        );
    }
};

export default withStyles(styles) (
    inject( 'navigateStore') (
        observer(Template)
    )
);