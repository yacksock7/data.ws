import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import InspectionControlComponent from "./InspectionControlComponent";
import TableComponentInspection from "./TableComponentInspection";

const styles = theme => ({

});

class Inspection extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <InspectionControlComponent/>

                <TableComponentInspection/>


            </div>
        );
    }
};

export default withStyles(styles)(Inspection);