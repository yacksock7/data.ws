export const styles = (theme) => ({
    root:{
        width: '100%',
        height: 177,
        padding: '11px 14px',
        background: '#fff',
        border: '1px solid #bbb',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.15)',
        borderRadius: '6px',
        marginBottom: '20px',
        boxSizing: 'border-box',
        position:'relative'
    },
    stepperBox: {
        maxWidth: '80%',
        margin: '0 auto',
        '& .MuiStepConnector-root': {
            top: '25px',
            left: 'calc(-50% + 24px)',
            right: 'calc(50% + 25px)',
        },
        '& .MuiStepIcon-root': {
            color: '#eeeeee',
            outline: '2px solid #cacaca',
            borderRadius: 100,
            width: '49px',
            height: '49px',
            boxSizing: 'border-box',
            '& .MuiStepIcon-text': {
                fontSize: '0.625rem',
                fontWeight: 800,
                fill: '#777777'
            }
        },
        '& .Mui-active': {
            '& svg': {
                color: '#7500fa',
                width: 49,
                height: 49,
                outline: 'none',
                '& .MuiStepIcon-text': {
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    fill: '#fff'
                }
            }
        },
        '& .Mui-completed': {
            '& svg': {
                color: '#7500fa',
                width: 49,
                height: 49,
                outline: 'none',
            }
        },
        '& .MuiStepLabel-iconContainer.Mui-completed':{
            '&:before':{
                display: 'flex',
                fontSize: '1.28rem',
                fontWeight: 800,
                color: '#fff',
                background: '#7500fa',
                width: 49,
                height: 49,
                borderRadius: '50%',
                position:'absolute',
                alignItems: 'center',
                justifyContent: 'center'
            }
        },
        '& .MuiStepLabel-label': {
            marginTop: '7px !important',
            fontSize: '0.875rem',
            color: '#777',
            letterSpacing: '-0.44px',
            fontWeight: 'bold',
        },
        '& .MuiStepLabel-label.Mui-active':{
            color: '#7500fa',
            fontWeight: 900,
        },
        '& .MuiStepLabel-label.Mui-completed':{
            color: '#323232',
            fontWeight: 'bold',
        },
        '& .MuiStepContent-root':{
            borderLeft: 0,
            margin:0,
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
        },
    },
    stepperBoxCompletedIcon:{
        '& .MuiStepper-alternativeLabel':{
            '& > div:nth-child(1)':{
                '& .MuiStepLabel-iconContainer.Mui-completed':{
                    '&:before':{
                        content: "'1'",
                    }
                },
            },
            '& > div:nth-child(2)':{
                '& .MuiStepLabel-iconContainer.Mui-completed':{
                    '&:before':{
                        content: "'2'",
                    },
                },
                '& .MuiStepConnector-root.Mui-disabled > span':{
                    border: '1px solid #7500fa !important',
                }
            },
            '& > div:nth-child(3)':{
                '& .MuiStepLabel-iconContainer.Mui-completed':{
                    '&:before':{
                        content: "'3'",
                    }
                },
            },
            '& > div:nth-child(4)':{
                '& .MuiStepLabel-iconContainer.Mui-completed':{
                    '&:before':{
                        content: "'4'",
                    }
                },
            },
            '& > div:nth-child(5)':{
                '& .MuiStepLabel-iconContainer.Mui-completed':{
                    '&:before':{
                        content: "'5'",
                    }
                },
            }
        }
    },
    nexButton:{
        '&.MuiButtonBase-root':{
            minWidth: 43,
            width: 43,
            height: 24,
            padding: 0,
            boxSizing: 'border-box',
            borderRadius: 2.2,
            background: '#7500fa',
            fontSize: '0.813rem',
            color: '#fff',
            fontWeight: 500,
            letterSpacing: '-0.41px',
            margin: '8px 3px 0',
            '&:hover':{
                background: '#9d4bfb'
            }
        }
    },
    backButton:{
        '&.MuiButtonBase-root': {
            border: '1px solid #7500fa',
            background: '#fff',
            color: '#7500fa',
            '&:hover': {
                border: '1px solid #7500fa',
                color: '#7500fa',
                background: 'rgba(117, 0, 250, 0.1)',
            }
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root': {
            background: 'transparent',
            padding:0,
            position:'absolute',
            bottom: 11,
            right: 14,
            '& p':{
                fontSize: '0.875rem',
                color: '#323232',
                letterSpacing: '-0.5px',
                marginLeft: 4
            },
            '&:hover':{
                background: 'transparent'
            }
        }
    }
});


