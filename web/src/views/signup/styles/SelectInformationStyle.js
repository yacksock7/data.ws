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
            '@media all and (max-width: 800px)': {
                width: '100%'
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
    textFieldAlign:{
        '& .MuiInputBase-root':{
            '& input':{
                textAlign: 'center'
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
    infoText:{
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color: '#39007a',
            letterSpacing: '-0.5px',
            textAlign: 'center',
            margin: '40px 0 30px'
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
    birthdayBox:{
        width: 384,
        height: 54,
        border: '1px solid rgba(50, 50, 50, 0.8)',
        boxSizing: 'border-box',
        borderRadius: 6,
        marginTop: 7.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media all and (max-width: 800px)': {
            width: '100%'
        },

    },
    birthdayTextField:{
        '&.MuiFormControl-root':{
            margin: '0'
        },
        '& .MuiInputBase-root':{
            width: 70,
            borderRadius: 6,
            padding:0,
            boxSizing: 'border-box',
            '& input':{
                padding:0,
                fontSize: '1.125rem',
                letterSpacing: '-0.5px',
                color: '#323232',
                textAlign: 'center',
                '&::placeholder':{
                    opacity: 1,
                    color: 'rgba(50, 50, 50, 0.6)'
                }
            },
        },
        '& .MuiOutlinedInput-notchedOutline, .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiInputBase-root.Mui-error .MuiOutlinedInput-notchedOutline':{
            border: '0'
        },
    },
    birthdayTextFieldWidth:{
        '& .MuiInputBase-root':{
            width: 55,
        },
    }
});