export const styles = (theme) => ({
    root:{
        marginLeft:180,
        maxWidth:1240,
        marginTop: 70,
        minHeight: 'calc(100vh - 70px)',
        padding: '30px 106px',
        boxSizing: 'border-box',
        '@media all and (max-width: 1300px)': {
            justifyContent: 'center'
        },
    },
    titleStyle:{
        '&.MuiTypography-root': {
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#323232',
            marginBottom:40,
        }
    },
    subtitleStyle: {
        '&.MuiTypography-root': {
            fontSize: '0.938rem',
            fontWeight: 600,
            color: '#323232',
            marginBottom: 10,
        }
    },
    content:{
        display:'flex',
    },
    profileImgBox:{
        width:'320px',
        display:'flex',
        flexDirection:'column',
        justifyContent : 'flex-start',
        alignItems:'center',
    },
    avatar:{
        display:'flex',
        alignItems:'center',
        justifyContent : 'center',
        width:155,
        height:155,
        overflow : 'hidden',
        borderRadius:42,
        border:'1px solid #C2C2C2',
        '& > img':{
            width:'100%',
        }
    },
    buttonTinyStyle:{
        '&.MuiButton-root':{
            color:'#7500fa',
            textDecoration:'underline',
          '&:hover':{
              background : 'transparent',
              textDecoration:'underline',
          }
        },
    },
    boxStyle:{
        marginTop:60,
    },
    dlStyle:{
        display:'flex',
        alignItems : 'center',
        color:'#323232',
        margin:'1.75rem 0',
    },
    labelStyle:{
        '&.MuiTypography-root': {
        minWidth:120,
        fontSize:'1.125rem',
        fontWeight:'600',
        }
    },
    requiredStyle:{
      '&:after':{
          content:'"*"',
          color:'red',
      }
    },
    textField:{
        '&.MuiFormControl-root':{
            margin: '7.5px 0 0'
        },
        '& .MuiInputBase-root':{
            width: 385,
            height: 54,
            borderRadius: 6,
            boxSizing: 'border-box',
            paddingLeft: 11,
            paddingRight: 11,
            '& input':{
                padding: '8px 13px 8px 0',
                fontSize: '1.125rem',
                letterSpacing: '-0.5px',
                color: '#323232',
                '&::placeholder':{
                    opacity: 1,
                    color: 'rgba(50, 50, 50, 0.6)'
                }
            },
            '@media all and (max-width: 800px)': {
                width: '298px',
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
    textFieldBirth:{
        '& .MuiInputBase-root':{
            width: 120,
            marginRight:12,
            '@media all and (max-width: 414px)': {
                width: 130,
            },
            '@media all and (max-width: 360px)': {
                width: 80,
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
    emailText:{
        '&.MuiTypography-root': {
            fontSize: '1.125rem',
            color: 'rgba(50 ,50 ,50, 0.6)',
            letterSpacing: '-0.5px',
            margin: '7.5px 5px 0'
        }
    },
    radioBox:{
        '&.MuiFormControlLabel-root':{
            marginRight: 60
        },
        '&.MuiTypography-root': {
            fontSize: '1.125rem',
            color: '#323232',
            letterSpacing: '-0.5px'
        }
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
    infoMargin:{
        margin: '-1.5rem 0 -14px 120px'
    },
    checkInfoTextBoxChecked:{
        '& p':{
            fontSize:'0.875rem',
            color: '#B5B5B5',
        },
    },
    activeBtnBox:{
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end',
        marginTop:40,
    },
    textBtnStyle:{
        '&.MuiButton-root': {
            width: 220,
            height: 58,
            fontSize: '1.25rem',
            fontWeight:'bold',
            color: '#7500FA',
            '&:hover':{
                color: '#7500FA',
                backgroundColor:'transparent',
            },
            '&.Mui-disabled': {
                background: 'transparent',
                color: '#eee'
            }
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root':{
            width: 220,
            height: 58,
            background: '#7500fa',
            borderRadius: 6,
            fontSize: '1.25rem',
            color: '#fff',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
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