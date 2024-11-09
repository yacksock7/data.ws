import LoginBackImage from "../../../common/images/LoginBackImage.png";

export const styles = (theme) => ({
    root:{
        width: '100%',
        height: '100vh',
        display: 'flex',
        '@media all and (max-width: 1300px)': {
            justifyContent: 'center'
        },
    },
    leftBox:{
        width: 'calc(100vw - 670px)',
        height: '100vh',
        background: '#7500fa',
        boxSizing: 'border-box',
        backgroundImage: `url(${LoginBackImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        '@media all and (max-width: 1700px)': {
            width: 'calc(100vw - 500px)',
        },
        '@media all and (max-width: 1400px)': {
            width: 'calc(100vw - 400px)',
        },
        '@media all and (max-width: 1300px)': {
           display: 'none',
        },
    },
    leftTitleText:{
        '&.MuiTypography-root':{
            width: 947,
            fontSize: '4.625rem',
            lineHeight: 1.28,
            letterSpacing: '-0.55px',
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: 65,
            textAlign: 'left',
            '@media all and (max-width: 1700px)': {
                width: '100%',
                fontSize: '3.563rem',
            },
        }
    },
    imageBox:{
        '@media all and (max-width: 1700px)': {
            width: '100%',
            '& img':{
                maxWidth: '100%'
            }
        },
    },
    rightBox:{
        width: 670,
        height: '100vh',
        background: '#fff',
        boxSizing: 'border-box',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        '@media all and (max-width: 1700px)': {
            width: 500,
        },
        '@media all and (max-width: 1400px)': {
            width: 400,
        },
        '@media all and (max-width: 1300px)': {
            justifyContent:'start',
        },

    },
    logoBox:{
        marginBottom: 34,
        cursor:'pointer'
    },
    titleText:{
        '&.MuiTypography-root':{
            fontSize: '2.125rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: 20
        }
    },
    subText:{
        '&.MuiTypography-root':{
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            textAlign: 'center',
            marginBottom: 30
        }
    },
    passwordEmailText:{
        '&.MuiTypography-root':{
            fontSize: '1.75rem',
            color: '#323232',
            lineHeight: 1.4,
            letterSpacing: '-0.5px',
            textAlign:'center',
            '& span':{
                fontWeight: 'bold'
            }
        }
    },
    textField:{
        '&.MuiFormControl-root':{
            margin: '7.5px 0 0'
        },
        '& .MuiInputBase-root':{
            width: 365,
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
    textStyle:{
        '&.MuiTypography-root': {
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 600
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
    errorBox:{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 5
    },
    errorText:{
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color: '#d91e50',
            letterSpacing: '-0.5px',
            marginLeft: 6
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root':{
            width: 365,
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
            },
            '@media all and (max-width: 800px)': {
               width: '100%'
            },
        }
    },
    buttonMargin:{
        '&.MuiButtonBase-root': {
            marginTop: 20
        }
    },
    checkBox:{
        '&.MuiFormControlLabel-root':{
            margin:'15px 0 34px'
        },
        '& .MuiButtonBase-root':{
            padding:0
        },
        '& .MuiTypography-root':{
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            marginLeft: 8
        }
    },
    marginTop:{
        marginTop: 27,
        display: 'flex',
        flexDirection: 'column'
    },
    bottomBox:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 28,
    },
    joinButtonBox:{
        display: 'flex',
        alignItems: 'center',
        '& p':{
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            marginRight: 14,
            '@media all and (max-width: 800px)': {
                fontSize: '0.875rem',
                marginRight: 7,
            },
        }
    },
    joinButton:{
        '&.MuiButtonBase-root':{
            padding:0,
            minWidth: 20,
            background: 'transparent',
            fontSize: '1rem',
            color: '#323232',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            textDecoration: 'underline',
            '&:hover':{
                background: 'transparent',
                textDecoration: 'underline'
            },
            '@media all and (max-width: 800px)': {
                fontSize: '0.875rem',
            },
        }
    },
    passwordFindButton:{
        '&.MuiButtonBase-root':{
            padding:0,
            minWidth: 20,
            background: 'transparent',
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            '&:hover':{
                background: 'transparent',
            },
            '@media all and (max-width: 800px)': {
                fontSize: '0.875rem',
            },
        }
    },
    backBox:{
        marginBottom: 24,
        display: 'flex',
        justifyContent: 'center'
    },
    backLoginButton:{
        '&.MuiButtonBase-root':{
            width: 100,
            height: 40,
            padding:0,
            borderRadius: 4,
            background: '#39007a',
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 'bold',
            letterSpacing: '-0.42px',
            '& svg':{
                '& path':{
                    stroke: '#Fff'
                },
                marginRight: 6
            },
            '&:hover':{
                background: '#39007a'
            }
        }
    },
    confirmEmailTitle: {
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            fontWeight: 'bold',
            color: '#323232',
        }
    },
    confirmEmailText: {
        '&.MuiTypography-root':{
            fontSize: '0.813rem',
            color: '#777',
            letterSpacing: '-0.5px',
            marginTop: '20px',
            marginBottom: '40px',
            lineHeight: 1.3,
        }
    },
    confirmEmailCheck: {
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            color: '#323232',
        }
    }



});