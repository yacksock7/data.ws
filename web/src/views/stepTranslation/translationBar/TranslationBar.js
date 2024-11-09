import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TranslationBarStyle";
import {Box, FormControl, MenuItem, Select, Typography} from "@mui/material";
import {ReactComponent as TranslationSelectIcon} from "../../../common/images/TranslationSelectIcon.svg";
import GoogleLogo from "../../../common/images/GoogleLogo.png";
import PapagoLogo from "../../../common/images/PapagoLogo.png";
import KakaoLogo from "../../../common/images/KakaoLogo.png";
import {ReactComponent as ArrowLanguage} from "../../../common/images/ArrowLanguage.svg";
import {inject, observer} from "mobx-react";
import {TemplateStepType} from "../../../stores/TemplateStore";
import {LangLabel} from "../../../stores/WorkStore";
import {LanguageType} from "../../../common/LanguageType";
import {MachineDetail} from "../../../common/MachineStepOptions";

class TranslationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 1,
        };
    }

    handleChangeFilter = event => {
        this.setState({ filter: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { selectedWork } = this.props.workStore;
        const options = JSON.parse(selectedWork.workTemplateSteps.find(step => step.type === TemplateStepType.Machine).options);

        return (
            <Box className={classes.displayFlex}>
                <Box className={classes.displayFlex}>
                    <Typography className={classes.buttonTextStyle}>번역기</Typography>
                    <FormControl className={classes.formControl}>
                        <Select
                            value={options.engine}
                            onChange={this.handleChangeFilter}
                            IconComponent={(props) => (
                                <Box>
                                    <TranslationSelectIcon  {...props} />
                                </Box>
                            )}
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "right"
                                },
                                transformOrigin:{
                                    vertical: 'top',
                                    horizontal: 'right',
                                },
                                // getContentAnchorEl: null,
                                className:classes.selectPopover
                            }}
                        >
                            { MachineDetail[options.machineType].engine.map( engine =>
                                <MenuItem value={engine.type}>
                                    <img src={engine.image} alt={engine.name}/>
                                    <span>{MachineDetail[options.machineType].label}</span>
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Box>
                <Box className={classes.displayFlex} style={{paddingRight: 30}}>
                    <Typography className={classes.languageText}>
                        {LanguageType[options.machineType][options.engine].find(item => item.type === options.sourceLang).name}
                    </Typography>
                    <Box className={classes.iconMargin}>
                        <ArrowLanguage/>
                    </Box>
                    <Typography className={classes.languageText}>
                        {LanguageType[options.machineType][options.engine].find(item => item.type === options.targetLang).name}
                    </Typography>
                </Box>
            </Box>
        );
    }
}


export default withStyles(styles) (
    inject('workStore') (
        observer(TranslationBar)
    )
);

