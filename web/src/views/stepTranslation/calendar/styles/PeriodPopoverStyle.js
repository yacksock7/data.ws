export const styles = (theme) => ({
    popoverBox:{
        '& *': {
            fontFamily: 'Pretendard !important',
        },
        '& .MuiBackdrop-root':{
            background: 'rgba(0, 0, 0, 0.5)'
        }
    },
    paper:{
        width: 942,
        boxShadow:'0 4px 7px 0 rgba(0, 0, 0, 0.4)',
        background: '#fff',
        borderRadius: 6,
        padding: '10px 15px 37px 15px',
        position: 'relative',
        zIndex: 500,
        display: 'flex',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
    },
    leftBox:{
        width: 609
    },
    rightBox:{
        width: 'calc(100% - 609px)'
    },
    iconButton:{
        '&.MuiButtonBase-root':{
            padding: 0,
            '&:hover':{
                background: 'transparent'
            }
        }
    },
    control:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        height: 530
    },
    titleText:{
        '&.MuiTypography-root':{
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            marginBottom: 20,
        }
    },
    typeBox:{
        marginLeft: 90
    },
    typeBoxIn:{
        display: 'flex',
        flexWrap:'wrap'
    },
    typeButton:{
        '&.MuiButtonBase-root': {
            minWidth: 36,
            height: 25,
            boxSizing: 'border-box',
            background: 'rgba(5, 108, 242, 0.4)',
            borderRadius: 3,
            color: '#fff',
            fontSize: '0.875rem',
            letterSpacing: '-0.5px',
            padding: '4px 6px',
            marginRight: 8,
            marginBottom: 10,
            '&:hover':{
                background: 'rgba(5, 108, 242, 0.4)',
            },
        }
    },
    typeBlack:{
        '&.MuiButtonBase-root': {
            background: 'rgba(50, 50 ,50 , 0.4)',
            '&:hover': {
                background: 'rgba(50, 50 ,50 , 0.4)',
            }
        }
    },
    typeYellow:{
        '&.MuiButtonBase-root': {
            background: 'rgba(242, 183 ,5, 0.4)',
            '&:hover': {
                background: 'rgba(242, 183 ,5, 0.4)',
            }
        }
    },
    typeIndigo:{
        '&.MuiButtonBase-root': {
            background: 'rgba(20, 12 ,242 , 0.4)',
            '&:hover': {
                background: 'rgba(20, 12 ,242 , 0.4)',
            }
        }
    },
    typePink:{
        '&.MuiButtonBase-root': {
            background: 'rgba(242, 94 ,61 , 0.4)',
            '&:hover': {
                background: 'rgba(242, 94 ,61 , 0.4)',
            }
        }
    },
    typePurple:{
        '&.MuiButtonBase-root': {
            background: 'rgba(93, 0 ,199 , 0.4)',
            '&:hover': {
                background: 'rgba(93, 0 ,199 , 0.4)',
            }
        }
    },
    typeBlackSelect:{
        '&.MuiButtonBase-root': {
            background: '#323232',
            outline: '2.5px solid rgba(117, 0, 250, 0.4)',
            '&:hover': {
                background: '#323232',
            }
        }
    },
    typeSelect:{
        '&.MuiButtonBase-root': {
            background: '#056cf2',
            outline: '2.5px solid rgba(117, 0, 250, 0.4)',
            '&:hover': {
                background: '#056cf2',
            }
        }
    },
    typeYellowSelect:{
        '&.MuiButtonBase-root': {
            background: '#f2b705',
            outline: '2.5px solid rgba(117, 0, 250, 0.4)',
            '&:hover': {
                background: '#f2b705',
            }
        }
    },
    typeIndigoSelect:{
        '&.MuiButtonBase-root': {
            background: '#140cf2',
            outline: '2.5px solid rgba(117, 0, 250, 0.4)',
            '&:hover': {
                background: '#140cf2',
            }
        }
    },
    typePinkSelect:{
        '&.MuiButtonBase-root': {
            background: '#f25e3d',
            outline: '2.5px solid rgba(117, 0, 250, 0.4)',
            '&:hover': {
                background: '#f25e3d',
            }
        }
    },
    typePurpleSelect:{
        '&.MuiButtonBase-root': {
            background: '#5d00c7',
            outline: '2.5px solid rgba(117, 0, 250, 0.4)',
            '&:hover': {
                background: '#5d00c7',
            }
        }
    },
    dateBox:{
        marginLeft: 90
    },
    formControl:{
        '& .MuiSelect-select':{
            padding: '4px 20px 4px 8px !important',
            fontSize: '1rem',
            width: 54,
            height:32,
            boxSizing:'border-box',
            color:'#323232',
            letterSpacing: '-0.5px',
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        '& input':{
            fontSize: '0.875rem',
            color:'#323232',
            letterSpacing: '-0.5px',
            textAlign: 'center'
        },
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border: 'solid 1px rgba(50, 50, 50, 0.3)',
            borderRadius: 4.9
        },
    },
    selectPopover:{
        '& .MuiPaper-root':{
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
            border: '1px solid #bbb',
            boxSizing:'border-box',
            '& *': {
                fontFamily: 'Pretendard !important',
            },
        },
        '& li':{
            fontSize: '1rem',
            color:'#323232',
            textAlign: 'center',
            '&:hover':{
                background: '#eee'
            },
            '&.Mui-selected':{
                background: '#eee'
            }
        }
    },
    textStyle:{
        '&.MuiTypography-root': {
            fontSize: '1.063rem',
            color: '#323232',
            letterSpacing: '-0.62px',
            marginLeft: 8,
            marginRight: 24
        }
    },
    checkBox:{
        '&.MuiFormControlLabel-root':{
            margin:'10px 35px 0 0'
        },
        '& .MuiButtonBase-root':{
            padding:0
        },
        '& .MuiTypography-root':{
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            marginLeft: 8
        },
        '& svg':{
            width: 18,
            height: 18
        }
    },
    controlBox:{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 40,
        marginRight: 25,
    },
    cancelButton:{
        '&.MuiButtonBase-root': {
            minWidth: 100,
            height: 40,
            boxSizing: 'border-box',
            padding: '0 25px',
            color: '#7500fa',
            fontSize: '0.938rem',
            fontWeight: 'bold',
            letterSpacing: '-0.42px',
            background: 'transparent',
            marginRight: 20,
            '&:hover':{
                background: 'transparent',
                color: '#9d4bfb'
            }
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root': {
            minWidth: 100,
            height: 40,
            borderRadius: 6,
            color: '#fff',
            fontSize: '0.938rem',
            fontWeight: 'bold',
            letterSpacing: '-0.42px',
            boxSizing: 'border-box',
            padding: '0 25px',
            background: '#7500fa',
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


