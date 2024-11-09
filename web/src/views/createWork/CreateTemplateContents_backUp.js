import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/CreateTemplateContentsStyle";
import {Box, FormControl, IconButton, MenuItem, MenuList, Popover, Select, Tooltip, Typography} from "@mui/material";
import {ReactComponent as UploadIcon} from "../../common/images/UploadIcon.svg";
import clsx from "clsx";
import {ReactComponent as ExtractionIcon} from "../../common/images/ExtractionIcon.svg";
import {ReactComponent as TranslationIcon} from "../../common/images/TranslationIcon.svg";
import {ReactComponent as CorrectionIcon} from "../../common/images/CorrectionIcon.svg";
import {ReactComponent as InspectionIcon} from "../../common/images/InspectionIcon.svg";
import {ReactComponent as MoreIcon} from "../../common/images/MoreIcon.svg";
import {ReactComponent as ZoomInIcon} from "../../common/images/ZoomInIcon.svg";
import {ReactComponent as ZoomOutIcon} from "../../common/images/ZoomOutIcon.svg";
import {ReactComponent as TypeIcon} from "../../common/images/TypeIcon.svg";
import {ReactComponent as ArrowDownIcon} from "../../common/images/ArrowDownIcon.svg";
import {ReactComponent as LockIcon} from "../../common/images/LockIcon.svg";
import {ReactComponent as LanguageArrowIcon} from "../../common/images/LanguageArrowIcon.svg";
import GoogleLogo from "../../common/images/GoogleLogo.png";
import PapagoLogo from "../../common/images/PapagoLogo.png";
import KakaoLogo from "../../common/images/KakaoLogo.png";


class CreateTemplateContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            translationFilter: 0,
            startLanguageFilter: 1,
            endLanguageFilter: 1
        };
    }

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    handleChangeTranslationFilter = event => {
        this.setState({translationFilter: event.target.value});
    };

    handleChangeStartLanguageFilter = event => {
        this.setState({startLanguageFilter: event.target.value});
    };

    handleChangeEndLanguageFilter = event => {
        this.setState({endLanguageFilter: event.target.value});
    };

    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <Box className={classes.root}>

                <Box display='flex' justifyContent='center' alignItems='center'>
                    {/* 기본 default */}
                    {/*<Box className={classes.defaultBox}>*/}
                    {/*    <Box className={clsx(classes.cardBox, classes.cardBoxAfter)}>*/}
                    {/*        <Box className={classes.cardBoxIn}>*/}
                    {/*            <Box className={clsx(classes.lineColor, classes.lineColorBlue)}/>*/}
                    {/*            <Box className={classes.boxIn}>*/}
                    {/*                <UploadIcon/>*/}
                    {/*                <Box className={classes.lineStyle}/>*/}
                    {/*                <Typography className={classes.boxText}>업로드</Typography>*/}
                    {/*            </Box>*/}
                    {/*        </Box>*/}
                    {/*    </Box>*/}

                    {/*    <Box className={classes.lineStyle2}/>*/}

                    {/*    <Box className={classes.addBox}>*/}
                    {/*        <Typography>작업 유형 추가</Typography>*/}
                    {/*    </Box>*/}

                    {/*    <Box className={classes.lineStyle2}/>*/}

                    {/*    <Box className={clsx(classes.cardBox, classes.cardBoxAfter)}>*/}
                    {/*        <Box className={classes.cardBoxIn}>*/}
                    {/*            <Box className={clsx(classes.lineColor, classes.lineColorPurple)}/>*/}
                    {/*            <Box className={classes.boxIn}>*/}
                    {/*                <ExtractionIcon/>*/}
                    {/*                <Box className={classes.lineStyle}/>*/}
                    {/*                <Typography className={classes.boxText}>추출</Typography>*/}
                    {/*            </Box>*/}
                    {/*        </Box>*/}
                    {/*    </Box>*/}

                    {/*    <Box className={classes.lineStyle2} style={{height: 50}}/>*/}

                    {/*    <Box className={classes.endBox}>*/}
                    {/*        <ExtractionIcon/>*/}
                    {/*        <Typography>작업 종료</Typography>*/}
                    {/*    </Box>*/}
                    {/*</Box>*/}

                    {/* 5가지 유형 */}
                    <Box className={classes.defaultBox}>
                        <Box className={clsx(classes.cardBox, classes.cardBoxAfter)}>
                            <Box className={classes.cardBoxIn}>
                                <Box className={clsx(classes.lineColor, classes.lineColorBlue)}/>
                                <Box className={classes.boxIn}>
                                    <UploadIcon/>
                                    <Box className={classes.lineStyle}/>
                                    <Typography className={classes.boxText}>업로드</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box className={classes.lineStyle2}/>

                        <Box>
                            <Box className={classes.cardBox}>
                                <Box className={classes.cardBoxIn}>
                                    <Box className={clsx(classes.lineColor, classes.lineColorYellow)}/>
                                    <Box className={classes.boxIn}>
                                        <TranslationIcon/>
                                        <Box className={classes.lineStyle}/>
                                        <Typography className={classes.boxText}>번역</Typography>
                                    </Box>
                                </Box>
                                <IconButton className={clsx(classes.iconButton, classes.iconMargin)}
                                            onClick={this.handleClick} disableRipple>
                                    <MoreIcon/>
                                </IconButton>
                            </Box>

                            <Box className={classes.optionBox}>
                                <Box className={classes.displayFlex}>
                                    <TypeIcon/>
                                    <Typography className={classes.translationText}>종류</Typography>
                                    <FormControl variant="outlined"
                                                 className={this.state.translationFilter === 0 ? classes.formControl : clsx(classes.formControl, classes.formControlColor)}>
                                        <Select
                                            id="filter"
                                            value={this.state.translationFilter}
                                            onChange={this.handleChangeTranslationFilter}
                                            IconComponent={(props) => (
                                                <ArrowDownIcon  {...props} />
                                            )}
                                            MenuProps={{
                                                anchorOrigin: {
                                                    vertical: "bottom",
                                                    horizontal: "left"
                                                },
                                                transformOrigin: {
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                },
                                                // getContentAnchorEl: null,
                                                className: classes.selectPopover
                                            }}
                                        >
                                            <MenuItem value={0}>번역기 선택</MenuItem>
                                            <MenuItem value={2}>
                                                <img src={GoogleLogo} alt='구글 로고'/>
                                            </MenuItem>

                                            <MenuItem component='button' disabled={true}>
                                                <img src={PapagoLogo} alt='파파고 로고'/>
                                                <Tooltip
                                                    title="현재는 사용할수 없는 번역기 입니다."
                                                    placement="bottom"
                                                    classes={{
                                                        tooltip: classes.lightTooltip,
                                                    }}
                                                >
                                                    <LockIcon/>
                                                </Tooltip>
                                            </MenuItem>
                                            <MenuItem component='button' disabled={true}>
                                                <img src={KakaoLogo} alt='파파고 로고'/>
                                                <Tooltip
                                                    title="현재는 사용할수 없는 번역기 입니다."
                                                    placement="bottom"
                                                    classes={{
                                                        tooltip: classes.lightTooltip,
                                                    }}
                                                >
                                                    <LockIcon/>
                                                </Tooltip>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box className={clsx(classes.displayFlex, classes.marginTop)}>
                                    <FormControl variant="outlined" className={classes.formControlLanguage}>
                                        <Select
                                            id="filter"
                                            value={this.state.startLanguageFilter}
                                            onChange={this.handleChangeStartLanguageFilter}
                                            IconComponent={(props) => (
                                                <Box>
                                                    <ArrowDownIcon  {...props} />
                                                </Box>
                                            )}
                                            MenuProps={{
                                                anchorOrigin: {
                                                    vertical: "bottom",
                                                    horizontal: "left"
                                                },
                                                transformOrigin: {
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                },
                                                // getContentAnchorEl: null,
                                                className: classes.selectPopover
                                            }}
                                        >
                                            <MenuItem value={1}>
                                                출발어
                                            </MenuItem>
                                            <MenuItem value={2}>한국어</MenuItem>
                                            <MenuItem value={3}>영어</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <Box display='flex' alignItems='center' justifyContent='center'
                                         style={{margin: '0 8px'}}>
                                        <LanguageArrowIcon/>
                                    </Box>

                                    <FormControl variant="outlined" className={classes.formControlLanguage}>
                                        <Select
                                            id="filter"
                                            value={this.state.endLanguageFilter}
                                            onChange={this.handleChangeEndLanguageFilter}
                                            IconComponent={(props) => (
                                                <Box>
                                                    <ArrowDownIcon  {...props} />
                                                </Box>
                                            )}
                                            MenuProps={{
                                                anchorOrigin: {
                                                    vertical: "bottom",
                                                    horizontal: "left"
                                                },
                                                transformOrigin: {
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                },
                                                // getContentAnchorEl: null,
                                                className: classes.selectPopover
                                            }}
                                        >
                                            <MenuItem value={1}>
                                                도착어
                                            </MenuItem>
                                            <MenuItem value={2}>한국어</MenuItem>
                                            <MenuItem value={3}>영어</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>

                        <Box className={classes.lineStyle2}/>

                        <Box className={classes.cardBox}>
                            <Box className={classes.cardBoxIn}>
                                <Box className={clsx(classes.lineColor, classes.lineColorNavy)}/>
                                <Box className={classes.boxIn}>
                                    <CorrectionIcon/>
                                    <Box className={classes.lineStyle}/>
                                    <Typography className={classes.boxText}>교정</Typography>
                                </Box>
                            </Box>
                            <IconButton className={clsx(classes.iconButton, classes.iconMargin)}
                                        onClick={this.handleClick} disableRipple>
                                <MoreIcon/>
                            </IconButton>
                        </Box>

                        <Box className={classes.lineStyle2}/>

                        <Box className={classes.cardBox}>
                            <Box className={classes.cardBoxIn}>
                                <Box className={clsx(classes.lineColor, classes.lineColorOrange)}/>
                                <Box className={classes.boxIn}>
                                    <InspectionIcon/>
                                    <Box className={classes.lineStyle}/>
                                    <Typography className={classes.boxText}>검수</Typography>
                                </Box>
                            </Box>
                            <IconButton className={clsx(classes.iconButton, classes.iconMargin)}
                                        onClick={this.handleClick} disableRipple>
                                <MoreIcon/>
                            </IconButton>
                        </Box>


                        <Box className={classes.lineStyle2}/>

                        <Box className={clsx(classes.cardBox, classes.cardBoxAfter)}>
                            <Box className={classes.cardBoxIn}>
                                <Box className={clsx(classes.lineColor, classes.lineColorPurple)}/>
                                <Box className={classes.boxIn}>
                                    <ExtractionIcon/>
                                    <Box className={classes.lineStyle}/>
                                    <Typography className={classes.boxText}>추출</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box className={classes.lineStyle2} style={{height: 50}}/>

                        <Box className={classes.endBox}>
                            <ExtractionIcon/>
                            <Typography>작업 종료</Typography>
                        </Box>
                    </Box>

                    <Popover
                        id="simple-popper"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        className={classes.popoverBox}
                    >
                        <MenuList>
                            <MenuItem>삭제</MenuItem>
                        </MenuList>
                    </Popover>

                    <Box className={classes.zoomInZoomOutBox}>
                        <IconButton className={classes.iconButton} disableRipple><ZoomInIcon/></IconButton>
                        <IconButton className={classes.iconButton} disableRipple><ZoomOutIcon/></IconButton>
                    </Box>
                </Box>
            </Box>
        );
    }
};

export default withStyles(styles)(CreateTemplateContents);