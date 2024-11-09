export const styles = (theme) => ({
    root:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        marginBottom: '20px',
    },
    leftBox:{
        width: 530,
        display: 'flex',
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #bbb',
        background: '#fff',
        borderRadius: 6,
        boxShadow:'0 0 4px 0 rgba(0, 0, 0, 0.15)'
    },
    displayFlex:{
        display: 'flex',
        alignItems: 'center',
    },
    buttonTextStyle:{
        '&.MuiTypography-root': {
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 500,
            marginRight: 14
        }
    },
    dateButton:{
        '&.MuiButtonBase-root': {
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            background: 'transparent',
            '& span':{
                fontSize: '0.875rem',
                color: '#7500fa',
                letterSpacing: '-0.5px',
                marginLeft: 6
            },
            '&:hover':{
                background: 'transparent'
            }
        }
    },
    textStyle:{
        '&.MuiTypography-root': {
            fontSize: '1rem',
            color: 'rgba(50, 50, 50, 0.8)',
            letterSpacing: '-0.5px',
            marginLeft:80,
        }
    },
    numberText:{
        fontSize: '1.125rem',
        color: '#777',
        letterSpacing: '-0.5px',
        marginLeft: 14,
        '& span':{
            fontWeight: 'bold',
            color: '#7500fa',
        },
    },
    buttonStyle: {
        '&.MuiButtonBase-root': {
            width: 220,
            height: 54,
            background: '#140cf2',
            borderRadius: 6,
            color: '#fff',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            '&:hover':{
                background: '#5f59fc',
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    },
    buttonStyle2:{
        '&.MuiButtonBase-root': {
            background: '#7500fa',
            marginLeft: 12,
            '&:hover':{
                background: '#9d4bfb',
            }
        }
    },
    popoverBox:{
        '& .MuiPaper-root':{
            width: 220,
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
            border: '1px solid #bbb',
            borderRadius: 6,
            '& ul':{
                padding: '8px 0',
                '& li':{
                    fontSize: '1rem',
                    color: '#323232',
                    letterSpacing: '-0.5px',
                    '&:hover':{
                        background: '#eee'
                    },
                    '& span':{
                        marginLeft: 6
                    }
                }
            },
            '& *': {
                fontFamily: 'Pretendard !important',
            },
        }
    },
    buttonBox:{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    popoverButton:{
        '&.MuiButtonBase-root': {
            fontSize: '0.875rem',
            color: '#056cf2',
            textDecoration: 'underline',
            letterSpacing: '-0.5px',
            background: 'transparent',
            padding:0,
            marginBottom: 10,
            marginRight: 16,
            marginTop: 16,
            '&:hover':{
                background: 'transparent',
                textDecoration: 'underline',
            }
        }
    }
});


