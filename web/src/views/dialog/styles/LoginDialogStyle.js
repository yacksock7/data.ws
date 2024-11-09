export const styles = (theme) => ({
    dialogBox:{
        '& .MuiDialog-paper':{
            minWidth: 520,
            minHeight: 276,
            boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.25)',
            borderRadius: 6,
            background: '#fff',
            boxSizing: 'border-box',
            padding: '45px 11px 47px 20px',
            display:'flex',
            flexDirection: 'column',
            alignItems:'center',
            justifyContent: 'flex-end',
            '& *': {
                fontFamily: 'Pretendard !important',
            },
        },
    },
    textStyle:{
        '&.MuiTypography-root':{
            fontSize: '1.75rem',
            color: '#323232',
            letterSpacing: '-0.5px',
        }
    },
    subStyle:{
        '&.MuiTypography-root':{
            fontSize: '1.125rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            marginTop: 26,
            textAlign: 'center'
        }
    },
    ButtonStyle:{
        '&.MuiButtonBase-root': {
            width: 365,
            height: 58,
            boxSizing: 'border-box',
            borderRadius: 6,
            background: '#7500fa',
            fontSize: '1.25rem',
            color: '#fff',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            marginTop: 40,
            '&:hover':{
                background: '#9d4bfb'
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    }
});