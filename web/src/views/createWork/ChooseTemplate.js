import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/ChooseTemplateStyle";
import {Box, Button, IconButton, Tab, Tabs, Typography} from "@mui/material";
import ScreenShotTestImage from "../../common/images/ScreenShotTestImage.png";
import AddTemplateImage from "../../common/images/AddTemplateImage.png";
import { ReactComponent as AddIcon } from '../../common/images/AddIcon.svg';
import clsx from "clsx";
import {withRouter} from "../../components/WithRouter";
import {inject, observer} from "mobx-react";
import SystemTemplate from "./SystemTemplate";
import CommonDialog from "../dialog/CommonDialog";
import NewCreateTemplate from "./NewCreateTemplate";

class ChooseTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            tooltipOpen: false,
            tooltipOpen2: false,
            tooltipOpen3: false,
        };
    }

    componentDidMount() {
        const { loginUser } = this.props.authStore;
        const { tabIndex } = this.state;

        // this.props.templateStore.getTemplatesByTabIndex(loginUser.id, tabIndex);
        // this.props.templateStore.getTemplates(loginUser.id, tabIndex);
    }

    handleChangeTabIndex = (event, tabIndex) => {
        this.setState({tabIndex});
    };

    handleClickTemplate = (templateId) => {
        // this.props.templateStore;
        this.props.navigate(`/createTemplate/${templateId}`);
    };

    render() {
        const { tabIndex } = this.state;
        const {classes} = this.props;
        const { templates } = this.props.templateStore;

        return (
            <Box className={classes.root}>
                <Tabs value={tabIndex}
                      onChange={this.handleChangeTabIndex}
                      className={classes.trigger}>
                    <Tab value={0} label={'전체'} disableRipple/>
                    <Tab value={1} label={'기본 템플릿'} disableRipple/>
                    <Tab value={2} label={'내 템플릿'} disableRipple/>
                </Tabs>

                <Box className={classes.contentsBox}>
                    <Box className={classes.templateBox}>
                        <Box className={clsx(classes.imageBox, classes.imageBoxHover)}>
                                <Box className={classes.imageBoxIn}>
                                    <img src={AddTemplateImage} alt='기본템플릿 만들기'/>
                                </Box>

                            <Box className='hover-button-box'>
                                <Box className={classes.hoverBox}>
                                    <Button className={classes.hoverButton} onClick={e=>{this.handleClickTemplate('new')}}
                                            disableRipple>적용하기</Button>
                                    <Button className={clsx(classes.hoverButton, classes.hoverButton2)}
                                            disableRipple>미리보기</Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box display='flex' justifyContent='center' alignItems='center' className={classes.bottomBox}>
                            <Box className={classes.textBox}>
                                <AddIcon/>
                                <Typography className={classes.textStyle}>맞춤형 템플릿 만들기</Typography>
                            </Box>

                        </Box>
                    </Box>

                    {(tabIndex && tabIndex === 1 || tabIndex === 0) &&
                        <SystemTemplate/>
                    }

                    {(tabIndex && tabIndex === 2 || tabIndex === 0) &&
                        templates.filter(template => template.type === "Private").map((template, index) => {
                            return (
                                <Box key={`${template.name}_${index}`} className={classes.templateBox}>
                                    <Box className={clsx(classes.imageBox, classes.imageBoxHover)}>
                                        <Box className={classes.imageBoxIn}>
                                            <img src={ScreenShotTestImage} alt={'스크린샷 이미지'}/>
                                        </Box>


                                        <Box className='hover-button-box'>
                                            <Box className={classes.hoverBox}>
                                                <Button className={classes.hoverButton} onClick={() => this.handleClickTemplate(template.id)}
                                                        disableRipple>적용하기</Button>
                                                <Button className={clsx(classes.hoverButton, classes.hoverButton2)}
                                                        disableRipple>미리보기</Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className={classes.bottomBox}>
                                        <Box className={classes.AddTextBox}>
                                            <Typography className={classes.textStyle}>{template.name}</Typography>
                                            <Typography className={classes.dateTextStyle}>{template.createdDatetime}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })
                    }
                </Box>
            </Box>
        );
    }
};

export default withRouter(
    withStyles(styles)(
        inject('authStore', 'templateStore')(
            observer(ChooseTemplate)
        )
    )
);

