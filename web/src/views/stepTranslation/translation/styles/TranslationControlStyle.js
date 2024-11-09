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
    leftTextStyle:{
        '&.MuiTypography-root': {
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 500,
        }
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
});


