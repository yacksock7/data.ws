export const styles = (theme) => ({
    root:{

    },
    textStyle:{
        '&.MuiTypography-root': {
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 600,
            marginTop: 20
        }
    },
    emailText:{
        '&.MuiTypography-root': {
            fontSize: '1.125rem',
            color: 'rgba(50 ,50 ,50, 0.6)',
            letterSpacing: '-0.5px',
            margin: '7.5px 5px 0'
        }
    },
    textField:{
        '&.MuiFormControl-root':{
            margin: '7.5px 0 0'
        },
        '& .MuiInputBase-root':{
            width: 384,
            height: 54,
            borderRadius: 6,
            boxSizing: 'border-box',
            paddingLeft: 11,
            paddingRight: 11,
            '@media all and (max-width: 800px)': {
                width: '100%',
            },
            '& input':{
                padding: '8px 13px 8px 5px',
                fontSize: '1.125rem',
                letterSpacing: '-0.5px',
                color: '#323232',
                '&::placeholder':{
                    opacity: 1,
                    color: 'rgba(50, 50, 50, 0.6)'
                }
            },
        },
        '& .MuiOutlinedInput-notchedOutline':{
            border: '1px solid rgba(50, 50, 50, 0.8)'
        },
        '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':{
            border: '2px solid rgba(117, 0, 250, 0.4)'
        },
        '& .MuiInputBase-root.Mui-error .MuiOutlinedInput-notchedOutline':{
            border: '1px solid #d91e50'
        },
    },
    textFieldEmail:{
        '& .MuiInputBase-root':{
            width: 180,
            '@media all and (max-width: 414px)': {
                width: 190,
            },
            '@media all and (max-width: 360px)': {
                width: 155,
            },
        }
    },
    textFieldName:{
        '& .MuiInputBase-root':{
            width: 274,
            '@media all and (max-width: 800px)': {
                width: '100%',
            },
        }
    },
    formControl:{
        '&.MuiFormControl-root ':{
            margin: '7.5px 0 0'
        },
        '& .MuiSelect-select':{
            width: 180,
            height: 54,
            padding: '14px 25px 15px 12px !important',
            fontSize: '1.125rem',
            boxSizing:'border-box',
            color:'#777',
            letterSpacing: '-0.5px',
            display:'flex',
            alignItems: 'center',
            background: '#fff',
            border: 'solid 1px rgba(50, 50, 50, 0.8)',
            borderRadius: '6px !important',
            '@media all and (max-width: 800px)': {
                width: '100%',
            },
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiSelect-select':{
            border: '2px solid rgba(117, 0, 250, 0.4)',
            padding: '13px 25px 14px 12px !important',
        },
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border: 0,
            borderRadius: 6,
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
    iconButton:{
        '&.MuiButtonBase-root':{
            padding:0,
            '&:hover':{
                background: 'transparent'
            }
        }
    },
    infoMargin:{
        margin: '14px 0'
    },
    checkInfoTextBox:{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 3,
        '& p':{
            fontSize: '0.875rem',
            color: 'rgba(50, 50, 50, 0.6)',
            letterSpacing: '-0.5px',
            marginLeft: 5,
            '@media all and (max-width: 800px)': {
                fontSize: '0.75rem',
            },
        }
    },
    checkInfoTextBoxError:{
        '& p':{
            color: '#D91E50',
        },
        '& g':{
            opacity: 1,
            stroke: "#D91E50"
        }
    },
    checkInfoTextBoxChecked:{
        '& p':{
            color: '#39007a',
        },
        '& g':{
            opacity: 1,
            stroke: "#39007a"
        }
    },
    lineStyle:{
        width: '100%',
        height: 1,
        background: '#777',
        opacity: 0.6,
        marginBottom: 15,
        marginTop: 29
    },
    nameButton:{
        '&.MuiButtonBase-root':{
            width: 98,
            height:54,
            boxSizing: 'border-box',
            border: '1px solid #7500fa',
            background: '#fff',
            borderRadius: 6,
            padding:0,
            fontSize: '1.125rem',
            color: '#7500fa',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            marginLeft: 12,
            marginTop: 7.5,
            '&:hover': {
                background: 'rgba(117, 0, 250, 0.1)',
                border: '1px solid #7500fa',
            },
            '&.Mui-disabled': {
                color: '#777',
                border: '1px solid #777',
                background: '#fff'
            }
        }
    },
    formGroupBox:{
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'column'
    },
    checkBox:{
        '&.MuiFormControlLabel-root':{
            margin:'0 0 10px'
        },
        '& .MuiButtonBase-root':{
            padding:0
        },
        '& .MuiTypography-root':{
            fontSize: '0.875rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            marginLeft: 8
        },
        '& svg':{
            width: 20,
            height: 20
        }
    },
    checkBoxAll:{
        '&.MuiFormControlLabel-root':{
            margin:'0 0 8px'
        },
        '& .MuiTypography-root':{
            fontSize: '1.125rem',
            fontWeight: 'bold'
        },
    },
    textColor:{
        color: 'rgba(50, 50, 50, 0.6)'
    },
    checkedColor:{
        '& g':{
            stroke: '#7500fa',
            opacity: 1
        }
    },
    viewButton:{
        '&.MuiButtonBase-root': {
            padding: 0,
            minWidth: 20,
            background: 'transparent',
            textDecoration: 'underline',
            color: '#39007a',
            fontSize: '0.875rem',
            letterSpacing: '-0.5px',
            fontWeight: 'normal',
            marginBottom: 10,
            '&:hover': {
                background: 'transparent',
                textDecoration: 'underline'
            }
        }
    },
    selectViewBtn:{
        '&.MuiButtonBase-root': {
            padding: 0,
            minWidth: 20,
            background: 'transparent',
            color: '#39007a',
            fontSize: '0.875rem',
            letterSpacing: '-0.5px',
            fontWeight: 'normal',
            '&:hover': {
                background: 'transparent',
            }
        }
    }
});