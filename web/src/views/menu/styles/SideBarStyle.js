import {drawerSideOpenWidth} from "../../../App";
import FilterIcon from "../../../common/images/FilterIcon.svg";
import SelectCalendarIcon from "../../../common/images/SelectCalendarIcon.svg";

export const styles = (theme) => ({
    root:{
    },
    drawer:{
        '&.MuiPaper-root':{
            width: drawerSideOpenWidth ,
            // height: 'calc(100vh - 70px)',
            marginTop: 70,
            marginLeft: 230,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            background: '#fff !important',
            borderRight: '0px !important',
            boxShadow:'2px 0 4px 0 rgba(0, 0, 0, 0.25)'
        }
    },
    drawerOpen: {
        '&.MuiPaper-root':{
            width: drawerSideOpenWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }
    },
    drawerOpen2:{
        '&.MuiPaper-root': {
            width: drawerSideOpenWidth,
            marginLeft: 60,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }
    },
    drawerClose: {
        '&.MuiPaper-root': {
            width: 0,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
        }
    },
    iconButton:{
        '&.MuiButtonBase-root': {
            padding: 0,
            '&:hover': {
                background: 'transparent'
            }
        }
    },
    drawerBoxIn:{
        padding: '22px 10px 0px',
        boxSizing: 'border-box'
    },
    topBox:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 23,
        '& p':{
            fontSize: '1rem',
            color: '#323232',
            fontWeight: 'bold'
        }
    },
    formStyle:{
        width: '100%',
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
    selectBox:{
        marginTop: 30,
        marginBottom: 21,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    emptyBox:{
        width: '100%',
        background: '#39007a',
        padding: '14px 15px 18px',
        boxSizing: 'border-box',
        borderRadius: 6,
        marginBottom: 11,
        '& p':{
            fontSize: '0.875rem',
            color: '#fff',
            letterSpacing: '-0.5px',
        }
    },
    templateButton:{
        '&.MuiButtonBase-root': {
            background: '#fff',
            borderRadius: 6,
            width: 150,
            height: 32,
            boxSizing: 'border-box',
            padding: 0,
            margin: '17px auto 0',
            display: 'block',
            fontSize: '0.75rem',
            color: '#39007a',
            fontWeight: 500,
            letterSpacing: '-0.41px',
            '&:hover': {
                background: '#fff'
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    },
    formControl:{
        '& .MuiSelect-select':{
            padding: '2px 25px 2px 6px !important',
            fontSize: '0.875rem',
            height:26,
            boxSizing:'border-box',
            color:'#323232',
            letterSpacing: '-0.5px',
            display:'flex',
            alignItems: 'center',
            '&:before':{
                content:"''",
                background: `url(${FilterIcon})`,
                backgroundRepeat:'no-Repeat',
                width: 16,
                height:16,
                display: 'block',
                marginRight: 8
            }
        },
        '& input':{
            fontSize: '0.875rem',
            color:'#323232',
            letterSpacing: '-0.5px'
        },
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border: 'solid 1px rgba(50, 50, 50, 0.3)',
            borderRadius: 4
        },
    },
    formControlIcon:{
        marginLeft: '10px !important',
        '& .MuiSelect-select':{
            '&:before':{
                background: `url(${SelectCalendarIcon})`,
            }
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
            fontSize: '0.875rem',
            color:'#323232',
            '&:hover':{
                background: '#eee'
            },
            '&.Mui-selected':{
                background: '#eee'
            }
        }
    },
    scrollBox:{
        height: 'calc(100vh - 265px)',
        overflow: 'auto',
        boxSizing: 'border-box',
        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#969696',
            borderRadius: '10px',
            backgroundClip: 'padding-box',
            border: '2px solid transparent',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
            marginTop: 5,
        },
    },



    selectBoxBtn: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'right',
        '& .MuiButtonBase-root': {
            width: 97,
            height: 30,
            border: '1px solid #e5e5e5',
            marginLeft: 10,
            '&:hover': {
                background: 'transparent',
            },
            '& .MuiTypography-root': {
                fontSize: '0.875rem',
                color: '#323232',
                marginRight: 3,
                marginLeft:3,
            }
        }
    },

    timeWrap: {
      position: 'fixed',
        left: 107,
        top: 245,
        background: '#fff',
        border: '1px solid #bbb',
        padding: '12px 15px',
        zIndex: 999,
        borderRadius: 6,

    },
    title: {
        '&.MuiTypography-root': {
            fontSize: '1.25rem',
            letterSpacing: '-0.5px',
            color: '#323232',
            marginBottom: '20px',
            '& span': {
                fontWeight: 700,
            }
        }

    },
    stepTitle: {
        '&.MuiTypography-root': {
            fontSize: '1rem',
            letterSpacing: '-0.5px',
            color: '#323232',
            marginTop: 15,
            marginBottom: 5,
            fontWeight: 700,
        }
    },

    timeSearch: {
        '& .MuiButtonBase-root': {
            width: 77,
            padding: '3px 0px',
        },
        '& .MuiTypography-root': {
            fontSize: '1rem',
            letterSpacing: '-0.5px',
        },
        '& .MuiToggleButton-root': {
          '&.Mui-selected': {
              background: '#7500fa',
              color: '#fff',
              '&:hover': {
                  background: '#7500fa',
                  color: '#fff',
              }
          },
            '&:hover': {
              background: '#7500fa',
                color: '#fff'
            }
        }
    },
    summitBtn: {
        textAlign: 'right',
        '& .MuiButtonBase-root': {
            width: 100,
            height: 40,
            background: '#7500fa',
            '&:hover': {
                background: '#7500fa',
            },
            '& .MuiTypography-root': {
                fontSize: '0.938rem',
                color: '#fff',
                fontWeight: 700,
            }
        }
    }
});