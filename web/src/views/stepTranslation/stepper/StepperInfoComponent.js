import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/StepperInfoComponentStyles";
import {
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import {ReactComponent as InfoIcon} from "../../../common/images/InfoIcon.svg";
import {ReactComponent as TooltipArrow} from "../../../common/images/TooltipArrow.svg";
import {ReactComponent as TooltipCloseIcon} from "../../../common/images/TooltipCloseIcon.svg";
import {inject, observer} from "mobx-react";
import {TemplateStepType} from "../../../stores/TemplateStore";

class StepperInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: false,
        }
    }

    handleClickTooltip = () => {
        this.setState({ tooltipOpen: true });
    };

    handleClickTooltipClose = () => {
        this.setState({
            tooltipOpen: false,
        });
    };

    render() {
        const { classes } = this.props;
        const { selectedWorkTemplateStep } = this.props.workStore;

        return (
            <div className={classes.root}>
                <IconButton className={classes.iconButton} onClick={this.handleClickTooltip} disableRipple>
                    <InfoIcon style={{width: 24, height: 24}}/>
                </IconButton>

                {this.state.tooltipOpen &&
                    <Box className={classes.tooltipBox}>
                        <Box className={classes.tooltipArrow}>
                            <TooltipArrow/>
                        </Box>

                        <Box className={classes.tooltipBoxIn}>
                            <Box className={classes.tooltipTitleBox} display='flex' justifyContent='space-between' alignItems='center'>
                                <Typography>
                                    {selectedWorkTemplateStep.name}
                                </Typography>
                                <IconButton className={classes.iconButton} onClick={this.handleClickTooltipClose} disableRipple>
                                    <TooltipCloseIcon/>
                                </IconButton>

                            </Box>

                                {selectedWorkTemplateStep.type === TemplateStepType.Upload &&
                                    <ul><li>일감을 파일 단위로 업로드 합니다.</li></ul>
                                }
                                {selectedWorkTemplateStep.type === TemplateStepType.Machine &&
                                    <ul>
                                        <li>템플릿에 설정된 기계 번역기를 통해 자동으로 번역 결과물을 출력</li>
                                        <li>작업자 배정은 필요 없으며 모든 작업은 자동으로 수행됩니다.</li>
                                    </ul>
                                }
                                {selectedWorkTemplateStep.type === TemplateStepType.Editing &&
                                    <ul><li>변역 완료된 아웃풋을 작업자(인간)이 교정합니다.</li></ul>
                                }
                                {selectedWorkTemplateStep.type === TemplateStepType.Inspection &&
                                    <ul>
                                        <li>교정 완료 이후 작업자가 검수를 진행합니다.</li>
                                        <li>반려 가능하며 이전 단계를 지정하여 해당 단계 작업자에게 재작업을 요청할 수 있습니다.</li>
                                    </ul>
                                }
                                {selectedWorkTemplateStep.type === TemplateStepType.Export &&
                                    <ul><li>템플릿에 설정된 모든 단계 작업이 완료된 아웃풋을 Json 산출물로 추출합니다.</li></ul>
                                }

                        </Box>
                    </Box>
                }
            </div>
        );
    }
};

export default withStyles(styles) (
    inject('workStore')(
        observer(StepperInfoComponent)
    )
);