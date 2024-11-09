import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DashboardChartStyle";
import {Box, Typography} from "@mui/material";
import {ReactComponent as UploadIcon} from "../../common/images/UploadIcon.svg";
import Chart from "./Chart";
import {ReactComponent as TranslationIcon} from "../../common/images/TranslationIcon.svg";
import {ReactComponent as CorrectionIcon} from "../../common/images/CorrectionIcon.svg";
import {ReactComponent as InspectionIcon} from "../../common/images/InspectionIcon.svg";
import {ReactComponent as TagIcon} from "../../common/images/TagIcon.svg";
import {ReactComponent as ExtractionIcon} from "../../common/images/ExtractionIcon.svg";

class DashboardChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartList:[
                {icon: <UploadIcon/>, title: '업로드'},
                {icon: <TranslationIcon/>, title: '기계'},
                {icon: <CorrectionIcon/>, title: '교정'},
                {icon: <InspectionIcon/>, title: '검수'},
                {icon: <TagIcon/>, title: '라벨링'},
                {icon: <ExtractionIcon/>, title: '추출'},
            ],
            data:[
                {
                    "id": "complete",
                    "value": 40,
                },
                {
                    "id": "incomplete",
                    "value": 28,
                },
                {
                    "id": "created",
                    "value": 22,
                },
                {
                    "id": "rejected",
                    "value": 10,
                },
            ]
        }
    }
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {this.state.chartList.map((list, i) => (
                    <Box key={i} className={classes.cardContainer}>
                        <Box className={classes.box}>
                            <Box display='flex' alignItems='center' className={classes.titleBox}>
                                {list.icon}
                                <Typography>{list.title}</Typography>
                            </Box>
                            <Box className={classes.chartBox}>
                                <Chart data={this.state.data}/>
                                <Box className={classes.centerText}>
                                    <Typography className={classes.textStyle}>{this.state.data[0].value}<span>%</span></Typography>
                                    <Typography className={classes.subText}>완료 진척율</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </div>
        );
    }
};

export default withStyles(styles)(DashboardChart);