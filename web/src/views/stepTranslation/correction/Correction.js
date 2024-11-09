import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import CorrectionControlComponent from "./CorrectionControlComponent";
import TableComponentModify from "./TableComponentModify";

const styles = theme => ({

});

class Correction extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <CorrectionControlComponent/>
                <TableComponentModify/>
            </div>
        );
    }
};

export default withStyles(styles) (Correction);