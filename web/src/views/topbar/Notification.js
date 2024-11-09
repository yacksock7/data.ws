import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/NotificationStyle";
import {Box, Drawer, IconButton, MenuItem, MenuList, Popover, Typography} from "@mui/material";
import {ReactComponent as MoreTextClose} from '../../common/images/MoreTextClose.svg';
import {ReactComponent as FilterIcon2} from '../../common/images/FilterIcon2.svg';
import clsx from "clsx";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl:null,
            contentsList:[
                {
                    notification: true,
                    new: false,
                    title: '시스템 점검 안내',
                    text: '보다 안정화된 서비스 제공을 위해 시스템 점검을 진행 중입니다. 보다 안정화된 서비스 제공을 위해 시스템 점검을 진행 중입니다.',
                    date: '2023년 6월 14일 오후 2:30'
                },
                {
                    notification: false,
                    new: true,
                    title: '’{작업명}’ 작업 배정됨',
                    text: '{작업명} 작업 > {단계명} 단계에 작업이 배정되었습니다. 눌러서 바로 확인해보세요.',
                    date: '2023년 6월 14일 오후 2:30'
                },
            ]
        };
    }

    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    render() {
        const { classes, drawer, toggleDrawer, handleClickNotificationDialog } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <Drawer anchor="right" open={drawer} className={classes.drawerBox} onClose={toggleDrawer(false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={toggleDrawer(false)}
                >
                    <Box className={classes.topBox}>
                        <Typography>공지/알림</Typography>
                        <IconButton className={classes.iconButton} onClick={toggleDrawer(false)} disableRipple>
                            <MoreTextClose/>
                        </IconButton>
                    </Box>
                    <Box className={classes.filterBox}>
                        <IconButton className={classes.iconButton} onClick={this.handleClick} disableRipple>
                            <FilterIcon2/>
                        </IconButton>
                    </Box>

                    {this.state.contentsList.map((list, i) => (
                        <Box
                            key={`content-list-${i}`}
                            onClick={handleClickNotificationDialog}
                            className={classes.contentsBox}
                            style={list.new ? {background:'#eee'} : {cursor:'pointer'}}
                        >
                            <Box className={classes.contentsInBox} style={list.new ? {padding: '15px 5px 15px 13px'} : {padding: '10px 5px 15px'}}>
                                {list.notification &&
                                    <Box className={classes.chipBox}>
                                        <Typography>공지</Typography>
                                    </Box>
                                }

                                <Box display='flex'>
                                    {list.new &&
                                        <Box className={classes.newBox} />
                                    }

                                    <Typography className={list.new ? clsx(classes.titleText, classes.titleText2) : classes.titleText}>
                                        {list.title}
                                    </Typography>
                                </Box>

                                <Typography className={classes.textStyle}>
                                    {list.notification ?
                                        <span>
                                            {list.text.slice(0, 35)}
                                            {list.text.length > 35 &&
                                                '...더보기'
                                            }
                                        </span>

                                        :
                                        list.text
                                    }
                                </Typography>
                                <Typography className={classes.dateText}>{list.date}</Typography>
                            </Box>

                        </Box>
                    ))}

                    <Popover
                        id="simple-popper"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        className={classes.popoverBox}
                    >
                        <MenuList>
                            <MenuItem disableRipple>
                                날짜순
                            </MenuItem>
                            <MenuItem disableRipple>
                                안 읽은 순
                            </MenuItem>
                        </MenuList>
                    </Popover>
                </div>
            </Drawer>
        );
    }
}

export default withStyles(styles)(Notification);

