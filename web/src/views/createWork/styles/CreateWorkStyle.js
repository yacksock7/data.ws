export const styles = (theme) => ({
    root:{
        marginTop: 70,
        minHeight: 'calc(100vh - 70px)',
        padding: '30px 106px',
        boxSizing: 'border-box',
    },
    stepperBox:{
        width: 180,
        '& .MuiStep-root':{
            padding:0,
            cursor: 'pointer',
            '&:first-child > span':{
                width: 80,
            },
            '&:last-child > span':{
                width: 238,
            },
        },
        '& .MuiStepLabel-label':{
            fontSize: '0.875rem',
            color:'#777',
            letterSpacing: '-0.5px',
            marginTop: '1px !important',
            '&.Mui-active':{
                color:'#7500fa',
                fontWeight:'bold'
            },
            '&.Mui-completed':{
                color:'#7500fa',
                fontWeight:'bold'
            },
        },
        '& .MuiStepConnector-root':{
            width: 129,
            left: -25,
            right: 0,
            '& span':{
                borderColor: '#323232',
                opacity: 0.4,
            }
        }
    },
    titleText:{
        '&.MuiTypography-root':{
            fontSize: '1.375rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 500,
            marginTop: 30
        }
    },
});