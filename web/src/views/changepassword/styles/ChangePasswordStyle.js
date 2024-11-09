import LoginBackImage from "../../../common/images/LoginBackImage.png";

export const styles = (theme) => ({
    root:{
        width: '100%',
        height: '100vh',
        display: 'flex',
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
    },
    logoBox:{
        marginBottom: 34,
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
            marginTop: 20,
            '&:hover':{
                background: '#9d4bfb'
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
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
            marginLeft: 5
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
    }
});