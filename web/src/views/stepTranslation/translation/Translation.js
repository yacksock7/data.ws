import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "../styles/TranslationStyle";
import TableComponent from "./TableComponent";
import TranslationControlComponent from "./TranslationControlComponent";

class Translation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <TranslationControlComponent/>
                <TableComponent/>
            </div>
        );
    }
};

export default withStyles(styles) (Translation);