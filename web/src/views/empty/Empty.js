import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {Box} from "@mui/material";
import EmptyBackImage from "../../common/images/EmptyBackImage.png";
import {drawerCloseWidth, drawerOpenWidth, totalDrawerOpenWidth, totalDrawerCloseWidth} from "../../App";
import {inject, observer} from "mobx-react";

const styles = theme => ({
    root:{
        marginTop: 70,
        minHeight: 'calc(100vh - 70px)',
    },
    emptyBack:{
        width: '100%',
        minHeight: 'calc(100vh - 70px)',
        background: '#eee',
        backgroundImage: `url(${EmptyBackImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    }
});

class Empty extends Component {

    render() {
        const { classes} = this.props;
        const { open, menuValue, sideBar } = this.props.navigateStore;

        return (
            <div
                className={classes.root}
                style={
                    open ?
                        menuValue === 1 && sideBar ?
                            {marginLeft: totalDrawerOpenWidth}
                            :
                            {marginLeft: drawerOpenWidth}
                        :
                        menuValue === 1 && sideBar ?
                            {marginLeft: totalDrawerCloseWidth}
                            :
                            {marginLeft: drawerCloseWidth}
                }
            >
                <Box className={classes.emptyBack} />
            </div>
        );
    }
};


export default withStyles(styles) (
    inject( 'navigateStore') (
        observer(Empty)
    )
);