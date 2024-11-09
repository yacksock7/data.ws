import {drawerCloseWidth, drawerOpenWidth} from "../../../App";

export const styles = (theme) => ({
    root:{

    },
    rootHidden:{
        display: 'none'
    },
    appBar:{
        '&.MuiPaper-root':{
            background: '#fff !important',
            marginLeft: drawerCloseWidth ,
            width: `calc(100% - ${drawerCloseWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
        },
    },
    appBarOpen:{
        '&.MuiPaper-root':{
            marginLeft: drawerOpenWidth,
            width: `calc(100% - ${drawerOpenWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }
    },
    toolbar:{
        padding: '10px 20px',
        height: 70,
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    logoBox:{
        marginRight: 32,
        cursor: 'pointer',
        '& svg': {
            width: '140px'
        }
        // '& path':{
        //     fill:'#39007a'
        // }
    },
    titleText:{
        '&.MuiTypography-root': {
            fontSize: '1.5rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 'bold'
        }
    },
    rightBox:{
        display: 'flex',
        alignItems: 'center'
    },
    displayFlex:{
        display: 'flex',
        alignItems: 'center',
    },
    formStyle:{
        width: 450,
        '& .MuiInputBase-root':{
            height: 46,
            background: '#eee !important',
            border: '2px solid #eeeeee',
            borderRadius: 6,
            boxSizing:'border-box',
            paddingLeft: 10,
            paddingRight: 13,
            '&.Mui-focused':{
                border: '2px solid rgba(117, 0, 250, 0.6)',
                // '& button':{
                //     display: 'block',
                // }
            },
            // '& button':{
            //     display: 'none',
            // },
            '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':{
                transition: 'background-color 5000s',
            }
        },
        '& input':{
            width: 'calc(100% - 20px - 8px - 20px)',
            fontSize: '1rem',
            color: '#323232',
            fontWeight: 500,
            padding: 0,
            letterSpacing: '-0.5px',
            marginLeft: 8,
            '&::placeholder':{
                color: 'rgba(50, 50, 50, 0.6)',
                opacity:1
            }
        },
        '& .MuiIconButton-root':{
            padding:0,
            marginLeft: 5,
            '&:hover':{
                background:'transparent'
            }
        },
        '& .MuiInputBase-root:before, .MuiInputBase-root:after':{
            display:'none'
        },
    },
    iconButton:{
        '&.MuiButtonBase-root':{
            padding: 0,
            '&:hover':{
                background: 'transparent'
            }
        }
    },
    iconMargin:{
        marginLeft : "600px",
        '&.MuiButtonBase-root':{
            margin: '0 60px 0 30px'
        }
    },
    buttonStyle:{
        background: 'transparent',
        display: 'flex',
        alignItems:'center',
        cursor:'pointer'
    },
    nameText:{
        '&.MuiTypography-root':{
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            lineHeight: 1.3,
            fontWeight: 500,
            textAlign: 'right',
        }
    },
    textStyle: {
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            color: 'rgba(50, 50, 50, 0.6)',
            letterSpacing: '-0.5px',
            lineHeight: 1.3,
            textAlign: 'right',
        }
    },
    imgBox:{
        position:'relative',
        width: 50,
        height: 50,
        boxSizing:'border-box',
        border:'solid 1px rgba(50, 50, 50, 0.3)',
        borderRadius: 18,
        margin: '0 6px 0 10px',
        // overflow:'hidden',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        '& img':{
            maxWidth: '100%',
            width: '100%',
        }
    },
    imgBoxState:{
        position:'absolute',
        right:-1,
        bottom:-4,
        display:'block',
        width:12,
        height:12,
        background:'#00C880',
        borderRadius:12,
        border:'1px solid #fff',
        boxSizing:'border-box',
    },
    selectBox:{
        '& .MuiSelect-select':{
            fontSize:'0.75rem',
            padding:0,
        },
        '& fieldset':{
            border:'0 none',
        }
    },
    selectPopover:{
        '& .MuiPaper-root':{
            boxSizing:'border-box',
        },
        '& .MuiMenuItem-root':{
            width: '100%',
            display: 'flex',
            fontSize: '0.75rem',
            color:'#777',
            fontWeight: 'bold',
            boxSizing: 'border-box',
            '& span':{
                marginLeft: 3
            },
            '&:hover':{
                background: '#eee !important'
            },
            '&.Mui-selected':{
                background: '#eee'
            },
        }
    },
    userBox:{
        width:300,
        // height:150,
        boxSizing:'border-box',
        '& *': {
            fontFamily: 'Pretendard !important',
        },
    },
    userInfoStyle:{
        display:'flex',
        alignItems:'center',
        padding:'24px 11px 14px 11px',
    },
    menuListStyle:{
        display:'flex',
        justifyContent:'space-around',
        // borderTop:'1px solid #ddd',
        padding:'0 0 18px 0',
        '& .MuiMenuItem-root':{
            fontSize:'0.875rem',
            color:'rgba(50, 50, 50, 0.6)',
            '&:hover':{
                backgroundColor : 'transparent'
            }
        },
    },
    menuBtnStyle:{
        '&.MuiButtonBase-root':{
            background: '#7500fa',
            borderRadius: 6,
            color: '#fff',
            fontWeight:'bold',
            letterSpacing: '-0.5px',
            '&:hover':{
                background: '#9d4bfb'
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    },
});