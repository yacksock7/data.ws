import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DashboardChartStyle";
import { ResponsivePie } from '@nivo/pie'

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { classes, data } = this.props;

        return (
            <ResponsivePie
                data={data}
                margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
                innerRadius={0.55}
                activeOuterRadiusOffset={8}
                borderColor="#000000"
                enableArcLinkLabels={false}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsThickness={2}
                colors={['#7500fa', '#9d1036','#d91e50', '#ddd' ]}
                enableArcLabels={false}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                isInteractive={false}
                legends={[]}
            />
        );
    }
};

export default withStyles(styles)(Chart);