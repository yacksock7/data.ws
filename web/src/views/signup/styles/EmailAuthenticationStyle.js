export const styles = (theme) => ({
    root:{
        marginTop: 70,
        marginBottom: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    textStyle:{
        '&.MuiTypography-root':{
            fontSize: '1.75rem',
            color: '#323232',
            lineHeight: 1.4,
            letterSpacing: '-0.5px',
            textAlign: 'center',
            marginBottom: 130,
            marginTop: 30,
            '& span':{
                fontWeight: 'bold'
            }
        }
    },
    textStyle2:{
        '&.MuiTypography-root':{
            fontSize: '1.75rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 500
        }
    }
});