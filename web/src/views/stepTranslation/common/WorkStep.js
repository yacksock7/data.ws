import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "../styles/TranslationStyle";
import {inject, observer} from "mobx-react";
import TableComponent from "./TableComponent";
import ControlComponent from "./ControlComponent";

class WorkStep extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <ControlComponent/>
                <TableComponent/>
            </div>
        );
    }
};

export default withStyles(styles) (
    inject('jobStepStore') (
        observer(WorkStep)
    )
);

