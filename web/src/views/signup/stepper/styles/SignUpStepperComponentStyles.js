export const styles = (theme) => ({
    root:{
        width: 365,
        '@media all and (max-width: 800px)': {
            width: '100%'
        },
    },
    stepperBox: {
        maxWidth: '100%',
        margin: '0 auto',
        '& .MuiStepConnector-root': {
            top: '18px',
            left: 'calc(-50% + 19px)',
            right: 'calc(50% + 20px)',
        },
        '& .MuiStepIcon-root': {
            color: '#eeeeee',
            outline: '2px solid #cacaca',
            borderRadius: 100,
            width: 38,
            height: 38,
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
                width: 38,
                height: 38,
                outline: 38,
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
                width: 38,
                height: 38,
                outline: 'none',
            }
        },
        '& .MuiStepLabel-iconContainer.Mui-completed':{
            '&:before':{
                display: 'flex',
                fontSize: '0.938rem',
                fontWeight: 800,
                color: '#fff',
                background: '#7500fa',
                width: 38,
                height: 38,
                borderRadius: '50%',
                position:'absolute',
                alignItems: 'center',
                justifyContent: 'center'
            }
        },
        '& .MuiStepLabel-label': {
            marginTop: '7px !important',
            fontSize: '0.75',
            color: '#777',
            letterSpacing: '-0.44px',
        },
        '& .MuiStepLabel-label.Mui-active':{
            color: '#7500fa',
            fontWeight: 'bold',
        },
        '& .MuiStepLabel-label.Mui-completed':{
            color: '#323232',
            fontWeight: 500,
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
    }
});


