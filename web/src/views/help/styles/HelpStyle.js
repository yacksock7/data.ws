export const styles = (theme) => ({
    root:{
        marginTop: 70,
        minHeight: 'calc(100vh - 70px)',
        padding: '30px 36px 50px 44px',
        boxSizing: 'border-box',
        background: '#fff',
        position:'relative'
    },
    blurBox:{
        width: 'calc(100% - 36px - 44px)',
        height: 865,
        position: 'absolute',
        top: 100,
        background:'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(3px)',
        zIndex: 100,
        display:'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        '& p':{
            fontSize: '2rem',
            letterSpacing:'-0.5px',
            color:'#39007a',
            fontWeight:'bold',
            textAlign:'center',
            lineHeight: 1.8
        }
    },
    titleText:{
        '&.MuiTypography-root': {
            fontSize: '2rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            marginBottom: 40
        }
    },
    formControl:{
        '&.MuiFormControl-root ':{
            margin: '0 20px 0 0'
        },
        '& .MuiSelect-select':{
            minWidth: 180,
            height: '46px !important',
            padding: '0 25px 0 11px !important',
            fontSize: '1.125rem',
            boxSizing:'border-box',
            color:'#323232',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            display:'flex',
            alignItems: 'center',
            background: '#fff',
            border: 'solid 1px rgba(50, 50, 50, 0.8)',
            borderRadius: '6px !important',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiSelect-select':{
            border: '2px solid rgba(117, 0, 250, 0.4)',
        },
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border: 0,
        },
    },
    formControl2:{
        '&.MuiFormControl-root ':{
            margin: '36px 0 12px 0'
        },
        '& .MuiSelect-select':{
            minWidth: 130,
            height: '40px !important',
            fontSize: '1rem',
            color:'#7500fa',
            border: '1px solid rgba(117, 0, 250, 0.8)',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiSelect-select':{
            border: '1px solid rgba(117, 0, 250, 0.8)',
        },
        '& svg':{
            '& path':{
                stroke: '#7500fa'
            }
        }
    },
    formControl3:{
        '&.MuiFormControl-root ':{
            margin: '90px 0 14px 0'
        },
        '& .MuiSelect-select':{
            minWidth: 90,
            height: '32px !important',
            fontSize: '0.875rem',
            borderRadius: '4px !important',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiSelect-select':{
            border: 'solid 1px rgba(50, 50, 50, 0.8)',
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
        '& .MuiMenuItem-root':{
            width: '100%',
            display: 'flex',
            fontSize: '1.125rem',
            color:'#323232',
            boxSizing: 'border-box',
            '&:hover':{
                background: '#eee !important'
            },
            '&.Mui-selected':{
                background: '#eee'
            },
        }
    },
    selectPopover2:{
        '& .MuiMenuItem-root':{
            fontSize: '1rem',
        }
    },
    selectPopover3:{
        '& .MuiMenuItem-root':{
            fontSize: '0.875rem',
        }
    },
    formStyle:{
        width: 350,
        '& .MuiInputBase-root':{
            height: 46,
            background: '#fff !important',
            border: 'solid 1px rgba(50, 50, 50, 0.8)',
            borderRadius: 6,
            boxSizing:'border-box',
            paddingLeft: 10,
            paddingRight: 13,
            '&.Mui-focused':{
                border: '2px solid rgba(117, 0, 250, 0.6)',
            },
            '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':{
                transition: 'background-color 5000s',
            }
        },
        '& input':{
            width: 'calc(100% - 20px - 8px)',
            fontSize: '1.125rem',
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
    checkBox:{
        '&.MuiFormControlLabel-root':{
            margin:'0 0 0 30px'
        },
        '& .MuiButtonBase-root':{
            padding:0
        },
        '& .MuiTypography-root':{
            fontSize: '1.125rem',
            color: '#323232',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            marginLeft: 8
        },
        '& svg':{
            width: 16,
            height: 16
        }
    },
    bottomBox:{
        width: '100%',
        height: 339,
        background:'rgba(238, 238, 238, 0.4)',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center'
    },
    textStyle:{
        '&.MuiTypography-root': {
            fontSize: '2rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            lineHeight:1
        }
    },
    subText:{
        '&.MuiTypography-root': {
            fontSize: '1.5rem',
            color: '#000',
            letterSpacing: '-0.5px',
            lineHeight:1,
            marginTop: 13,
            marginBottom: 30
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root': {
            width: 191,
            height: 54,
            padding: 0,
            boxSizing: 'border-box',
            borderRadius: 6,
            background: '#7500fa',
            fontSize: '1.125rem',
            color:'#fff',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            '&:hover':{
                background: '#9d4bfb'
            }
        }
    }
});