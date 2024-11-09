import {drawerCloseWidth, drawerOpenWidth} from "../../../App";

export const styles = (theme) => ({
    root:{

    },
    rootHidden:{
        display: 'none'
    },
    drawer:{
        '&.MuiPaper-root': {
            width: drawerOpenWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            background: '#39007a !important',
            borderRight: 0
        }
    },
    drawerOpen: {
        '&.MuiPaper-root': {
            width: drawerOpenWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }
    },
    drawerClose: {
        '&.MuiPaper-root': {
            width: drawerCloseWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
        }
    },
    toolbar:{
        height: 70,
        borderBottom: '1px solid rgba(238, 238, 238, 0.3)',
        display: 'flex',
        justifyContent:'space-between',
        alignItems:'center',
        boxSizing: 'border-box',
        padding: '0 7px 0 24px'
    },
    toolbarClose:{
        justifyContent: 'center',
        padding:0
    },
    iconButton:{
        '&.MuiButtonBase-root':{
            padding: 0,
            '&:hover':{
                background: 'transparent'
            },
            '&.Mui-disabled': {
                '& rect':{
                    fill: '#777',
                },
                '& path':{
                    fill: '#eee'
                }
            }
        },
    },
    listBox:{
        '& .MuiListItem-root':{
            padding: '0 24px',
            boxSizing: 'border-box',
            height: 60,
            cursor:'pointer',
            '&:hover':{
                background: 'rgba(120, 116, 134, 0.3)',
                '& svg':{
                    opacity: 1
                },
            },
            '&:first-child':{
                '& svg':{
                    opacity: '1 !important'
                }
            },
        },
        '& .MuiListItemIcon-root':{
            minWidth:30,
            '& svg':{
                opacity: 0.6
            },
        },
        '& .MuiListItemText-root':{
            '& span':{
                fontSize: '1rem',
                color:'#fff',
                letterSpacing: '-0.5px',
                fontWeight: 500,
            }
        }
    },
    listBoxOpen:{
        '& .MuiListItem-root':{
            padding: '0 21px',
            '&:first-child':{
                padding: '0 18px',
            }
        },
        '& .MuiListItemIcon-root':{
            minWidth: 42,
        },
    },
    listBoxSelect:{
        background: 'rgba(120, 116, 134, 0.3)',
        '& svg':{
            opacity: '1 !important'
        },
    },
    upgradeBox:{
        width: '100%',
        paddingTop: 30,
        borderTop: '1px solid rgba(238, 238, 238, 0.3)',
        display: 'flex',
        justifyContent:'center',
        '& button:hover':{
            '& rect':{
                fill:'#9d4bfb'
            }
        }
    },
    upgradeButton:{
        '&.MuiButtonBase-root': {
            width: 190,
            height: 40,
            padding: 0,
            boxSizing: 'border-box',
            borderRadius: 6,
            background: '#7500fa',
            fontSize: '0.938rem',
            color: '#fff',
            letterSpacing: '-0.5px',
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
                background: '#9d4bfb',
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    },
    underline:{
        textDecoration: 'none'
    }
});