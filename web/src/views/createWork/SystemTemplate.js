import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/ChooseTemplateStyle";
import {Box, Button, IconButton, Tab, Tabs, Typography} from "@mui/material";
import {ReactComponent as InfoIcon} from "../../common/images/InfoIcon.svg";
import {ReactComponent as TemplateTTTIcon} from "../../common/images/TemplateTTTIcon.svg";
import {ReactComponent as TemplateArrowRight} from "../../common/images/TemplateArrowRight.svg";
import {ReactComponent as TooltipArrow} from "../../common/images/TooltipArrow.svg";
import {ReactComponent as TooltipCloseIcon} from "../../common/images/TooltipCloseIcon.svg";
import {ReactComponent as TemplateTextIcon} from "../../common/images/TemplateTextIcon.svg";
import {ReactComponent as TemplateSnappingIcon} from "../../common/images/TemplateSnappingIcon.svg";
import {ReactComponent as TemplateVoiceIcon} from "../../common/images/TemplateVoiceIcon.svg";
import clsx from "clsx";
import {withRouter} from "../../components/WithRouter";
import {inject, observer} from "mobx-react";

class SystemTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: false,
            tooltipOpen2: false,
            tooltipOpen3: false,
        };
    }

    handleClickTooltip = (e) => {
        e.stopPropagation();
        this.setState({
            tooltipOpen: true,
            tooltipOpen2 : false,
            tooltipOpen3 : false
        });
    };

    handleClickTooltip2 = (e) => {
        e.stopPropagation();
        this.setState({
            tooltipOpen: false,
            tooltipOpen2: true,
            tooltipOpen3 : false
        });
    };

    handleClickTooltip3 = (e) => {
        e.stopPropagation();
        this.setState({
            tooltipOpen: false,
            tooltipOpen2: false,
            tooltipOpen3: true
        });
    };

    handleClickTooltipClose = () => {
        this.setState({
            tooltipOpen: false,
            tooltipOpen2: false,
            tooltipOpen3: false,
        });
    };

    handleClickTemplate = (templateId) => {
        this.props.navigate(`/createTemplate/${templateId}`);
    };

    render() {
        const {classes} = this.props;

        return (
            <>
                <Box key={'Text to Text'} className={classes.templateBox}>
                    <Box className={clsx(classes.imageBox, classes.imageBoxHover)}>
                        <TemplateTTTIcon/>
                        <Box className='hover-button-box'>
                            <Box className={classes.hoverBox}>
                                <Button className={classes.hoverButton}
                                        onClick={() => this.handleClickTemplate(1)}
                                        disableRipple>적용하기</Button>
                                <Button className={clsx(classes.hoverButton, classes.hoverButton2)}
                                        disableRipple>미리보기</Button>
                            </Box>
                        </Box>
                    </Box>

                    <Box className={classes.bottomBox}>
                        <Box className={classes.infoBox}>
                            <IconButton className={classes.iconButton} onClick={this.handleClickTooltip}
                                        disableRipple>
                                <InfoIcon/>
                            </IconButton>

                            {this.state.tooltipOpen &&
                                <Box className={classes.tooltipBox}>
                                    <Box className={classes.tooltipArrow}>
                                        <TooltipArrow/>
                                    </Box>

                                    <Box className={classes.tooltipBoxIn}>
                                        <Box className={classes.tooltipTitleBox} display='flex'
                                             justifyContent='space-between' alignItems='center'>
                                            <Typography>[Text to Text]</Typography>
                                            <IconButton className={classes.iconButton}
                                                        onClick={this.handleClickTooltipClose} disableRipple>
                                                <TooltipCloseIcon/>
                                            </IconButton>

                                        </Box>
                                        <ul>
                                            <li>출발어 텍스트를 자동번역</li>
                                            <li>자동 번역문에 대한 수정</li>
                                        </ul>
                                    </Box>
                                </Box>
                            }
                        </Box>

                        <Box className={classes.textBox}>
                            <Typography className={classes.textStyle}>Text to Text</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box key={'Text to Speech'} className={classes.templateBox}>
                    <Box className={clsx(classes.imageBox, classes.imageBoxHover)}>
                        <TemplateTextIcon/>
                        <TemplateArrowRight/>
                        <TemplateSnappingIcon/>
                        <TemplateArrowRight/>
                        <TemplateVoiceIcon/>
                        <Box className='hover-button-box'>
                            <Box className={classes.hoverBox}>
                                <Button className={classes.hoverButton}
                                        onClick={this.handleClickTemplate}
                                        disabled={true}
                                        disableRipple>적용하기</Button>
                                <Button className={clsx(classes.hoverButton, classes.hoverButton2)}
                                        disabled={true}
                                        disableRipple>미리보기</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.bottomBox}>
                        <Box className={classes.infoBox}>
                            <IconButton className={classes.iconButton} onClick={this.handleClickTooltip2}
                                        disableRipple>
                                <InfoIcon/>
                            </IconButton>

                            {this.state.tooltipOpen2 &&
                                <Box className={clsx(classes.tooltipBox, classes.tooltipBox2)}>
                                    <Box className={classes.tooltipArrow}>
                                        <TooltipArrow/>
                                    </Box>

                                    <Box className={classes.tooltipBoxIn}>
                                        <Box className={classes.tooltipTitleBox} display='flex'
                                             justifyContent='space-between' alignItems='center'>
                                            <Typography>[Text to Speech]</Typography>
                                            <IconButton className={classes.iconButton}
                                                        onClick={this.handleClickTooltipClose} disableRipple>
                                                <TooltipCloseIcon/>
                                            </IconButton>

                                        </Box>
                                        <ul className={classes.tooltipText}>
                                            <li>텍스트 데이터를 문장, 문단, 문서 단위로 편집</li>
                                            <li>편집된 텍스트에 대한 음성 녹음</li>
                                            <li>편집된 텍스트와 녹음된 음성 데이터와 정렬</li>
                                        </ul>
                                    </Box>
                                </Box>
                            }
                        </Box>

                        <Box className={classes.textBox}>
                            <Typography className={classes.textStyle}>Text to Speech</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box key={'Speech to Text'} className={classes.templateBox}>
                    <Box className={clsx(classes.imageBox, classes.imageBoxHover)}>
                        <TemplateVoiceIcon/>
                        <TemplateArrowRight/>
                        <TemplateTextIcon/>
                        <Box className='hover-button-box'>
                            <Box className={classes.hoverBox}>
                                <Button className={classes.hoverButton}
                                        onClick={() => this.handleClickTemplate(2)}
                                        disableRipple>적용하기</Button>
                                <Button className={clsx(classes.hoverButton, classes.hoverButton2)}
                                        disabled={true}
                                        disableRipple>미리보기</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.bottomBox}>
                        <Box className={classes.infoBox}>
                            <IconButton className={classes.iconButton}
                                        onClick={this.handleClickTooltip3}
                                        disableRipple>
                                <InfoIcon/>
                            </IconButton>

                            {this.state.tooltipOpen3 &&
                                <Box className={classes.tooltipBox}>
                                    <Box className={classes.tooltipArrow}>
                                        <TooltipArrow/>
                                    </Box>

                                    <Box className={classes.tooltipBoxIn}>
                                        <Box className={classes.tooltipTitleBox} display='flex'
                                             justifyContent='space-between' alignItems='center'>
                                            <Typography>[Speech to Text]</Typography>
                                            <IconButton className={classes.iconButton}
                                                        onClick={this.handleClickTooltipClose} disableRipple>
                                                <TooltipCloseIcon/>
                                            </IconButton>

                                        </Box>
                                        <ul className={classes.tooltipText}>
                                            <li>음성 데이터를 텍스트 데이터로 변환</li>
                                            <li>변환된 텍스트 데이터에 대해 음성을 참고하여 수정</li>
                                        </ul>
                                    </Box>
                                </Box>
                            }
                        </Box>

                        <Box className={classes.textBox}>
                            <Typography className={classes.textStyle}>Speech to Text</Typography>
                        </Box>
                    </Box>
                </Box>
            </>
        );
    }
};

export default withRouter(
    withStyles(styles)(
        inject('templateStore')(
            observer(SystemTemplate)
        )
    )
);