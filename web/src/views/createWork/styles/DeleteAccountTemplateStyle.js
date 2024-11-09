export const styles = (theme) => ({
    root:{
    },
    subTitleText:{
        '&.MuiTypography-root':{
            fontSize: '1.125rem',
            color: '#d91e50',
            letterSpacing: '-0.37px',
            fontWeight: '500',
            marginBottom: 10
        }
    },
    textStyle:{
        '&.MuiTypography-root':{
            background:'#f5f4f6',
            fontSize:'0.938rem',
            color: '#323232',
            margin:'20px 0 8px',
            padding: '12px 16px',
        }
    },
    checkBox:{
        '&.MuiFormControlLabel-root':{
            margin:'9px 0 0'
        },
        '& .MuiButtonBase-root':{
            padding:0
        },
        '& .MuiTypography-root':{
            color: '#323232',
            marginLeft: 6
        }
    },
    checkedColor:{
        '& g':{
            stroke: '#7500fa',
            opacity: 1
        }
    },
});